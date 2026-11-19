"""Diwali firecracker soundscape that builds up (josh) - synthesised, no samples.

crackers(T, speech, climax) -> (stereo float array at 48 kHz, list of firework burst times for the visuals)
  speech : list of (start, end) seconds where the voice is talking (crackers stay low there)
  climax : time of the big finale (brand reveal)
Sounds: distant pops, ladi (string of crackers), rockets (whistle + burst + crackle), sutli bombs.
"""
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve

SR = 48000


def _bp(x, lo, hi):
    return sosfilt(butter(2, [lo, hi], btype='band', fs=SR, output='sos'), x)


def _lp(x, f):
    return sosfilt(butter(2, f, fs=SR, output='sos'), x)


def crackers(T, speech, climax, seed=11):
    rng = np.random.default_rng(seed)
    N = int(T * SR); L = np.zeros(N); R = np.zeros(N)
    bursts = []

    def add(sig, at, pan, gain):
        i0 = int(at * SR)
        if i0 >= N: return
        i1 = min(N, i0 + len(sig)); s = sig[:i1 - i0] * gain
        L[i0:i1] += s * np.cos((pan + 1) * np.pi / 4); R[i0:i1] += s * np.sin((pan + 1) * np.pi / 4)

    def talking(t):
        return any(a - 0.15 <= t <= b + 0.1 for a, b in speech)

    def pop(size=1.0, dist=0.0):
        n = int((0.02 + 0.03 * size) * SR); tt = np.arange(n) / SR
        s = _bp(rng.normal(0, 1, n), 700, 7000 - 4500 * dist) * np.exp(-tt / (0.004 + 0.006 * size))
        s += np.sin(2 * np.pi * (180 - 60 * size) * tt) * np.exp(-tt / 0.02) * 0.6 * size
        return s

    def bomb(size=1.0):
        n = int(1.6 * SR); tt = np.arange(n) / SR
        crack = _lp(rng.normal(0, 1, n), 1800) * np.exp(-tt / (0.05 + 0.05 * size)) * 1.4
        f = 45 + 45 * np.exp(-tt * 18)
        thump = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-tt / (0.25 + 0.2 * size)) * 1.6
        s = (crack + thump) * size
        a = int(0.002 * SR); s[:a] *= np.linspace(0, 1, a)
        return s

    def ladi(dur, density=1.0, dist=0.0):
        n = int((dur + 0.2) * SR); s = np.zeros(n); x = 0.0
        while x < dur:
            p = pop(rng.uniform(0.4, 1.0) * (1.6 if rng.random() < 0.08 else 1), dist)
            i = int(x * SR); j = min(n, i + len(p)); s[i:j] += p[:j - i] * rng.uniform(0.5, 1.0)
            x += rng.uniform(0.018, 0.07) / density
        return s

    def rocket(at, pan, gain, burst_size=1.0):
        fly = 0.85; n = int(fly * SR); tt = np.arange(n) / SR
        f = 900 + 1900 * (tt / fly) ** 0.8
        whistle = np.sin(2 * np.pi * np.cumsum(f) / SR) * (0.25 + 0.75 * tt / fly) * 0.35
        whoosh = _bp(rng.normal(0, 1, n), 1500, 5000) * 0.06 * (tt / fly)
        add(whistle + whoosh, at, pan, gain)
        b = at + fly
        add(bomb(0.7 * burst_size), b, pan, gain * 0.9)
        crackle = ladi(1.3, density=1.6, dist=0.3) * np.exp(-np.arange(int(1.5 * SR)) / SR / 0.7)
        add(crackle, b + 0.12, pan + rng.uniform(-.3, .3), gain * 0.35)
        bursts.append(round(b, 2))

    # --- build-up: sparse distant pops getting denser and closer ---
    x = 0.2
    while x < climax:
        prog = x / climax
        if not talking(x) or rng.random() < 0.5:
            dist = 1 - prog
            add(_lp(pop(rng.uniform(.4, 1)), 5000 - 3500 * dist), x, rng.uniform(-1, 1),
                (0.05 + 0.25 * prog) * (0.35 if talking(x) else 1))
        x += rng.uniform(0.15, 0.6) * (1.3 - prog)
    # opening rocket
    rocket(0.1, -0.3, 0.55)
    # rockets/bombs in each pause between lines, growing
    pauses = [(speech[i][1], speech[i + 1][0]) for i in range(len(speech) - 1)]
    for k, (a, b) in enumerate(pauses):
        g = 0.6 + 0.15 * k
        if b - a > 0.4 and b < climax - 0.5:
            rocket(max(a - 0.7, 0), rng.uniform(-.7, .7), g * 0.8)
            add(bomb(0.6 + 0.1 * k), a + 0.15, rng.uniform(-.6, .6), g * 0.7)
    # distant ladi running under the middle part
    add(_lp(ladi(4.0, 0.8, dist=0.8), 2500), climax * 0.45, 0.6, 0.12)
    add(_lp(ladi(4.0, 0.9, dist=0.6), 3500), climax * 0.7, -0.6, 0.16)
    # --- finale at the brand reveal ---
    add(ladi(3.5, 1.4), climax - 1.2, -0.5, 0.5)
    add(ladi(3.5, 1.4), climax - 1.1, 0.5, 0.5)
    rocket(climax - 0.85, -0.6, 0.8, 1.3); rocket(climax - 0.7, 0.6, 0.8, 1.3)
    add(bomb(1.3), climax, 0.0, 1.0); add(bomb(1.1), climax + 0.35, -0.4, 0.8); add(bomb(1.2), climax + 0.7, 0.4, 0.85)
    end = speech[-1][1]
    for i, y in enumerate(np.arange(end + 0.1, T - 1.0, 0.45)):
        rocket(y - 0.85, rng.uniform(-.8, .8), 0.65, 1.1)
        add(bomb(1.0), y + 0.2, rng.uniform(-.6, .6), 0.6)
    add(ladi(T - end, 1.5), end, 0.0, 0.45)

    # outdoor echo + reverb
    for d, g, f in [(0.23, 0.35, 2500), (0.47, 0.22, 1800), (0.81, 0.12, 1200)]:
        k = int(d * SR)
        L[k:] += _lp(R[:-k], f) * g; R[k:] += _lp(L[:-k], f) * g
    n_ir = int(1.8 * SR); it = np.arange(n_ir) / SR
    irs = [_lp(rng.normal(0, 1, n_ir), 3000) * np.exp(-it / 0.6) for _ in range(2)]
    for ir in irs: ir[:int(0.02 * SR)] = 0; ir /= np.sqrt((ir ** 2).sum())
    L = L + 0.3 * fftconvolve(L, irs[0])[:N]; R = R + 0.3 * fftconvolve(R, irs[1])[:N]
    st = np.stack([L, R], 1)
    st = sosfilt(butter(2, 35, btype='high', fs=SR, output='sos'), st, axis=0)
    return st / (np.abs(st).max() + 1e-9), sorted(set(bursts))
