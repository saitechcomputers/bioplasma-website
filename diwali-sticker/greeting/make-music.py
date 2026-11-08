"""Synthesise a calm 10 s Diwali background score (temple bell, tanpura drone, plucked Yaman melody)."""
import numpy as np, wave, sys
sr = 44100; T = 10.0; n = int(sr * T); t = np.arange(n) / sr
out = np.zeros(n)
Sa = 146.83  # D3
def env(start, dur, attack=0.01, decay=2.0):
    e = np.zeros(n); i0 = int(start * sr); i1 = min(n, i0 + int(dur * sr))
    tt = np.arange(i1 - i0) / sr
    e[i0:i1] = np.minimum(1, tt / attack) * np.exp(-tt / decay)
    return e
# tanpura: Pa Sa' Sa' Sa cycle, rich harmonics with slow "jawari" shimmer
cyc = [Sa * 1.5 / 2 * 2, Sa * 2, Sa * 2, Sa]
k = 0; s = 0.2
while s < T:
    f = cyc[k % 4]; e = env(s, 4.0, 0.03, 1.6)
    for h in range(1, 12):
        out += e * (0.11 / h ** 0.9) * np.sin(2 * np.pi * f * h * t + 0.3 * np.sin(2 * np.pi * 0.7 * t * h)) * (1 + 0.15 * np.sin(2 * np.pi * (0.5 + h * 0.13) * t))
    s += 0.75; k += 1
# temple bell at the start and a softer one at the end
for st, amp in [(0.15, 0.55), (7.4, 0.35)]:
    for ratio, a, d in [(1, 1, 3.5), (2.0, .6, 2.5), (2.76, .45, 1.8), (5.4, .25, 1.0), (8.93, .15, .6)]:
        out += amp * a * env(st, 6, 0.002, d) * np.sin(2 * np.pi * 523.25 * ratio * t)
# plucked melody (Karplus-Strong), Raag Yaman flavour
def pluck(freq, start, dur=2.2, amp=0.5):
    N = int(sr / freq); buf = np.random.default_rng(int(freq)).uniform(-1, 1, N)
    m = int(dur * sr); y = np.zeros(m)
    for i in range(m):
        y[i] = buf[i % N]; buf[i % N] = 0.996 * 0.5 * (buf[i % N] + buf[(i + 1) % N])
    i0 = int(start * sr); i1 = min(n, i0 + m); out[i0:i1] += amp * y[:i1 - i0]
r = 2 ** (1 / 12); S2 = Sa * 2
notes = [(1.6, 11), (2.0, 14), (2.4, 16), (3.0, 18), (3.6, 19), (4.4, 16), (4.8, 18), (5.2, 14), (5.8, 12),
         (6.2, 11), (6.8, 12), (7.2, 14), (7.9, 12), (8.4, 7)]
for st, semi in notes:
    pluck(Sa * r ** semi, st, amp=0.42)
# soft string pad underneath
for f in (Sa, Sa * 1.5, Sa * 2):
    out += 0.05 * np.sin(2 * np.pi * f * t) * np.clip((t - 1.0) / 2.5, 0, 1)
# simple reverb (feedback delays)
for d, g in [(0.031, .35), (0.047, .3), (0.071, .25), (0.113, .2)]:
    k = int(d * sr); y = out.copy()
    for i in range(k, n, k): y[i:i + k] += g * y[i - k:i][:len(y[i:i + k])]
    out = 0.7 * out + 0.3 * y
fade = np.ones(n); fade[:int(.4 * sr)] = np.linspace(0, 1, int(.4 * sr)); fade[-int(1.8 * sr):] = np.linspace(1, 0, int(1.8 * sr)) ** 1.5
out *= fade; out = out / np.max(np.abs(out)) * 0.8
st = np.stack([out, np.roll(out, 300)], 1)
with wave.open(sys.argv[1], 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(sr); w.writeframes((st * 32767).astype(np.int16).tobytes())
