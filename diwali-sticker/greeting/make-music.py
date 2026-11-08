"""Emotional cinematic 10 s Diwali score, synthesised from scratch (no samples, copyright-free).

Progression in D major: D - A/C# - Bm - G - A - D (I-V6-vi-IV-V-I), timed to the video:
  0.0  temple bell + strings + piano, diyas light up
  1.6  bansuri (flute) melody enters as Laxmi-Ganesh appear
  6.0  rising swell  ->  7.4  big resolve on D with bell + boom as the Saitech brand appears
Output: 48 kHz / 24-bit stereo WAV with convolution reverb and wide stereo image.
usage: python3 make-music.py out.wav
"""
import sys, wave
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt

SR = 48000; T = 10.0; N = int(SR * T)
t = np.arange(N) / SR
rng = np.random.default_rng(2026)
L = np.zeros(N); R = np.zeros(N)

def hz(note):  # MIDI -> Hz
    return 440.0 * 2 ** ((note - 69) / 12)

def add(sig, start, pan=0.0, gain=1.0):
    i0 = int(start * SR); i1 = min(N, i0 + len(sig))
    if i1 <= i0: return
    s = sig[:i1 - i0] * gain
    L[i0:i1] += s * np.cos((pan + 1) * np.pi / 4); R[i0:i1] += s * np.sin((pan + 1) * np.pi / 4)

def adsr(n, a, r, sustain_curve=None):
    e = np.ones(n); A = max(1, int(a * SR)); Rr = max(1, int(r * SR))
    e[:A] = np.sin(np.linspace(0, np.pi / 2, A)) ** 2
    e[-Rr:] *= np.cos(np.linspace(0, np.pi / 2, Rr)) ** 2
    return e

# ---------------- chords ----------------
D, A, Bm, G = 'D', 'A', 'Bm', 'G'
chords = [  # (start, end, voicing MIDI notes)
    (0.0, 2.4, [38, 50, 57, 62, 66, 69]),        # D
    (2.4, 3.9, [37, 49, 57, 61, 64, 69]),        # A/C#
    (3.9, 5.4, [35, 47, 54, 59, 62, 66]),        # Bm
    (5.4, 6.6, [31, 43, 55, 59, 62, 67]),        # G
    (6.6, 7.4, [33, 45, 57, 61, 64, 69]),        # A
    (7.4, 10.0, [26, 38, 50, 57, 62, 66, 69, 74]),  # D (big)
]

# strings: detuned additive saws, slow bow attack, crossfaded chords
for ci, (s, e, notes) in enumerate(chords):
    dur = e - s + 0.9; n = int(dur * SR); tt = np.arange(n) / SR
    final = ci == len(chords) - 1
    env = adsr(n, 0.55 if ci else 1.2, 0.9)
    if final: env *= np.clip(0.75 + tt / 2.0, 0, 1.25)
    for note in notes:
        f0 = hz(note)
        for v in range(5):
            det = 2 ** ((rng.uniform(-9, 9)) / 1200)
            vib = 1 + 0.0025 * np.sin(2 * np.pi * (4.8 + v * 0.3) * tt + rng.uniform(0, 6))
            ph = 2 * np.pi * np.cumsum(f0 * det * vib) / SR
            sig = np.zeros(n)
            for h in range(1, 15):
                if f0 * h > 7000: break
                sig += np.sin(h * ph + rng.uniform(0, 6)) / h ** 1.35
            add(sig * env * 0.010 * (0.55 if note < 40 else 0.8 if note < 50 else 1.0), s - (0 if ci == 0 else 0.35),
                pan=rng.uniform(-0.85, 0.85), gain=1.0)

# piano: inharmonic additive notes, flowing arpeggio
def piano(note, vel=0.5, dur=2.6):
    f0 = hz(note); n = int(dur * SR); tt = np.arange(n) / SR; B = 0.0003
    sig = np.zeros(n)
    for h in range(1, 12):
        fh = f0 * h * np.sqrt(1 + B * h * h)
        if fh > 9000: break
        sig += (vel / h ** 1.1) * np.exp(-tt * (0.9 + 0.55 * h)) * np.sin(2 * np.pi * fh * tt)
    click = rng.normal(0, 1, n) * np.exp(-tt * 180) * 0.05
    a = int(0.003 * SR); sig[:a] *= np.linspace(0, 1, a)
    return (sig + click) * adsr(n, 0.003, 0.3)
arp_pat = [0, 2, 3, 4, 3, 2]
for s, e, notes in chords[:-1]:
    up = [n for n in notes if n >= 45] + [notes[-1] + 12]
    step = 0.2; k = 0; x = s
    while x < e - 0.05:
        nt = up[arp_pat[k % len(arp_pat)] % len(up)]
        add(piano(nt, 0.32 + 0.06 * (k % 3 == 0)), x, pan=-0.3 + 0.12 * (k % 6), gain=0.5)
        x += step; k += 1
for i, nt in enumerate([50, 57, 62, 66, 69, 74, 78]):  # final rolled chord
    add(piano(nt, 0.45, 3.2), 7.4 + i * 0.07, pan=-0.5 + i * 0.16, gain=0.55)

# bansuri: continuous-phase legato with vibrato and breath
mel = [(1.6, 69, .4), (2.0, 74, .4), (2.4, 76, .9), (3.3, 73, .6), (3.9, 74, .5), (4.4, 78, 1.0),
       (5.4, 79, .5), (5.9, 78, .35), (6.25, 76, .35), (6.6, 76, .8), (7.4, 74, 2.3)]
freq = np.zeros(N); amp = np.zeros(N)
for i, (s, nt, d) in enumerate(mel):
    i0 = int(s * SR); i1 = min(N, int((s + d) * SR)); f = hz(nt)
    prev = hz(mel[i - 1][1]) if i else f
    seg = np.full(i1 - i0, f); g = min(len(seg), int(0.06 * SR))
    seg[:g] = prev * (f / prev) ** np.linspace(0, 1, g)       # portamento
    freq[i0:i1] = seg
    tt = np.arange(i1 - i0) / SR
    vib_depth = np.clip(tt / 0.5, 0, 1) * 0.006
    freq[i0:i1] *= 1 + vib_depth * np.sin(2 * np.pi * 5.3 * tt)
    a = np.clip(tt / 0.08, 0, 1) * (0.85 + 0.15 * np.sin(np.pi * np.clip(tt / d, 0, 1)))
    if i == len(mel) - 1: a *= np.clip(1.3 - tt / 2.0, 0, 1)
    amp[i0:i1] = np.maximum(amp[i0:i1], a)
fill = freq == 0
freq[fill] = 440; amp_s = np.convolve(amp, np.ones(960) / 960, mode='same')
ph = 2 * np.pi * np.cumsum(freq) / SR
flute = amp_s * (np.sin(ph) + 0.22 * np.sin(2 * ph) + 0.06 * np.sin(3 * ph))
breath = sosfilt(butter(2, [900, 4500], btype='band', fs=SR, output='sos'), rng.normal(0, 1, N)) * amp_s * 0.10
add((flute + breath) * 0.24, 0, pan=0.12)

# temple bells
def bell(f0, dur=6.0):
    n = int(dur * SR); tt = np.arange(n) / SR; s = np.zeros(n)
    for r_, a_, d_ in [(1, 1, 3.5), (2.0, .55, 2.4), (2.76, .45, 1.7), (5.4, .25, .9), (8.93, .14, .5)]:
        s += a_ * np.exp(-tt / d_) * np.sin(2 * np.pi * f0 * r_ * tt + 0.002 * np.sin(2 * np.pi * 3 * tt))
    return s * adsr(n, 0.002, 0.5)
add(bell(587.33), 0.08, pan=-0.25, gain=0.20)
add(bell(880.0), 7.4, pan=0.3, gain=0.16)
add(bell(1174.66, 4), 7.42, pan=-0.4, gain=0.07)

# wind-chime shimmer as the photo appears and at the climax
for st in (0.95, 7.45):
    for k in range(9):
        n_ = int(1.8 * SR); tt = np.arange(n_) / SR
        f = hz(rng.choice([86, 88, 90, 93, 95, 98]))
        add(np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3), st + k * 0.07, pan=rng.uniform(-.9, .9), gain=0.018)

# riser into the climax + cinematic boom
n_ = int(1.5 * SR); tt = np.arange(n_) / SR
riser = sosfilt(butter(2, 2500, btype='high', fs=SR, output='sos'), rng.normal(0, 1, n_)) * (tt / 1.5) ** 3
add(riser, 5.9, pan=-0.6, gain=0.05); add(riser[::-1][::-1], 5.9, pan=0.6, gain=0.05)
n_ = int(2.6 * SR); tt = np.arange(n_) / SR
fb = 70 * np.exp(-tt * 1.2) + 38
boom = np.sin(2 * np.pi * np.cumsum(fb) / SR) * np.exp(-tt * 1.4)
boom += sosfilt(butter(2, 180, fs=SR, output='sos'), rng.normal(0, 1, n_)) * np.exp(-tt * 8) * 0.6
add(boom, 7.38, gain=0.26)

# ---------------- mix: convolution reverb, width, master ----------------
ir_n = int(3.2 * SR); it = np.arange(ir_n) / SR
lp = butter(1, 6000, fs=SR, output='sos')
irL = sosfilt(lp, rng.normal(0, 1, ir_n)) * np.exp(-it / 0.85); irR = sosfilt(lp, rng.normal(0, 1, ir_n)) * np.exp(-it / 0.85)
irL[:int(.012 * SR)] = 0; irR[:int(.017 * SR)] = 0
irL /= np.sqrt(np.sum(irL ** 2)); irR /= np.sqrt(np.sum(irR ** 2))
wetL = fftconvolve(L, irL)[:N]; wetR = fftconvolve(R, irR)[:N]
outL = L + 0.42 * wetL; outR = R + 0.42 * wetR
mid, side = (outL + outR) / 2, (outL - outR) / 2
outL, outR = mid + 1.35 * side, mid - 1.35 * side            # widen
hp = butter(2, 48, btype='high', fs=SR, output='sos')
outL, outR = sosfilt(hp, outL), sosfilt(hp, outR)
fade = np.ones(N); fi = int(0.05 * SR); fo = int(1.6 * SR)
fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.cos(np.linspace(0, np.pi / 2, fo)) ** 2
st = np.stack([outL, outR], 1) * fade[:, None]
st /= np.max(np.abs(st)); st = np.tanh(st * 1.6) / np.tanh(1.6) * 0.89      # gentle limiter, ~ -1 dBFS
pcm = (st * (2 ** 23 - 1)).astype(np.int32)
b = np.zeros((N, 2, 3), np.uint8)
for k in range(3): b[..., k] = (pcm >> (8 * k)) & 0xFF
with wave.open(sys.argv[1], 'w') as w:
    w.setnchannels(2); w.setsampwidth(3); w.setframerate(SR); w.writeframes(b.tobytes())
print('ok')
