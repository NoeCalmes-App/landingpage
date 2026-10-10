"""Sound design + music bed + voice-over mix for the hero film.
Usage: python3 sound.py cues.json vo.wav out.wav [--no-vo]
cues.json holds the same cue times the film uses (c1..c8, c6b, end) and 'vo_offset'.
"""
import json, sys
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt, resample_poly
import scipy.io.wavfile as wf

SR = 48000
rng = np.random.default_rng(7)
Q = json.load(open(sys.argv[1]))
VO_PATH = sys.argv[2]
OUT = sys.argv[3]
NO_VO = '--no-vo' in sys.argv
END = Q['end']
N = int(END * SR) + SR // 2

def z(n): return np.zeros(n, dtype=np.float64)
def tsec(n): return np.arange(n) / SR
def db(x): return 10 ** (x / 20)

music = np.zeros((2, N)); sfx = np.zeros((2, N)); vo = np.zeros((2, N))

def place(bus, sig, t, gain=1.0, pan=0.0):
    """mono or stereo signal into bus at time t (s), equal-power pan."""
    i = int(round(t * SR))
    if sig.ndim == 1:
        l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
        sig = np.vstack([sig * l * 1.4142, sig * r * 1.4142])
    if i < 0:
        sig = sig[:, -i:]; i = 0
    n = min(sig.shape[1], N - i)
    if n > 0: bus[:, i:i + n] += sig[:, :n] * gain

def lp(x, f, order=2):
    return sosfilt(butter(order, min(f, SR / 2 - 100), 'low', fs=SR, output='sos'), x)
def hp(x, f, order=2):
    return sosfilt(butter(order, f, 'high', fs=SR, output='sos'), x)
def bp(x, f0, f1, order=2):
    return sosfilt(butter(order, [f0, min(f1, SR / 2 - 100)], 'band', fs=SR, output='sos'), x)

def svf_sweep(x, f_curve, q=0.9, mode='bp'):
    """time-varying state-variable filter (Chamberlin)."""
    out = np.empty_like(x); low = band = 0.0
    damp = 1.0 / q
    for i in range(len(x)):
        f = 2 * np.sin(np.pi * min(f_curve[i], 12000) / SR)
        low += f * band
        high = x[i] - low - damp * band
        band += f * high
        out[i] = band if mode == 'bp' else (high if mode == 'hp' else low)
    return out

def env_exp(n, decay):
    return np.exp(-tsec(n) / decay)

def fade(sig, a=0.004, r=0.01):
    n = len(sig); na, nr = int(a * SR), int(r * SR)
    e = np.ones(n)
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] = np.linspace(1, 0, nr)
    return sig * e

def midi(m): return 440.0 * 2 ** ((m - 69) / 12)

# ------------------------------------------------------------ instruments
def pad_chord(notes, dur, cutoff=1400, attack=1.2, release=1.5, detune=0.11, voices=4):
    n = int((dur + release) * SR); t = tsec(n); out = np.zeros((2, n))
    for k, m in enumerate(notes):
        f = midi(m)
        for v in range(voices):
            cents = (v - (voices - 1) / 2) * detune * 100 / (voices - 1)
            fv = f * 2 ** (cents / 1200)
            ph = rng.uniform(0, 2 * np.pi)
            s = np.zeros(n)
            h = 1
            while fv * h < cutoff * 1.6 and h < 24:
                s += np.sin(2 * np.pi * fv * h * t + ph * h) / h * np.exp(-((fv * h) / cutoff) ** 2)
                h += 1
            pan = ((v / max(voices - 1, 1)) * 2 - 1) * 0.7
            out[0] += s * np.cos((pan + 1) * np.pi / 4); out[1] += s * np.sin((pan + 1) * np.pi / 4)
    e = np.minimum(1, t / attack) * np.where(t > dur, np.exp(-(t - dur) / (release / 3)), 1)
    out *= e / (len(notes) * voices) * 1.2
    return out

def pluck(m, dur=0.6, bright=1.0, decay=0.22):
    n = int(dur * SR); t = tsec(n); f = midi(m)
    idx = (2.2 * bright) * np.exp(-t / 0.06)
    s = np.sin(2 * np.pi * f * t + idx * np.sin(2 * np.pi * 2 * f * t))
    s += 0.25 * np.sin(2 * np.pi * f * 0.5 * t)
    s *= np.exp(-t / decay) * np.minimum(1, t / 0.002)
    return fade(s, 0.0, 0.03) * 0.5

def bell(m, dur=1.8, amp=1.0):
    n = int(dur * SR); t = tsec(n); f = midi(m)
    s = np.sin(2 * np.pi * f * t + 1.6 * np.exp(-t / 0.4) * np.sin(2 * np.pi * f * 3.5 * t))
    s += 0.3 * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t / 0.5)
    s *= np.exp(-t / 0.7) * np.minimum(1, t / 0.003)
    return fade(s, 0, 0.05) * 0.35 * amp

def kick(amp=1.0, f0=110, f1=46, dec=0.32):
    n = int(0.6 * SR); t = tsec(n)
    f = f1 + (f0 - f1) * np.exp(-t / 0.045)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / dec)
    click = hp(rng.standard_normal(n), 2500) * np.exp(-t / 0.004) * 0.25
    return fade(s + click, 0, 0.02) * 0.9 * amp

def sub(m, dur, amp=1.0):
    n = int(dur * SR); t = tsec(n)
    s = np.sin(2 * np.pi * midi(m) * t) * np.minimum(1, t / 0.02) * np.exp(-t / (dur * 0.7))
    return fade(s, 0, 0.08) * amp

def whoosh(dur=0.6, f0=300, f1=2600, f2=600, amp=1.0, q=0.8, pan0=-0.5, pan1=0.5):
    n = int(dur * SR); t = tsec(n); u = t / dur
    fc = np.where(u < 0.6, f0 * (f1 / f0) ** (u / 0.6), f1 * (f2 / f1) ** ((u - 0.6) / 0.4))
    s = lp(svf_sweep(rng.standard_normal(n), fc, max(q, 0.6) * 2.2), 6500, 2)
    amp *= 0.72
    e = np.sin(np.pi * np.clip(u, 0, 1)) ** 1.6
    s = s * e / (np.max(np.abs(s * e)) + 1e-9) * 0.5 * amp
    pan = pan0 + (pan1 - pan0) * u
    return np.vstack([s * np.cos((pan + 1) * np.pi / 4), s * np.sin((pan + 1) * np.pi / 4)]) * 1.41

def riser(dur=0.9, amp=1.0):
    n = int(dur * SR); t = tsec(n); u = t / dur
    fc = 400 * (9000 / 400) ** (u ** 1.3)
    s = svf_sweep(rng.standard_normal(n), fc, 1.4)
    tone = np.sin(2 * np.pi * np.cumsum(180 * (4 ** u)) / SR) * 0.25
    e = u ** 2.2
    s = (s / (np.max(np.abs(s)) + 1e-9) + tone) * e
    return fade(s, 0.01, 0.006) * 0.45 * amp

def impact(amp=1.0):
    n = int(2.2 * SR); t = tsec(n)
    f = 30 + 70 * np.exp(-t / 0.09)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.75)
    body = lp(rng.standard_normal(n), 1800) * np.exp(-t / 0.12) * 0.55
    crack = hp(rng.standard_normal(n), 3000) * np.exp(-t / 0.018) * 0.35
    return fade(boom + body + crack, 0, 0.1) * 0.9 * amp

def click(freq=2200, amp=1.0, body=180):
    n = int(0.05 * SR); t = tsec(n)
    s = bp(rng.standard_normal(n), freq * 0.7, freq * 1.4) * np.exp(-t / 0.003)
    s += np.sin(2 * np.pi * body * t) * np.exp(-t / 0.012) * 0.6
    return fade(s, 0, 0.005) * 0.6 * amp

def pop(f0=1400, f1=700, amp=1.0):
    n = int(0.09 * SR); t = tsec(n)
    f = f1 + (f0 - f1) * np.exp(-t / 0.012)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.03) * np.minimum(1, t / 0.0015)
    return fade(s, 0, 0.01) * 0.5 * amp

def tick(freq=3600, amp=1.0):
    n = int(0.02 * SR); t = tsec(n)
    s = np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.0035) + hp(rng.standard_normal(n), 5000) * np.exp(-t / 0.002) * 0.3
    return fade(s, 0, 0.003) * 0.35 * amp

def reverb_ir(rt=1.6, pre=0.012):
    n = int((rt + pre) * SR); t = tsec(n)
    irs = []
    for ch in range(2):
        noise = rng.standard_normal(n) * np.exp(-6.9 * t / rt)
        noise[: int(pre * SR)] = 0
        noise = lp(noise, 6500)
        irs.append(noise / np.sqrt(np.sum(noise ** 2)))
    return np.vstack(irs)

def add_reverb(bus, mix=0.2, rt=1.6):
    ir = reverb_ir(rt)
    wet = np.vstack([fftconvolve(bus[0], ir[0])[:N], fftconvolve(bus[1], ir[1])[:N]])
    return bus + wet * mix

# ------------------------------------------------------------ music bed
BPM = 100; BEAT = 60 / BPM; EIGHTH = BEAT / 2
c1, c2, c3, c4, c5, c6, c6b, c7, c8 = (Q[k] for k in ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c6b', 'c7', 'c8'])
Dmaj9 = [50, 54, 57, 61, 64]; Bm9 = [47, 50, 54, 57, 61]; G7s11 = [43, 47, 50, 54, 61]; A_sus = [45, 50, 52, 57, 59]
sections = [(0.0, c2, Dmaj9, 900, 0.55), (c2, c4, Bm9, 1100, 0.7), (c4, c5 - 0.05, G7s11, 1500, 0.8),
            (c5 - 0.05, c7 - 0.12, Dmaj9, 2600, 1.0), (c8 - 0.2, END, Dmaj9, 1300, 0.85)]
for (a, b, ch, cut, g) in sections:
    place(music, pad_chord([m for m in ch], b - a, cutoff=cut, attack=0.5 if a > 0 else 0.9, release=0.9), a, 0.42 * g)

# arpeggio: 8th notes from c2 to c7, brighter as we go
def chord_at(t):
    for (a, b, ch, _, _) in sections:
        if a <= t < b: return ch
    return Dmaj9
pattern = [0, 2, 4, 3, 1, 3, 4, 2]
t = c2; k = 0
while t < c7 - 0.2:
    ch = chord_at(t)
    m = ch[pattern[k % 8]] + 12
    prog = (t - c2) / max(c7 - c2, 1e-3)
    gain = 0.16 + 0.22 * prog
    if c5 - 0.25 < t < c5 + 0.15: gain *= 0.4
    place(music, pluck(m, 0.5, bright=0.6 + 0.9 * prog, decay=0.16 + 0.1 * prog), t, gain, pan=0.35 if k % 2 else -0.35)
    t += EIGHTH; k += 1

# kicks + sub in the violet section
t = c5 + 0.55; beat = 0
while t < c7 - 0.15:
    place(music, kick(0.55), t, 1.0)
    if beat % 2 == 0: place(music, sub(38, BEAT * 1.6, 0.35), t, 1.0)
    t += BEAT; beat += 1
# soft heartbeat kicks before the violet (devices section)
for tt in np.arange(c3, c5 - 0.3, BEAT * 2):
    place(music, kick(0.28, 90, 44, 0.25), tt, 1.0)
# final resolve: bell motif
for i, (m, dt) in enumerate([(74, 0.0), (78, 0.32), (81, 0.64), (86, 1.1)]):
    place(music, bell(m, 2.2, 0.9 - i * 0.12), c8 + 0.5 + dt, 0.5, pan=-0.3 + 0.2 * i)
place(music, sub(38, 2.6, 0.4), c8 + 0.45, 1.0)

music = add_reverb(music, 0.28, 2.2)

# ------------------------------------------------------------ sound effects
place(sfx, bell(93, 1.2, 0.8), c1 + 0.55, 0.35, 0.3)                    # spark
place(sfx, hp(rng.standard_normal(int(0.25 * SR)), 6000) * env_exp(int(0.25 * SR), 0.05) * 0.12, c1 + 0.55, 1.0, 0.3)
place(sfx, whoosh(0.45, 500, 3000, 900, 0.5, 0.2, -0.2, -0.7), c2 - 0.3, 1.0)  # H1 exit
place(sfx, whoosh(0.9, 180, 1600, 400, 0.9, 0.7, 0.6, 0.1), c2 - 0.05, 1.0)    # browser rises
place(sfx, whoosh(0.9, 220, 2000, 500, 0.8, 0.7, 0.8, 0.3), c2 + 0.15, 1.0)    # phone rises
for i in range(9):                                                               # label typing
    place(sfx, click(3200 + rng.uniform(-400, 400), 0.22, 300), c2 + 0.55 + i * 0.055 + rng.uniform(0, 0.015), 1.0, 0.4)
for i in range(8):                                                               # wireframe pops
    place(sfx, pop(1200 + 90 * i, 650 + 40 * i, 0.32), c3 + 0.05 + i * 0.07, 1.0, -0.1 + 0.08 * i)
place(sfx, whoosh(0.7, 300, 1400, 500, 0.35, 0.6, -0.4, 0.5), c3 + 0.35, 1.0)    # cursor glide
place(sfx, click(1900, 1.0, 160), c3 + 1.04, 1.0, 0.5)                          # mouse click
place(sfx, click(2400, 0.7, 220), c3 + 1.11, 1.0, 0.5)
place(sfx, pop(900, 480, 0.6), c3 + 1.06, 1.0, 0.5)                             # ripple
place(sfx, bell(88, 0.6, 0.6), c3 + 1.14, 0.3, 0.55)                            # selection snap
place(sfx, tick(4200, 1.0), c3 + 1.13, 1.0, 0.55)
place(sfx, whoosh(0.32, 400, 4200, 1200, 0.7, 1.2, 0.3, -0.3), c4 + 0.05, 1.0)  # flip 1
place(sfx, whoosh(0.32, 450, 4600, 1300, 0.6, 1.2, 0.7, 0.2), c4 + 0.21, 1.0)   # flip 2
tt = c4 + 0.62                                                                   # keyboard typing
while tt < c4 + 1.75:
    place(sfx, click(2600 + rng.uniform(-700, 700), rng.uniform(0.18, 0.32), rng.uniform(120, 260)), tt, 1.0, rng.uniform(-0.2, 0.6))
    tt += rng.uniform(0.035, 0.075)
place(sfx, riser(0.95, 0.75), c5 - 0.95, 1.0)                                   # into violet
place(sfx, whoosh(1.0, 120, 900, 200, 1.0, 0.5, -0.6, 0.6), c5 - 0.25, 1.0)    # flood
place(sfx, kick(0.7, 80, 38, 0.5), c5 + 0.55, 1.0)
for i in range(20):                                                              # counter 0 -> 20
    u = i / 19; tt = c5 + 0.35 + 0.75 * (1 - (1 - u) ** 2.2)
    place(sfx, tick(3000 + 40 * i, 0.55), tt, 1.0, 0.0)
place(sfx, whoosh(0.35, 1500, 6000, 3000, 0.25, 1.5, -0.6, -0.2), c5 + 0.6, 1.0)  # bracket zip
for k, m in enumerate([74, 78, 81, 86]):                                         # four segments
    a = c6 + 0.22 + k * 0.36
    place(sfx, pluck(m, 0.8, 1.4, 0.28), a + 0.02, 0.55, -0.4 + 0.27 * k)
    place(sfx, pop(1500, 900, 0.35), a, 1.0, -0.4 + 0.27 * k)
    for j in range(5): place(sfx, tick(3300 + 60 * j + 200 * k, 0.4), a + 0.08 + j * 0.05, 1.0)
place(sfx, whoosh(0.7, 300, 2200, 600, 0.55, 0.9, -0.7, 0.7), c6b - 0.05, 1.0)   # loop "revenir"
place(sfx, bell(86, 1.0, 0.6), c6b + 0.25, 0.35, 0.4)
place(sfx, riser(0.6, 0.8), c7 - 0.62, 1.0)                                      # into impact
place(sfx, impact(1.0), c7 + 0.0, 1.0)
place(sfx, whoosh(0.7, 200, 1200, 300, 0.6, 0.6, -0.3, 0.3), c7 + 0.05, 1.0)
rev_swell = whoosh(0.85, 2400, 500, 160, 0.8, 0.7, 0.6, -0.2)                   # collapse into the disc
place(sfx, rev_swell, c8 - 0.42, 1.0)
place(sfx, kick(0.5, 70, 36, 0.45), c8 + 0.48, 1.0)                              # disc lands
place(sfx, whoosh(0.9, 200, 1500, 400, 0.45, 0.7, 0.4, 0.4), c8 + 0.12, 1.0)    # photo rises
place(sfx, pop(1700, 1000, 0.55), Q['c8'] + 0.95, 1.0, -0.3)                    # chips
place(sfx, pop(1900, 1150, 0.5), Q['c8'] + 1.15, 1.0, -0.3)
place(sfx, whoosh(0.6, 2000, 600, 200, 0.4, 0.7, 0.2, -0.2), END - 0.85, 1.0)   # outro
place(sfx, pop(700, 300, 0.5), END - 0.15, 1.0)
sfx = add_reverb(sfx, 0.18, 1.3)

# ------------------------------------------------------------ voice-over
if not NO_VO:
    sr, x = wf.read(VO_PATH)
    x = x.astype(np.float64)
    if x.ndim > 1: x = x.mean(1)
    x /= 32768.0 if np.abs(x).max() > 2 else 1.0
    if sr != SR:
        from math import gcd
        g = gcd(sr, SR); x = resample_poly(x, SR // g, sr // g)
    x = hp(x, 85, 2)
    # gentle presence + compression
    pres = bp(x, 2500, 6000, 2) * 0.25
    x = x + pres
    envv = np.sqrt(lp(x ** 2, 12, 1).clip(1e-12))
    thr = db(-24); ratio = 2.5
    gain = np.where(envv > thr, (thr * (envv / thr) ** (1 / ratio)) / envv, 1.0)
    x = x * gain
    x = x / (np.max(np.abs(x)) + 1e-9) * 0.7
    place(vo, x, Q.get('vo_offset', 0.0), 1.0, 0.0)
    vo = add_reverb(vo, 0.035, 0.6)

# ------------------------------------------------------------ mix
vo_env = np.sqrt(lp((vo[0] ** 2 + vo[1] ** 2) / 2, 8, 1).clip(0))
duck = 1 - 0.55 * np.clip(vo_env / (np.max(vo_env) * 0.25 + 1e-9), 0, 1)
duck = lp(duck, 6, 1)
mix = music * duck * db(-3) + sfx * db(-1) + vo * db(0)

# glue compression + peak limiter
lvl = np.sqrt(lp(((mix[0] ** 2 + mix[1] ** 2) / 2), 10, 1).clip(1e-12))
thr = db(-16); gc = np.where(lvl > thr, (thr * (lvl / thr) ** (1 / 1.8)) / lvl, 1.0)
mix *= gc

try:
    import pyloudnorm as pyln
    meter = pyln.Meter(SR)
    loud = meter.integrated_loudness(mix.T)
    mix *= db(-14 - loud)
    print('loudness before', round(loud, 1), 'LUFS -> -14')
except Exception as e:
    print('loudness skipped', e)
    mix *= 0.5 / (np.sqrt(np.mean(mix ** 2)) * 4 + 1e-9)

peak_target = db(-1.2)
pk = np.max(np.abs(mix), axis=0)
from scipy.ndimage import maximum_filter1d
pk = maximum_filter1d(pk, int(0.004 * SR))
g = np.minimum(1, peak_target / (pk + 1e-12))
g = np.minimum.accumulate(g[::-1])[::-1] if False else lp(g, 60, 1)
g = np.minimum(g, peak_target / (pk + 1e-12))
mix *= g
mix = np.clip(mix, -0.99, 0.99)
# fades for the loop
fi, fo = int(0.03 * SR), int(0.25 * SR)
mix[:, :fi] *= np.linspace(0, 1, fi)
mix = mix[:, : int(END * SR)]
mix[:, -fo:] *= np.linspace(1, 0, fo)
wf.write(OUT, SR, (mix.T * 32767).astype(np.int16))
print('wrote', OUT, mix.shape[1] / SR, 's  peak', round(20 * np.log10(np.max(np.abs(mix))), 2), 'dBFS')
