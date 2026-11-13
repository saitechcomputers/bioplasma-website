"""Re-render every output file. Run from this folder:  python3 export.py"""
import math, os, random, subprocess, zipfile
from PIL import Image, ImageDraw, ImageFilter

HERE = os.path.dirname(os.path.abspath(__file__))
os.chdir(HERE)

def render(html, out, size):
    subprocess.run(['node', 'render.js', os.path.join(HERE, html), os.path.join(HERE, out), str(size)], check=True)

def webp(png, out):
    im = Image.open(png).convert('RGBA').resize((512, 512), Image.LANCZOS)
    for q in (90, 80, 70, 60):
        im.save(out, 'WEBP', quality=q, method=6)
        if os.path.getsize(out) < 100 * 1024:
            return

def fill_frame(base):
    """Trim empty transparent margins so the design fills the square sticker frame."""
    big = Image.open(base + '-2048.png').convert('RGBA')
    c = big.crop(big.getchannel('A').point(lambda v: 255 if v > 8 else 0).getbbox())
    side = int(max(c.size) * 1.02)
    sq = Image.new('RGBA', (side, side), (0, 0, 0, 0))
    sq.alpha_composite(c, ((side - c.width) // 2, (side - c.height) // 2))
    sq.resize((2048, 2048), Image.LANCZOS).save(base + '-2048.png', optimize=True)
    sq.resize((512, 512), Image.LANCZOS).save(base + '.png', optimize=True)
    webp(base + '.png', base + '.webp')

def festive_bg(size):
    random.seed(7)
    W = H = size
    bg = Image.new('RGB', (W, H)); px = bg.load()
    c0, c1, c2 = (255, 246, 214), (232, 170, 60), (150, 70, 10)
    for y in range(H):
        for x in range(W):
            d = math.hypot(x - W / 2, y - H * 0.45) / (W * 0.75)
            if d < 0.55:
                t = d / 0.55; c = [c0[i] + (c1[i] - c0[i]) * t for i in range(3)]
            else:
                t = min(1, (d - 0.55) / 0.45); c = [c1[i] + (c2[i] - c1[i]) * t for i in range(3)]
            px[x, y] = tuple(int(v) for v in c)
    bok = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(bok)
    for _ in range(70):
        r = random.uniform(.008, .045) * W; x = random.uniform(0, W); y = random.uniform(0, H)
        col = random.choice([(255, 236, 160), (255, 210, 110), (255, 250, 220), (255, 190, 90)])
        d.ellipse((x - r, y - r, x + r, y + r), fill=col + (random.randint(50, 120),))
    bg = bg.convert('RGBA'); bg.alpha_composite(bok.filter(ImageFilter.GaussianBlur(W * 0.004)))
    sp = Image.new('RGBA', (W, H), (0, 0, 0, 0)); d = ImageDraw.Draw(sp)
    for _ in range(40):
        x = random.uniform(0, W); y = random.uniform(0, H); r = random.uniform(.003, .009) * W
        d.polygon([(x, y - r * 3), (x + r * .5, y - r * .5), (x + r * 3, y), (x + r * .5, y + r * .5),
                   (x, y + r * 3), (x - r * .5, y + r * .5), (x - r * 3, y), (x - r * .5, y - r * .5)], fill=(255, 255, 240, 220))
    bg.alpha_composite(sp)
    return bg

def on_bg(png, out, size, kind):
    bg = festive_bg(size) if kind == 'gold' else Image.new('RGBA', (size, size), (255, 255, 255, 255))
    bg.alpha_composite(Image.open(png).convert('RGBA').resize((size, size), Image.LANCZOS))
    bg.convert('RGB').save(out, quality=93)

designs = {  # html -> (full-size base name, sticker-pack name)
    'laptop-sticker.html': ('laptop-diwali-saitech', '01-laptop-laxmi-ganesh'),
    'sticker.html': ('happy-diwali-saitech', '02-laxmi-ganesh-gold'),
    'diya-sticker.html': ('diya-diwali-saitech', '03-shubh-deepawali-diya'),
}
os.makedirs('framed-stickers', exist_ok=True)
for html, (base, pack) in designs.items():
    full = f'{base}-full-2048.png'
    render(html, full, 2048)
    render(html, f'framed-stickers/{pack}.png', 512)
    Image.open(full).resize((1080, 1080), Image.LANCZOS).save(f'{base}-full-1080.png', optimize=True)
    webp(f'framed-stickers/{pack}.png', f'framed-stickers/{pack}.webp')
    for kind in ('gold', 'white'):
        for s in (2048, 1080):
            on_bg(full, f'{base}-{kind}-bg-{s}.jpg', s, kind)
# legacy single-sticker names
Image.open('framed-stickers/02-laxmi-ganesh-gold.png').save('happy-diwali-saitech-sticker-512.png', optimize=True)
for src, dst in [('01-laptop-laxmi-ganesh', 'laptop-diwali-saitech-whatsapp-sticker.webp'),
                 ('02-laxmi-ganesh-gold', 'happy-diwali-saitech-whatsapp-sticker.webp')]:
    webp(f'framed-stickers/{src}.png', dst)
# --- WhatsApp pack: floating stickers (no background, no outline) ---
os.makedirs('whatsapp-sticker-pack', exist_ok=True)
for v, name in [('1', '01-laxmi-ganesh-happy-diwali'), ('2', '02-shubh-deepawali-diya'), ('3', '03-laptop-laxmi-ganesh')]:
    render(f'floating-stickers.html?v={v}', f'whatsapp-sticker-pack/{name}.png', 512)
    webp(f'whatsapp-sticker-pack/{name}.png', f'whatsapp-sticker-pack/{name}.webp')
    render(f'floating-stickers.html?v={v}', f'whatsapp-sticker-pack/{name}-2048.png', 2048)
    fill_frame(f'whatsapp-sticker-pack/{name}')
Image.open('whatsapp-sticker-pack/03-laptop-laxmi-ganesh-2048.png').resize((96, 96), Image.LANCZOS).save('whatsapp-sticker-pack/tray-icon.png', optimize=True)
with zipfile.ZipFile('saitech-diwali-whatsapp-stickers.zip', 'w', zipfile.ZIP_DEFLATED) as z:
    for f in sorted(os.listdir('whatsapp-sticker-pack')):
        if not f.endswith('-2048.png'):
            z.write(f'whatsapp-sticker-pack/{f}', f)
print('done')
