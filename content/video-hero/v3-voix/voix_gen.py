import sys, time, torch, numpy as np, scipy.io.wavfile as wf
from moshi.models.tts import get_default_tts_model
torch.set_num_threads(2)
text, voice, out = sys.argv[1], sys.argv[2], sys.argv[3]
cfg = float(sys.argv[4]) if len(sys.argv) > 4 else 2.0
t0 = time.time()
tts = get_default_tts_model(n_q=32, device='cpu')
print('loaded', round(time.time() - t0, 1), flush=True)
t1 = time.time()
with torch.no_grad():
    pcms = tts.simple_generate(text, voice, cfg_coef=cfg, show_progress=False)
pcm = pcms[0].float().cpu().numpy()
sr = tts.mimi.sample_rate
wf.write(out, sr, (np.clip(pcm, -1, 1) * 32767).astype(np.int16))
print('gen', round(time.time() - t1, 1), 's for', round(len(pcm) / sr, 2), 's audio @', sr, flush=True)
