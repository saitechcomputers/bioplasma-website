"""Build the voiceover Diwali video.

usage: python3 make-voice-video.py VOICE_DIR OUT.mp4 FRAMES_DIR
VOICE_DIR is the output of make-voice.py (line01.wav ... + lines.json).
Steps: plan timeline from line durations -> render frames -> music (khushi, stretched so the
climax lands on the brand) -> warm/reverb the voice -> duck music under it -> mux.
"""
import json, os, subprocess, sys, wave
import numpy as np
from scipy.signal import butter, sosfilt, fftconvolve, resample_poly

HERE = os.path.dirname(os.path.abspath(__file__))
vdir, out_mp4, frames = sys.argv[1], sys.argv[2], sys.argv[3]
meta = json.load(open(os.path.join(vdir, 'lines.json')))
SR = 48000

def read_wav(p):
    w = wave.open(p); sr = w.getframerate(); n = w.getnframes(); sw = w.getsampwidth(); ch = w.getnchannels()
    raw = w.readframes(n)
    if sw == 2: x = np.frombuffer(raw, np.int16).astype(np.float64) / 32768
    elif sw == 3:
        b = np.frombuffer(raw, np.uint8).reshape(-1, 3).astype(np.int32)
        x = (b[:, 0] | (b[:, 1] << 8) | (b[:, 2] << 16)); x = np.where(x >= 2 ** 23, x - 2 ** 24, x) / 2 ** 23
    else: x = np.frombuffer(raw, np.int32).astype(np.float64) / 2 ** 31
    return x.reshape(-1, ch), sr

# ---------- timeline ----------
gaps = [0.0, 0.75, 0.8, 0.45, 0.9, 1.7]             # long breath before the closing line: the music climax lands there            # pause before each line
t = 1.4; starts = []
for g, ln in zip(gaps, meta['lines']):
    t += g; starts.append(t); t += ln['dur']
voice_end = t
brand = starts[5] - 1.3                               # brand + music climax, in the pause before the closing line
T = round(voice_end + 2.6, 2)
K = brand / 7.4
tl = [0.9, starts[0] - 0.1, starts[1] - 0.2, starts[2] - 0.2, starts[4] - 0.2, brand]
print('duration %.2fs  K=%.2f  timeline %s' % (T, K, ', '.join('%.2f' % x for x in tl)))

# ---------- frames ----------
os.makedirs(frames, exist_ok=True)
for f in os.listdir(frames): os.remove(os.path.join(frames, f))
subprocess.run(['node', os.path.join(HERE, 'render-greeting.js'), 'video', frames, str(T), ','.join('%.2f' % x for x in tl)], check=True)

# ---------- music ----------
mus_path = os.path.join(frames, '..', 'voice-music.wav')
subprocess.run([sys.executable, os.path.join(HERE, 'make-music.py'), 'khushi', mus_path, str(T), str(brand)], check=True)
music, _ = read_wav(mus_path)
N = len(music)

# ---------- voice track ----------
voice = np.zeros(N)
for st, ln in zip(starts, meta['lines']):
    x, sr = read_wav(os.path.join(vdir, os.path.basename(ln['file']))); x = x.mean(1)
    x = resample_poly(x, SR, sr)
    i0 = int(st * SR); i1 = min(N, i0 + len(x)); voice[i0:i1] += x[:i1 - i0]
# warmth: gentle low-mid lift, tame harshness, remove rumble
voice = sosfilt(butter(2, 70, btype='high', fs=SR, output='sos'), voice)
low = sosfilt(butter(2, 300, fs=SR, output='sos'), voice)
harsh = sosfilt(butter(2, [4500, 9000], btype='band', fs=SR, output='sos'), voice)
voice = voice + 0.35 * low - 0.35 * harsh
# soft compression
env = np.sqrt(np.convolve(voice ** 2, np.ones(960) / 960, mode='same')) + 1e-6
gain = np.minimum(1, (0.12 / env) ** 0.4); voice *= np.convolve(gain, np.ones(480) / 480, mode='same')
voice /= np.abs(voice).max()
# small warm room reverb, slightly different per side for width
rng = np.random.default_rng(3); n_ir = int(1.4 * SR); it = np.arange(n_ir) / SR
lp = butter(2, 3500, fs=SR, output='sos')
irs = [sosfilt(lp, rng.normal(0, 1, n_ir)) * np.exp(-it / 0.35) for _ in range(2)]
for ir, d in zip(irs, (0.015, 0.021)): ir[:int(d * SR)] = 0; ir /= np.sqrt((ir ** 2).sum())
vL = voice + 0.22 * fftconvolve(voice, irs[0])[:N]; vR = voice + 0.22 * fftconvolve(voice, irs[1])[:N]

# ---------- duck music under the voice ----------
active = np.convolve((np.abs(voice) > 0.02).astype(float), np.ones(int(0.35 * SR)), mode='same') > 0
duck = np.where(active, 0.32, 1.0)
k = int(0.3 * SR); duck = np.convolve(duck, np.ones(k) / k, mode='same')
mix = music * duck[:, None] * 0.9 + np.stack([vL, vR], 1) * 0.62
mix /= np.abs(mix).max(); mix = np.tanh(mix * 1.4) / np.tanh(1.4) * 0.9
pcm = (mix * 32767).astype(np.int16)
mix_path = os.path.join(frames, '..', 'voice-mix.wav')
with wave.open(mix_path, 'w') as w:
    w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(pcm.tobytes())

subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-framerate', '30', '-i', os.path.join(frames, 'f%04d.jpg'), '-i', mix_path,
                '-c:v', 'libx264', '-preset', 'slow', '-crf', '18', '-pix_fmt', 'yuv420p', '-profile:v', 'high',
                '-movflags', '+faststart', '-c:a', 'aac', '-b:a', '320k', '-ar', '48000', '-shortest', out_mp4], check=True)
print('wrote', out_mp4)
