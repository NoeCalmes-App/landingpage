# Son du film v11 : le mix final de la v10 (mix-final.wav), avec
#  1. les bruitages du début remplacés par ceux de la v11 (bruitages_v11.py : « En 2026, », « un vrai pari. »
#     et les dés recalés sur la voix, les dés 6 dB plus bas), placés au même niveau et avec le même « ducking »
#     sous la voix que dans la v10 (gain retrouvé dans le mix : +3,78 dB, -6,97 dB à pleine voix) ;
#  2. le « t » recollé de « vingt-six » adouci (il partait d'un silence numérique, d'un coup : un clic).
# Ailleurs, le son est exactement celui de la v10.
# usage : python3 son_v11.py mix-final.wav voix-off.wav bruitages-v10.wav bruitages-v11.wav sortie.wav
import sys
import numpy as np, scipy.io.wavfile as wf
from scipy.signal import butter, sosfilt

MIX, VO, S10, S11, OUT = sys.argv[1:6]
SR = 48000
def load(p):
    sr, x = wf.read(p); assert sr == SR
    x = x.astype(np.float64) / 32768
    return np.vstack([x, x]) if x.ndim == 1 else x.T
m, v, s10, s11 = load(MIX), load(VO), load(S10), load(S11)
n = m.shape[1]
pad = lambda x: np.pad(x, ((0, 0), (0, max(0, n - x.shape[1]))))[:, :n]
v, s10, s11 = pad(v), pad(s10), pad(s11)
hp = butter(2, 30, 'high', fs=SR, output='sos')
K = 0.9497                                                  # gain de la voix dans le mix (normalisation à -16 LUFS)
G0, DUCK = 3.78, 6.97                                       # gain des bruitages, et leur baisse sous la voix

# enveloppe de la voix, comme dans mix.py (attaque 8 ms, relâche 140 ms)
e = np.abs(v[0]); att, rel = np.exp(-1 / (0.008 * SR)), np.exp(-1 / (0.14 * SR))
env = np.empty_like(e); acc = 0.0
for i in range(len(e)):
    k = att if e[i] > acc else rel
    acc = k * acc + (1 - k) * e[i]; env[i] = acc
lvl = np.clip(env / (np.percentile(env[env > 1e-4], 90) + 1e-9), 0, 1)
G = 10 ** ((G0 - DUCK * lvl) / 20)

# 2. le « t » de vingt-six : fondu de 2 ms et premier éclat de -8 dB qui remonte en 12 ms
v2 = v.copy(); t0 = int(2.4340 * SR); f_in = int(0.002 * SR); e1 = int(0.012 * SR)
g = np.ones(n); g[t0 - f_in:t0] = 0; g[t0:t0 + f_in] = 0.5 - 0.5 * np.cos(np.linspace(0, np.pi, f_in))
g[t0:t0 + e1] *= 10 ** (np.linspace(-8, 0, e1) / 20)
v2 *= g

delta = K * sosfilt(hp, (v2 - v) + G * (s11 - s10), axis=-1)
out = m + delta
# même limiteur doux que mix.py, seulement là où le son a changé
lim = 10 ** (-1.5 / 20); kk = lim * 0.8
chg = np.abs(delta) > 1e-7
big = chg & (np.abs(out) > kk)
out[big] = np.sign(out[big]) * (kk + (lim - kk) * np.tanh((np.abs(out[big]) - kk) / (lim - kk)))
w = np.where(chg.any(axis=0))[0]
print(f'son modifié entre {w[0] / SR:.2f} et {w[-1] / SR:.2f} s ; pic {20 * np.log10(np.abs(out).max()):.1f} dBFS')
wf.write(OUT, SR, (np.clip(out, -1, 1).T * 32767).astype(np.int16))
