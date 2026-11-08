# Happy Diwali — Saitech Computers WhatsApp Sticker

Gold Laxmi–Ganesh Diwali sticker branded **Saitech Computers — Completely Yours**.

| File | Use |
|---|---|
| `happy-diwali-saitech-whatsapp-sticker.webp` | WhatsApp sticker (512×512, transparent, < 100 KB) |
| `happy-diwali-saitech-sticker-512.png` | Same sticker as PNG |
| `happy-diwali-saitech-full-1080.png` | Full size for WhatsApp Status / posts |
| `happy-diwali-saitech-full-2048.png` | Full size, high resolution (print / large share) |
| `whatsapp-sticker-pack/tray-icon.png` | 96×96 tray icon for a sticker pack |
| `sticker.html` | Editable vector source (open in a browser; add `?s=2048` to set size) |

## Laptop design (v2)

`laptop-sticker.html` puts Laxmi–Ganesh on a laptop screen, with the Saitech brand on the keyboard deck.

| File | Use |
|---|---|
| `laptop-diwali-saitech-whatsapp-sticker.webp` | WhatsApp sticker (512×512, transparent) |
| `laptop-diwali-saitech-full-1080.png` / `-2048.png` | Full size |

**Using a real Laxmi–Ganesh photo:** save the photo as `laxmi-ganesh.jpg` (or `.png`) in this folder.
The laptop screen then shows the photo instead of the gold artwork. Re-render with:

```
node render.js "$PWD/laptop-sticker.html" laptop-diwali-saitech-full-2048.png 2048
```

### No black background (for sending as a photo / Status)

Phones show a sticker's transparent area as black when it is opened as a normal image.
These versions have a solid background:

| File | Background |
|---|---|
| `laptop-diwali-saitech-gold-bg-1080.jpg` / `-2048.jpg` | Golden glow with diya-light bokeh |
| `laptop-diwali-saitech-white-bg-1080.jpg` / `-2048.jpg` | Plain white |

## Framed stickers (older style, in `framed-stickers/`)

## WhatsApp sticker pack (fully transparent)

`whatsapp-sticker-pack/` (also zipped as `saitech-diwali-whatsapp-stickers.zip`) has 3 transparent
512×512 stickers (WebP < 100 KB each, plus PNG copies) and a 96×96 tray icon. This meets WhatsApp's
minimum of 3 stickers per pack. `diya-sticker.html` is the source of sticker 03.

Send them as **stickers**, not as photos. A sticker sent as a photo is converted to JPG and its transparent area turns black.
- **WhatsApp → chat → 😊 → Stickers → “+ Create” → pick the PNG → Send.** The background stays transparent.
- Or import the zip into a sticker-maker app with “Add to WhatsApp”.

## Real Laxmi–Ganesh photo

- `laxmi-ganesh-original.jpg`: the photo as supplied.
- `laxmi-ganesh.png`: the same photo with the white background and floor reflection removed, upscaled 3x, sharpened and colour-enhanced.
  When this file is present, `laptop-sticker.html` and `sticker.html` show it in place of the drawn artwork.

Re-create every output (stickers, full size, gold/white backgrounds, WhatsApp pack, zip) with `python3 export.py`.

## Floating stickers (current WhatsApp pack)

`floating-stickers.html?v=1|2|3` has no background, no white outline and no box. Only the design shows, and the chat
wallpaper shows through, like WhatsApp's own text stickers. `whatsapp-sticker-pack/` now holds these:

1. `01-laxmi-ganesh-happy-diwali`: real Laxmi–Ganesh photo, Happy Diwali, Saitech Computers – Completely Yours
2. `02-shubh-deepawali-diya`: diya, शुभ दीपावली, Happy Diwali and brand
3. `03-laptop-laxmi-ganesh`: gold line-art laptop (see-through screen) with Laxmi–Ganesh and brand

Each comes as a 512×512 `.webp` (under 100 KB), a `.png` and a full-size `-2048.png`.
The earlier framed versions are in `framed-stickers/`.

## Diwali wishes poster & 10-second videos (`greeting/`)

| File | Use |
|---|---|
| `greeting/saitech-diwali-wishes-poster.jpg` | 1080×1350 poster to send to customers on WhatsApp |
| `greeting/saitech-diwali-video-umang.mp4` | **Umang** (festive joy): shehnai, dhol and tabla |
| `greeting/saitech-diwali-video-khushi-ke-aansu.mp4` | **Khushi ke Aansu** (tears of joy): piano, strings and bansuri |
| `greeting/saitech-diwali-video-josh.mp4` | **Josh** (energy and pride): taiko drums, string ostinato and brass |

All videos are 10 s, 1080×1920, with AAC 320 kbps at 48 kHz in wide stereo. The FLAC masters are in `greeting/saitech-diwali-music-*.flac`.
The message thanks customers for their trust ("आपका भरोसा ही हमारी असली दिवाली है").

`make-music.py <umang|khushi|josh> out.wav` synthesises the music from scratch. It uses no samples (so there are no copyright issues) and
no noise sources (so there is no hiss). Every mood resolves on D at 7.4 s, when the Saitech brand appears.
Re-render: `node render-greeting.js poster out.png`, or `node render-greeting.js video framesDir` and then encode with ffmpeg.
