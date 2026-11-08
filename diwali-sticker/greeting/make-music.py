"""Diwali score in three moods, synthesised from scratch (no samples, copyright-free, no noise sources -> no hiss).

usage: python3 make-music.py <umang|khushi|josh> out.wav [seconds]   (khushi can be stretched for voiceover videos)

All three follow the video timing: chords D - A/C# - Bm - G - A - D change at
0, 2.4, 3.9, 5.4, 6.6 and 7.4 s; the big resolve at 7.4 s lands with the Saitech brand.
  umang  : festive joy  - shehnai melody, dhol + tabla groove, bright piano, bells
  khushi : tears of joy - slow piano, warm strings, bansuri, soft bells
  josh   : pride/energy - taiko-style drums, driving string ostinato, brass stabs, big climax
"""
import sys, wave
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt

MOOD = sys.argv[1]; OUT = sys.argv[2]
T = float(sys.argv[3]) if len(sys.argv) > 3 else 10.0; K = T / 10.0   # time-stretch factor
SR = 48000; N = int(SR * T); t = np.arange(N) / SR
rng = np.random.default_rng(7)
L = np.zeros(N); R = np.zeros(N)

def hz(m): return 440.0 * 2 ** ((m - 69) / 12)

def add(sig, start, pan=0.0, gain=1.0):
    i0 = int(round(start * SR))
    if i0 < 0: sig = sig[-i0:]; i0 = 0
    i1 = min(N, i0 + len(sig))
    if i1 <= i0: return
    s = sig[:i1 - i0] * gain
    L[i0:i1] += s * np.cos((pan + 1) * np.pi / 4); R[i0:i1] += s * np.sin((pan + 1) * np.pi / 4)

def fade_env(n, a, r):
    e = np.ones(n); A = max(1, int(a * SR)); Rr = max(1, min(n, int(r * SR)))
    e[:A] = np.sin(np.linspace(0, np.pi / 2, A)) ** 2
    e[-Rr:] *= np.cos(np.linspace(0, np.pi / 2, Rr)) ** 2
    return e

CH = [(0.0, 2.4, [38, 50, 57, 62, 66, 69]), (2.4, 3.9, [37, 49, 57, 61, 64, 69]),
      (3.9, 5.4, [35, 47, 54, 59, 62, 66]), (5.4, 6.6, [31, 43, 55, 59, 62, 67]),
      (6.6, 7.4, [33, 45, 57, 61, 64, 69]), (7.4, 10.0, [26, 38, 50, 57, 62, 66, 69, 74])]
ROOT = [50, 49, 47, 43, 45, 50]
CH = [(s * K, e * K, n) for s, e, n in CH]

# ---------------- instruments (all tonal) ----------------
def strings(gain, attack, voices=5, bright=1.35):
    for ci, (s, e, notes) in enumerate(CH):
        dur = e - s + 0.9; n = int(dur * SR); tt = np.arange(n) / SR
        env = fade_env(n, attack if ci else max(attack, 1.0), 0.9)
        if ci == 5: env *= np.clip(0.8 + tt / 2.0, 0, 1.25)
        for note in notes:
            f0 = hz(note); g = 0.55 if note < 40 else 0.8 if note < 50 else 1.0
            for v in range(voices):
                det = 2 ** (rng.uniform(-8, 8) / 1200)
                vib = 1 + 0.0025 * np.sin(2 * np.pi * (4.8 + 0.3 * v) * tt + rng.uniform(0, 6))
                ph = 2 * np.pi * np.cumsum(f0 * det * vib) / SR
                sig = sum(np.sin(h * ph + rng.uniform(0, 6)) / h ** bright for h in range(1, 13) if f0 * h < 6500)
                add(sig * env * 0.010 * g, s - (0 if ci == 0 else 0.35), pan=rng.uniform(-.85, .85), gain=gain)

def piano(note, vel=0.5, dur=2.6):
    f0 = hz(note); n = int(dur * SR); tt = np.arange(n) / SR; B = 0.0003
    sig = np.zeros(n)
    for h in range(1, 11):
        fh = f0 * h * np.sqrt(1 + B * h * h)
        if fh > 8000: break
        sig += (vel / h ** 1.15) * np.exp(-tt * (0.9 + 0.6 * h)) * np.sin(2 * np.pi * fh * tt)
    return sig * fade_env(n, 0.004, 0.3)

def piano_arp(step, gain, vel=0.32):
    pat = [0, 2, 3, 4, 3, 2]
    for s, e, notes in CH[:-1]:
        up = [x for x in notes if x >= 45] + [notes[-1] + 12]; k = 0; x = s
        while x < e - 0.05:
            add(piano(up[pat[k % 6] % len(up)], vel + 0.06 * (k % 3 == 0)), x, pan=-0.3 + 0.12 * (k % 6), gain=gain)
            x += step; k += 1
    for i, nt in enumerate([50, 57, 62, 66, 69, 74, 78]):
        add(piano(nt, 0.45, 3.0), CH[5][0] + i * 0.06, pan=-0.5 + i * 0.16, gain=gain * 1.1)

def lead(mel, timbre, gain, pan=0.1, vib_rate=5.3, vib=0.006, glide=0.06, last_fade=2.0):
    """Continuous-phase legato lead. timbre: list of harmonic amplitudes."""
    freq = np.full(N, 440.0); amp = np.zeros(N)
    for i, (s, nt, d) in enumerate(mel):
        i0 = int(s * SR); i1 = min(N, int((s + d) * SR)); f = hz(nt)
        prev = hz(mel[i - 1][1]) if i else f
        seg = np.full(i1 - i0, f); g = min(len(seg), int(glide * SR))
        seg[:g] = prev * (f / prev) ** np.linspace(0, 1, g)
        tt = np.arange(i1 - i0) / SR
        freq[i0:i1] = seg * (1 + np.clip(tt / 0.4, 0, 1) * vib * np.sin(2 * np.pi * vib_rate * tt))
        a = np.clip(tt / 0.04, 0, 1) * np.clip((d - tt) / 0.05 + 0.25, 0.25, 1)
        if i == len(mel) - 1: a = np.clip(tt / 0.04, 0, 1) * np.clip(1.25 - tt / last_fade, 0, 1)
        amp[i0:i1] = np.maximum(amp[i0:i1], a)
    amp = np.convolve(amp, np.ones(480) / 480, mode='same')
    ph = 2 * np.pi * np.cumsum(freq) / SR
    sig = sum(a_ * np.sin((h + 1) * ph) for h, a_ in enumerate(timbre))
    add(sig * amp, 0, pan=pan, gain=gain)

def bell(f0, dur=6.0):
    n = int(dur * SR); tt = np.arange(n) / SR
    s = sum(a * np.exp(-tt / d) * np.sin(2 * np.pi * f0 * r * tt) for r, a, d in
            [(1, 1, 3.5), (2.0, .55, 2.4), (2.76, .45, 1.7), (5.4, .22, .9), (8.93, .1, .5)])
    return s * fade_env(n, 0.002, 0.5)

def chimes(st, gain):
    for k in range(9):
        n_ = int(1.6 * SR); tt = np.arange(n_) / SR; f = hz(rng.choice([86, 88, 90, 93, 95, 98]))
        add(np.sin(2 * np.pi * f * tt) * np.exp(-tt * 3) * fade_env(n_, .003, .2), st + k * 0.07, pan=rng.uniform(-.9, .9), gain=gain)

def drum(f_hi, f_lo, decay, dur=0.8, partials=((1, 1),), drop=25.0):
    n = int(dur * SR); tt = np.arange(n) / SR
    f = f_lo + (f_hi - f_lo) * np.exp(-tt * drop); ph = 2 * np.pi * np.cumsum(f) / SR
    s = sum(a * np.sin(r * ph) for r, a in partials)
    return s * np.exp(-tt / decay) * fade_env(n, 0.001, 0.05)

def swell(start, end, gain):
    """Tonal riser: rising string tremolo glissando (replaces the old noise whoosh)."""
    n = int((end - start) * SR); tt = np.arange(n) / SR; x = tt / (end - start)
    for base in (69, 74, 78, 81):
        f = hz(base) * 2 ** (x * 5 / 12); ph = 2 * np.pi * np.cumsum(f) / SR
        trem = 0.6 + 0.4 * np.sin(2 * np.pi * (8 + 6 * x) * tt)
        add(sum(np.sin(h * ph) / h ** 1.5 for h in range(1, 7)) * x ** 2.2 * trem * fade_env(n, .05, .03),
            start, pan=rng.uniform(-.7, .7), gain=gain)

def boom(at, gain):
    n_ = int(2.6 * SR); tt = np.arange(n_) / SR; fb = 70 * np.exp(-tt * 1.2) + 38
    add(np.sin(2 * np.pi * np.cumsum(fb) / SR) * np.exp(-tt * 1.4) * fade_env(n_, .002, .3), at, gain=gain)

def brass_stab(notes, at, dur, gain):
    n = int(dur * SR); tt = np.arange(n) / SR
    for note in notes:
        f0 = hz(note); bright = np.clip(tt / 0.06, 0, 1)        # brightness opens after attack
        sig = sum(np.sin(2 * np.pi * f0 * h * tt + h) * (1 / h) * (bright if h > 3 else 1) for h in range(1, 12) if f0 * h < 7000)
        add(sig * fade_env(n, 0.02, 0.15), at, pan=rng.uniform(-.4, .4), gain=gain)

# ---------------- arrangements ----------------
if MOOD == 'khushi':      # tears of joy
    strings(1.0, 0.7); piano_arp(0.3, 0.55, 0.34)
    mel = [(1.6, 69, .5), (2.1, 74, .3), (2.4, 76, 1.0), (3.4, 73, .5), (3.9, 74, .5), (4.4, 78, 1.0),
           (5.4, 79, .6), (6.0, 78, .3), (6.3, 76, .3), (6.6, 76, .8), (7.4, 74, 2.4)]
    mel = [(s * K, n, d * K) for s, n, d in mel]
    lead(mel, [1, .22, .06], 0.20 if K == 1 else 0.12, vib=0.007, last_fade=2.0 * K)   # bansuri (softer under a voice)
    add(bell(587.33), 0.08, -.25, .18); add(bell(880.0), 7.4 * K, .3, .14)
    chimes(0.95 * K, 0.016); chimes(7.45 * K, 0.016); swell(6.2 * K, 7.4 * K, 0.010); boom(7.4 * K - 0.02, 0.16)
elif MOOD == 'umang':     # festive joy
    strings(0.6, 0.3); piano_arp(0.2, 0.5, 0.36)
    mel = [(1.2, 69, .2), (1.4, 71, .2), (1.6, 74, .4), (2.0, 76, .2), (2.2, 78, .2),
           (2.4, 76, .4), (2.8, 73, .2), (3.0, 76, .2), (3.2, 81, .4), (3.6, 79, .3),
           (3.9, 78, .4), (4.3, 74, .2), (4.5, 78, .2), (4.7, 83, .4), (5.1, 81, .3),
           (5.4, 79, .3), (5.7, 83, .3), (6.0, 86, .3), (6.3, 83, .3),
           (6.6, 85, .4), (7.0, 88, .2), (7.2, 85, .2), (7.4, 86, 2.2)]
    lead(mel, [1, .75, .65, .5, .42, .3, .22, .15, .1], 0.085, vib_rate=6.2, vib=0.008, glide=0.035)   # shehnai
    dhol = drum(140, 70, 0.22, partials=((1, 1), (1.5, .3)), drop=30)
    na = drum(640, 600, 0.12, partials=((1, 1), (2.0, .45), (3.0, .2)), drop=60)
    ge = drum(80, 110, 0.35, partials=((1, 1), (2, .2)), drop=-4)   # bending-up bayan
    pat = ['D', 'n', 'n', 'D', 'g', 'n', 'D', 'n']; x = 1.2; k = 0
    while x < 9.6:
        p_ = pat[k % 8]
        if x >= 7.4 or x < 7.2:
            if p_ == 'D': add(dhol, x, -.1, 0.30)
            elif p_ == 'n': add(na, x, .35, 0.08)
            else: add(ge, x, -.2, 0.18)
        x += 0.2; k += 1
    for i in range(4): add(na, 6.6 + 0.2 * i + 0.1, .35, 0.06)   # little fill
    add(bell(587.33), 0.08, -.25, .16); add(bell(880.0), 7.4, .3, .15); add(bell(1174.66, 4), 7.42, -.4, .07)
    chimes(0.95, 0.02); chimes(7.45, 0.024); boom(7.38, 0.2)
elif MOOD == 'josh':      # energy & pride
    strings(0.9, 0.15, bright=1.2)
    for s, e, notes in CH:                                   # driving 16th ostinato
        r0 = ROOT[CH.index((s, e, notes))]; x = max(s, 1.2); k = 0
        while x < min(e, 9.4):
            nt = [r0, r0 + 7, r0 + 12, r0 + 7][k % 4]
            add(piano(nt - 12, 0.5, 0.18) + piano(nt, 0.35, 0.18), x, pan=-0.35 + 0.7 * (k % 2), gain=0.42)
            x += 0.1; k += 1
    mel = [(1.6, 74, .6), (2.2, 69, .2), (2.4, 76, .9), (3.3, 78, .3), (3.6, 76, .3), (3.9, 74, .3), (4.2, 78, .9),
           (5.1, 81, .3), (5.4, 83, .6), (6.0, 81, .3), (6.3, 79, .3), (6.6, 81, .4), (7.0, 85, .4), (7.4, 86, 2.2)]
    lead(mel, [1, .7, .55, .42, .3, .2, .12], 0.075, vib=0.005, glide=0.03)          # horn-like lead
    lead([(s, n - 12, d) for s, n, d in mel], [1, .6, .4, .25, .15], 0.05, pan=-0.2, vib=0.004)
    taiko = drum(95, 52, 0.45, partials=((1, 1), (1.6, .25), (2.3, .1)), drop=18)
    tom = drum(180, 120, 0.2, partials=((1, 1), (1.5, .3)), drop=25)
    x = 1.2
    while x < 6.6:
        add(taiko, x, 0, 0.42); add(tom, x + 0.3, .3, 0.16); x += 0.6
    for i, y in enumerate(np.arange(6.6, 7.35, 0.1)):         # accelerating fill
        add(tom, y, -.4 + 0.1 * i, 0.12 + 0.02 * i)
    for y in (7.4, 8.0, 8.6): add(taiko, y, 0, 0.5)
    for s, e, notes in CH[1:]:
        brass_stab([n for n in notes if 50 <= n <= 74], s, 0.45 if s < 7.4 else 1.8, 0.035)
    swell(6.0, 7.4, 0.016); boom(7.38, 0.32)
    add(bell(587.33), 0.08, -.25, .14); add(bell(880.0), 7.4, .3, .15)
else:
    sys.exit('mood must be umang, khushi or josh')

# ---------------- mix ----------------
ir_n = int(3.0 * SR); it = np.arange(ir_n) / SR
lp = butter(2, 4200, fs=SR, output='sos')            # dark, smooth tail (no airy hiss)
decay = {'khushi': 0.95, 'umang': 0.6, 'josh': 0.75}[MOOD]
irL = sosfilt(lp, rng.normal(0, 1, ir_n)) * np.exp(-it / decay); irR = sosfilt(lp, rng.normal(0, 1, ir_n)) * np.exp(-it / decay)
irL[:int(.012 * SR)] = 0; irR[:int(.017 * SR)] = 0
irL /= np.sqrt((irL ** 2).sum()); irR /= np.sqrt((irR ** 2).sum())
wet = {'khushi': 0.45, 'umang': 0.28, 'josh': 0.33}[MOOD]
oL = L + wet * fftconvolve(L, irL)[:N]; oR = R + wet * fftconvolve(R, irR)[:N]
mid, side = (oL + oR) / 2, (oL - oR) / 2; oL, oR = mid + 1.3 * side, mid - 1.3 * side
band = butter(2, [45, 14000], btype='band', fs=SR, output='sos')
oL, oR = sosfilt(band, oL), sosfilt(band, oR)
fade = np.ones(N); fi = int(0.03 * SR); fo = int(1.5 * K * SR)
fade[:fi] = np.linspace(0, 1, fi); fade[-fo:] = np.cos(np.linspace(0, np.pi / 2, fo)) ** 2
st = np.stack([oL, oR], 1) * fade[:, None]
st /= np.abs(st).max(); st = np.tanh(st * 1.6) / np.tanh(1.6) * 0.89
pcm = (st * (2 ** 23 - 1)).astype(np.int32); b = np.zeros((N, 2, 3), np.uint8)
for k in range(3): b[..., k] = (pcm >> (8 * k)) & 0xFF
with wave.open(OUT, 'w') as w:
    w.setnchannels(2); w.setsampwidth(3); w.setframerate(SR); w.writeframes(b.tobytes())
print(MOOD, 'ok')
