import json, numpy as np, scipy.io.wavfile as wf
from faster_whisper import WhisperModel
sr, x = wf.read('voix16k.wav'); a = (x.astype(np.float32) / 32768.0)[: int(4.4 * sr)]
m = WhisperModel('medium', device='cpu', compute_type='int8')
segs, _ = m.transcribe(a, language='fr', word_timestamps=True, beam_size=5, vad_filter=False)
out = [[round(w.start, 3), round(w.end, 3), w.word.strip()] for s in segs for w in s.words]
json.dump(out, open('mots_debut.json', 'w'), ensure_ascii=False); print(out)
