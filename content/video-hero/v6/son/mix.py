"""Mix voice-over + sound effects for film v6 (no music).
Usage: python3 mix6.py vo.wav sfx.wav out.wav [sfx_lu_below_voice] [target_lufs] [duck_db] ["t0-t1:dB,..."]
The effects sit a few LU under the voice and dip a little more while a word is spoken, so every
syllable stays clear and the effects breathe in the gaps. Final level -16 LUFS, peaks under -1.5 dBFS.
"""
import sys
import numpy as np
import scipy.io.wavfile as wf
from scipy.signal import butter, sosfilt
import pyloudnorm as pyln

VO, SFX, OUT = sys.argv[1:4]
BELOW = float(sys.argv[4]) if len(sys.argv) > 4 else 9.0
TARGET = float(sys.argv[5]) if len(sys.argv) > 5 else -16.0
DUCK = float(sys.argv[6]) if len(sys.argv) > 6 else 6.0
SR = 48000


def load(p):
    sr, x = wf.read(p); assert sr == SR, (p, sr)
    x = x.astype(np.float64) / 32768
    return np.vstack([x, x]) if x.ndim == 1 else x.T


v, s = load(VO), load(SFX)
n = max(v.shape[1], s.shape[1])
pad = lambda x: np.pad(x, ((0, 0), (0, n - x.shape[1])))
v, s = pad(v), pad(s)
meter = pyln.Meter(SR)
lv, ls = meter.integrated_loudness(v.T), meter.integrated_loudness(s.T)
s *= 10 ** ((lv - BELOW - ls) / 20)

# sidechain: effects dip up to DUCK dB under the voice (fast attack, gentle release)
e = np.abs(v[0]); att, rel = np.exp(-1 / (0.008 * SR)), np.exp(-1 / (0.14 * SR))
env = np.empty_like(e); acc = 0.0
for i in range(len(e)):
    k = att if e[i] > acc else rel
    acc = k * acc + (1 - k) * e[i]; env[i] = acc
lvl = np.clip(env / (np.percentile(env[env > 1e-4], 90) + 1e-9), 0, 1)
duck = 10 ** (-DUCK * lvl / 20)
s *= duck
# extra room for words that must stay crystal clear: "t0-t1:dB,..." (7th argument)
if len(sys.argv) > 7 and sys.argv[7]:
    g = np.zeros(s.shape[1])
    for part in sys.argv[7].split(','):
        span, d = part.split(':'); t0, t1 = map(float, span.split('-'))
        i0, i1 = int(t0 * SR), int(t1 * SR); r = int(0.06 * SR)
        w = np.zeros(s.shape[1]); w[i0:i1] = 1
        w[max(0, i0 - r):i0] = np.linspace(0, 1, i0 - max(0, i0 - r)); w[i1:i1 + r] = np.linspace(1, 0, len(w[i1:i1 + r]))
        g = np.minimum(g, w * float(d))
    s *= 10 ** (g / 20)

mix = v + s
mix = sosfilt(butter(2, 30, 'high', fs=SR, output='sos'), mix, axis=-1)
lm = meter.integrated_loudness(mix.T)
mix *= 10 ** ((TARGET - lm) / 20)
lim = 10 ** (-1.5 / 20); k = lim * 0.8
mix = np.where(np.abs(mix) > k, np.sign(mix) * (k + (lim - k) * np.tanh((np.abs(mix) - k) / (lim - k))), mix)
print(f'voice {lv:.1f} LUFS, effects {ls:.1f} -> {lv - BELOW:.1f} LUFS (before ducking)')
print('mix LUFS', round(meter.integrated_loudness(mix.T), 1), 'peak dBFS', round(20 * np.log10(np.max(np.abs(mix))), 1))
wf.write(OUT, SR, (mix.T * 32767).astype(np.int16))
