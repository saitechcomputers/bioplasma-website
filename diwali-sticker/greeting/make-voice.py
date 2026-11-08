"""Hindi voiceover with the AI4Bharat Indic-TTS model (FastPitch + HiFi-GAN, IIT Madras).

Model: https://github.com/AI4Bharat/Indic-TTS/releases/download/v1-checkpoints-release/hi.zip (unzipped to MODEL_DIR)
usage: python make-voice.py MODEL_DIR OUT_DIR [female|male] [length_scale]
Writes OUT_DIR/line01.wav ... and OUT_DIR/lines.json (durations in seconds).
"""
import json, os, sys
import numpy as np
from TTS.utils.synthesizer import Synthesizer

LINES = [
    "शुभ दीपावली।",
    "दीपों की यह रोशनी, आपके घर-आँगन को, सुख, समृद्धि, और अपनों के प्यार से भर दे।",
    "आपका भरोसा ही, हमारी असली दिवाली है।",
    "हर साल, हर कदम पर, हम आपके साथ हैं।",
    "सैटेक कंप्यूटर्स की ओर से, आपको और आपके परिवार को, दीपावली की हार्दिक शुभकामनाएँ।",
    "सैटेक कंप्यूटर्स। कम्प्लीटली यॉर्स।",
]

model_dir, out_dir = sys.argv[1], sys.argv[2]
speaker = sys.argv[3] if len(sys.argv) > 3 else 'female'
length_scale = float(sys.argv[4]) if len(sys.argv) > 4 else 1.12   # >1 = slower, calmer delivery
os.makedirs(out_dir, exist_ok=True)

# the shipped config points speakers_file at the authors' path; point it at the local copy
cfg = json.load(open(f'{model_dir}/fastpitch/config.json'))
spk_path = os.path.abspath(f'{model_dir}/fastpitch/speakers.pth')
cfg['speakers_file'] = spk_path
if isinstance(cfg.get('model_args'), dict) and 'speakers_file' in cfg['model_args']:
    cfg['model_args']['speakers_file'] = spk_path
cfg_path = os.path.join(out_dir, 'fastpitch_config.json'); json.dump(cfg, open(cfg_path, 'w'), ensure_ascii=False)

syn = Synthesizer(
    tts_checkpoint=f'{model_dir}/fastpitch/best_model.pth',
    tts_config_path=cfg_path,
    tts_speakers_file=f'{model_dir}/fastpitch/speakers.pth',
    vocoder_checkpoint=f'{model_dir}/hifigan/best_model.pth',
    vocoder_config=f'{model_dir}/hifigan/config.json',
    use_cuda=False,
)
names = list(syn.tts_model.speaker_manager.name_to_id) if syn.tts_model.speaker_manager else []
print('speakers:', names)
spk = next((n for n in names if n.lower().startswith(speaker)), names[0] if names else None)
if hasattr(syn.tts_model, 'length_scale'):
    syn.tts_model.length_scale = length_scale

sr = syn.output_sample_rate
meta = []
for i, text in enumerate(LINES, 1):
    wav = np.array(syn.tts(text.replace('।', '.'), speaker_name=spk), dtype=np.float32)   # model has no '।'
    # trim leading/trailing silence
    nz = np.where(np.abs(wav) > 0.01)[0]
    if len(nz): wav = wav[max(0, nz[0] - int(0.03 * sr)): nz[-1] + int(0.08 * sr)]
    path = f'{out_dir}/line{i:02d}.wav'
    syn.save_wav(wav.tolist(), path)
    meta.append({'file': path, 'text': text, 'dur': len(wav) / sr})
    print(f'{i}: {len(wav) / sr:.2f}s  {text}')
json.dump({'sr': sr, 'speaker': spk, 'lines': meta}, open(f'{out_dir}/lines.json', 'w'), ensure_ascii=False, indent=1)
