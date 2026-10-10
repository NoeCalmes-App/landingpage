# Horodatage mot à mot de la voix du film (faster-whisper), pour les sous-titres du Reel.
import json, sys
import numpy as np, scipy.io.wavfile as wf
from faster_whisper import WhisperModel
m = WhisperModel('medium', device='cpu', compute_type='int8')
sr, x = wf.read(sys.argv[1]); assert sr == 16000
audio = (x.astype(np.float32) / 32768.0) if x.dtype == np.int16 else x.astype(np.float32)
segs, info = m.transcribe(audio, language='fr', word_timestamps=True, beam_size=5, vad_filter=False,
                          initial_prompt="Créer ton application mobile ou ton SaaS en 2026 est un vrai pari.")
out = []
for s in segs:
    for w in s.words:
        out.append([round(w.start, 3), round(w.end, 3), w.word.strip()])
json.dump(out, open(sys.argv[2], 'w'), ensure_ascii=False)
print(len(out), 'mots'); print(' '.join(w[2] for w in out))
