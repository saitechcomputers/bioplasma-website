import sys
from PIL import Image, ImageFilter, ImageEnhance
import numpy as np
from scipy import ndimage
src, out = sys.argv[1], sys.argv[2]
img = Image.open(src).convert('RGB')
a = np.asarray(img).astype(float)
H, W, _ = a.shape
mn, mx = a.min(2), a.max(2)
# soft "white background" score: near-white and grey (unsaturated)
whiteness = np.clip((mn - 215) / 25, 0, 1) * np.clip(1 - (mx - mn - 6) / 18, 0, 1)
alpha = 1 - whiteness
ys = np.arange(H)[:, None] * np.ones((1, W))
# floor reflection: dark pixels below the stools, and everything under the stool feet
refl = (ys >= 428) & (mx < 140)
alpha[refl] = 0
alpha[ys >= 457] = 0
# de-fringe: drop dark/grey halo pixels that hug the background edge
solid = alpha > 0.5
bg = ndimage.binary_dilation(~solid, iterations=4)
dark_edge = bg & solid & ((mx < 120) | ((mx - mn) < 40) & (mx < 200))
alpha[dark_edge] = 0
alpha = np.minimum(alpha, ndimage.binary_erosion(alpha > 0.5, iterations=1) * 1.0 + (alpha <= 0.5) * alpha)
# keep only the main connected object (drop specks)
lab, n = ndimage.label(alpha > 0.5)
if n:
    sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1))
    keep = np.isin(lab, 1 + np.where(sizes > 150)[0])
    alpha = alpha * ndimage.binary_dilation(keep, iterations=2)
rgba = np.dstack([a, alpha * 255]).astype(np.uint8)
im = Image.fromarray(rgba, 'RGBA')
# enhance: 3x upscale, de-fringe, sharpen, richer gold
im = im.resize((W * 3, H * 3), Image.LANCZOS)
rgb, al = im.convert('RGB'), im.getchannel('A')
al = al.filter(ImageFilter.GaussianBlur(1.0)).point(lambda v: 0 if v < 40 else min(255, int((v - 40) * 255 / 175)))
rgb = rgb.filter(ImageFilter.UnsharpMask(radius=2.2, percent=120, threshold=2))
rgb = ImageEnhance.Contrast(rgb).enhance(1.08)
rgb = ImageEnhance.Color(rgb).enhance(1.12)
rgb = ImageEnhance.Brightness(rgb).enhance(1.04)
im = rgb.convert('RGBA'); im.putalpha(al)
im = im.crop(im.getbbox())
im.save(out, optimize=True)
print(im.size)
