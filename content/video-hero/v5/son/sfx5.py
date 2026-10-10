"""Sound design for hero film v5: every sound is placed on an animation event of film5.html.
Usage: python3 sfx5.py out_sfx.wav
Writes a stereo 48 kHz sound-effects stem (no music, no voice). Levels are kept modest so the
stem can sit under a voice-over and a music bed.
"""
import sys
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt
import scipy.io.wavfile as wf

SR = 48000
END = 16.0
N = int(END * SR) + SR
rng = np.random.default_rng(11)
bus = np.zeros((2, N))


def tsec(n): return np.arange(n) / SR
def db(x): return 10 ** (x / 20)
def lp(x, f, o=2): return sosfilt(butter(o, min(f, SR / 2 - 200), 'low', fs=SR, output='sos'), x)
def hp(x, f, o=2): return sosfilt(butter(o, f, 'high', fs=SR, output='sos'), x)
def bp(x, f0, f1, o=2): return sosfilt(butter(o, [f0, min(f1, SR / 2 - 200)], 'band', fs=SR, output='sos'), x)
def midi(m): return 440.0 * 2 ** ((m - 69) / 12)


def fade(s, a=0.002, r=0.01):
    n = s.shape[-1]; e = np.ones(n)
    na, nr = int(a * SR), int(r * SR)
    if na: e[:na] = np.linspace(0, 1, na)
    if nr: e[-nr:] *= np.linspace(1, 0, nr)
    return s * e


def stereo(s, pan=0.0, width=0.0):
    """mono -> stereo with equal-power pan; width adds a short decorrelated copy."""
    l, r = np.cos((pan + 1) * np.pi / 4), np.sin((pan + 1) * np.pi / 4)
    if width > 0:
        d = int(0.0007 * SR)
        s2 = np.concatenate([np.zeros(d), s[:-d]])
        return np.vstack([(s * (1 - width) + s2 * width) * l, s * r]) * 1.414
    return np.vstack([s * l, s * r]) * 1.414


def place(sig, t, gain_db=0.0, pan=0.0, width=0.0):
    if sig.ndim == 1: sig = stereo(sig, pan, width)
    i = int(round(t * SR))
    if i < 0: sig = sig[:, -i:]; i = 0
    n = min(sig.shape[1], N - i)
    if n > 0: bus[:, i:i + n] += sig[:, :n] * db(gain_db)


def svf(x, fc, q=1.0, mode='bp'):
    out = np.empty_like(x); low = band = 0.0; damp = 1.0 / q
    for i in range(len(x)):
        f = 2 * np.sin(np.pi * min(fc[i], 14000) / SR)
        low += f * band; high = x[i] - low - damp * band; band += f * high
        out[i] = band if mode == 'bp' else (low if mode == 'lp' else high)
    return out


def norm(s, peak=1.0): return s / (np.max(np.abs(s)) + 1e-12) * peak


# ------------------------------------------------------------------ sound builders
def whoosh(dur, f_lo, f_hi, peak_at=0.55, q=1.1, pan0=0.0, pan1=0.0, body=0.25, air=0.35, shape=1.6):
    """air movement: decorrelated band-passed noise whose centre climbs to f_hi at peak_at, then falls."""
    n = int(dur * SR); u = np.linspace(0, 1, n)
    fc = np.where(u < peak_at, f_lo * (f_hi / f_lo) ** (u / peak_at), f_hi * (f_lo / f_hi) ** ((u - peak_at) / (1 - peak_at)) ** 0.8)
    env = np.where(u < peak_at, (u / peak_at) ** shape, (1 - (u - peak_at) / (1 - peak_at)) ** 1.3)
    chans = []
    for c in range(2):
        nz = rng.standard_normal(n)
        s = svf(nz, fc * (1.0 + 0.04 * c), q)
        s += air * hp(rng.standard_normal(n), 5000) * 0.25
        chans.append(lp(s, 9000))
    tone = np.sin(2 * np.pi * np.cumsum(fc * 0.25) / SR) * body * 0.4
    out = np.vstack([chans[0] + tone, chans[1] + tone]) * env
    pan = pan0 + (pan1 - pan0) * u
    out[0] *= np.cos((pan + 1) * np.pi / 4) * 1.414; out[1] *= np.sin((pan + 1) * np.pi / 4) * 1.414
    return fade(norm(out, 0.9), 0.004, 0.02)


def suck(dur, f_lo=200, f_hi=2600):
    """reversed swell that ends abruptly: used before cuts and for the contraction."""
    w = whoosh(dur, f_lo, f_hi, peak_at=0.92, q=1.3, shape=2.6)
    return w


def pop(f0=1100, f1=520, dur=0.11, bright=0.25):
    n = int(dur * SR); t = tsec(n)
    f = f1 + (f0 - f1) * np.exp(-t / 0.014)
    s = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / 0.035)
    s += bright * hp(rng.standard_normal(n), 3000) * np.exp(-t / 0.003)
    return fade(s * np.minimum(1, t / 0.001), 0, 0.01)


def tick(freq=4200, dur=0.03, amp=1.0):
    n = int(dur * SR); t = tsec(n)
    s = np.sin(2 * np.pi * freq * t) * np.exp(-t / 0.004)
    s += 0.35 * bp(rng.standard_normal(n), freq * 0.8, freq * 1.6) * np.exp(-t / 0.0025)
    return fade(s, 0, 0.004) * amp


def tap(amp=1.0):
    """finger on glass: soft low body + crisp top."""
    n = int(0.09 * SR); t = tsec(n)
    s = np.sin(2 * np.pi * 210 * t) * np.exp(-t / 0.018) * 0.8
    s += bp(rng.standard_normal(n), 1800, 6500) * np.exp(-t / 0.004) * 0.9
    s += np.sin(2 * np.pi * 1350 * t) * np.exp(-t / 0.01) * 0.25
    return fade(s, 0, 0.01) * amp


def bell(m, dur=1.4, amp=1.0, ratio=3.5, idx=1.4, decay=0.55):
    n = int(dur * SR); t = tsec(n); f = midi(m)
    s = np.sin(2 * np.pi * f * t + idx * np.exp(-t / 0.25) * np.sin(2 * np.pi * f * ratio * t))
    s += 0.25 * np.sin(2 * np.pi * f * 2.01 * t) * np.exp(-t / (decay * 0.6))
    return fade(s * np.exp(-t / decay) * np.minimum(1, t / 0.002), 0, 0.05) * amp


def pluck(m, dur=0.7, amp=1.0, decay=0.22):
    n = int(dur * SR); t = tsec(n); f = midi(m)
    s = np.sin(2 * np.pi * f * t + 1.8 * np.exp(-t / 0.05) * np.sin(2 * np.pi * 2 * f * t))
    s += 0.3 * np.sin(2 * np.pi * f * 0.5 * t) * np.exp(-t / (decay * 1.5))
    return fade(s * np.exp(-t / decay) * np.minimum(1, t / 0.0015), 0, 0.03) * amp


def marimba(m, amp=1.0):
    n = int(0.6 * SR); t = tsec(n); f = midi(m)
    s = np.sin(2 * np.pi * f * t) * np.exp(-t / 0.16) + 0.35 * np.sin(2 * np.pi * f * 3.9 * t) * np.exp(-t / 0.03)
    s += 0.2 * lp(rng.standard_normal(n), 2500) * np.exp(-t / 0.006)
    return fade(s * np.minimum(1, t / 0.001), 0, 0.03) * amp


def impact(amp=1.0, dur=1.6, f_top=95, f_floor=36, tail=0.42, crack=0.3):
    n = int(dur * SR); t = tsec(n)
    f = f_floor + (f_top - f_floor) * np.exp(-t / 0.08)
    boom = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / tail)
    body = lp(rng.standard_normal(n), 900) * np.exp(-t / 0.09) * 0.5
    top = hp(rng.standard_normal(n), 3500) * np.exp(-t / 0.012) * crack
    return fade((boom + body + top) * np.minimum(1, t / 0.0015), 0, 0.15) * amp


def thump(amp=1.0): return impact(amp, 0.5, 120, 60, 0.09, 0.12)


def riser(dur, f0=300, f1=7000, amp=1.0):
    n = int(dur * SR); u = np.linspace(0, 1, n)
    fc = f0 * (f1 / f0) ** (u ** 1.4)
    s = svf(rng.standard_normal(n), fc, 1.6)
    tone = np.sin(2 * np.pi * np.cumsum(midi(57) * 2 ** (2 * u)) / SR) * 0.18
    return fade(norm(s, 1) * u ** 2.4 + tone * u ** 2, 0.02, 0.003) * amp


def sparkle(dur=0.6, amp=1.0, base=5200, count=9):
    n = int(dur * SR); out = np.zeros(n)
    for k in range(count):
        st = int(rng.uniform(0, 0.55) * n); f = base * rng.uniform(0.8, 1.7)
        m = n - st; tt = tsec(m)
        out[st:] += np.sin(2 * np.pi * f * tt) * np.exp(-tt / rng.uniform(0.03, 0.08)) * rng.uniform(0.4, 1.0)
    return fade(out / count * 3, 0.002, 0.05) * amp


def drone(dur, amp=1.0):
    """low dark pad for the navy statistic scene."""
    n = int(dur * SR); t = tsec(n)
    s = np.zeros(n)
    for m, a in [(38, 1.0), (45, 0.55), (50, 0.35), (53, 0.22)]:
        for d in (-0.06, 0.06):
            s += a * np.sin(2 * np.pi * midi(m) * (1 + d / 100) * t + rng.uniform(0, 6))
    s = lp(s, 700)
    e = np.minimum(1, t / 0.35) * np.minimum(1, (dur - t) / 0.45)
    return s * e / 6 * amp


# ------------------------------------------------------------------ events (times from film5.html)
# S1 · Moi, c'est Noé
place(pop(780, 380, 0.14, 0.15), 0.03, -14)
place(whoosh(0.34, 900, 4200, 0.6, 1.4, -0.2, 0.2, 0.1, 0.5), 0.02, -24)
place(sparkle(0.7, 1.0, 6000, 7), 0.42, -27, 0.2)
place(whoosh(0.5, 220, 2400, 0.5, 1.0, 0.0, 0.0, 0.35), 1.18, -15)            # pan up
# S2 · applications
place(whoosh(0.42, 300, 2600, 0.45, 1.0, 0.25, 0.35), 1.46, -19)               # phone 1 rises
place(thump(0.6), 1.69, -21, 0.3)
place(whoosh(0.4, 340, 2900, 0.45, 1.0, 0.6, 0.7), 1.6, -23)                   # phone 2 rises
for k, d in enumerate([0.02, 0.07, 0.1, 0.14, 0.17, 0.2, 0.24, 0.27, 0.32]):  # paywall boots
    place(tick(3600 + 160 * k, 0.03, 0.8), 1.72 + d + 0.02, -27, 0.35)
for k, d in enumerate([0.02, 0.07, 0.12, 0.15, 0.18, 0.22]):
    place(tick(4400 + 120 * k, 0.03, 0.6), 1.84 + d + 0.02, -31, 0.7)
place(whoosh(0.32, 700, 3800, 0.4, 1.4, 0.0, 0.0, 0.1), 2.36, -26)            # slot flip
place(whoosh(0.6, 180, 2100, 0.3, 0.9, -0.8, -0.1, 0.35), 2.36, -14)           # browser whips in
for k in range(14):                                                             # website boots
    place(tick(3300 + 90 * k, 0.03, 0.7), 2.58 + 0.023 * k, -30, -0.3)
place(whoosh(0.3, 800, 4200, 0.45, 1.4, 0.0, 0.0, 0.1), 3.0, -25)             # slot flip
place(whoosh(0.45, 400, 3000, 0.4, 1.2, -0.4, -0.2, 0.2), 3.02, -21)           # page swap
place(tick(5200, 0.03, 0.8), 3.16, -27, -0.2)                                  # url
for k, d in enumerate([0.14, 0.18, 0.22, 0.26]):                               # cards pop
    place(pop(1500 + 140 * k, 900 + 60 * k, 0.08, 0.2), 3.12 + d + 0.03, -22, -0.3)
tt = 3.3                                                                        # counters roll
while tt < 3.95:
    place(tick(4800 + rng.uniform(-300, 300), 0.02, 0.6), tt, -33, -0.3)
    tt += 0.018 + 0.09 * ((tt - 3.3) / 0.65) ** 2
place(pop(1900, 1100, 0.08, 0.2), 3.93, -24, -0.1)                             # chart dot
# S3 · revenus
place(pop(2400, 1600, 0.06, 0.1), 4.02, -28, 0.3)                              # finger appears
place(tap(1.0), 4.17, -13, 0.3)                                                 # TAP
place(pop(620, 300, 0.16, 0.05), 4.19, -19, 0.3)                               # ripple
place(whoosh(0.32, 500, 3600, 0.75, 1.6, -0.1, 0.1, 0.4, 0.2), 4.15, -24)      # chart jumps
place(whoosh(0.5, 300, 2600, 0.35, 1.0, 0.3, 0.1, 0.3), 4.3, -19)              # chip 1 flies out
place(pop(1300, 650, 0.12, 0.2), 4.34, -16, 0.1)
place(whoosh(0.5, 320, 2800, 0.35, 1.0, 0.7, 0.4, 0.3), 4.52, -21)             # chip 2 flies out
place(pop(1500, 760, 0.12, 0.2), 4.56, -17, 0.4)
for a, pan in [(4.39, 0.1), (4.61, 0.4)]:                                       # counters
    tt = a
    while tt < a + 0.72:
        u = (tt - a) / 0.75
        place(tick(4300 + rng.uniform(-250, 250), 0.02, 0.55), tt, -32, pan)
        tt += 0.022 + 0.13 * u ** 2
place(bell(88, 1.3, 1.0), 5.13, -19, 0.1)                                       # 13 000 €
place(bell(93, 1.3, 1.0), 5.35, -22, 0.4)                                       # 900 000
place(sparkle(0.5, 1.0), 5.28, -30, 0.1); place(sparkle(0.5, 1.0), 5.5, -31, 0.4)
place(suck(0.34, 260, 3600), 5.66, -13)                                         # zoom into the cut
# S4 · 8 sur 10
place(impact(1.0), 6.0, -9)
place(drone(2.6, 1.0), 6.0, -26)
for i in range(10):
    place(pop(1250 + 70 * i, 700 + 40 * i, 0.07, 0.15), 6.4 + 0.03 * i + 0.04, -27, -0.6 + 0.13 * i)
for di, i in enumerate([5, 0, 8, 3, 9, 1, 6, 4]):                               # 8 fall
    place(marimba([64, 62, 60, 59, 57, 55, 53, 52][di], 1.0), 7.0 + di * 0.07, -18, -0.6 + 0.13 * i)
place(bell(84, 1.6, 1.0), 7.66, -18, -0.35)                                     # 2 rise
place(bell(91, 1.6, 0.9), 7.7, -20, 0.35)
place(sparkle(0.7, 1.0, 5600, 10), 7.8, -27)
place(whoosh(0.5, 220, 2300, 0.5, 1.0, 0.0, 0.0, 0.35), 8.26, -15)            # pan up
# S5 · 20 %
place(whoosh(0.45, 260, 1900, 0.35, 1.0, 0.4, 0.3, 0.3), 8.58, -20, 0.3)       # donut spins in
sw = np.sin(2 * np.pi * np.cumsum(np.linspace(midi(55), midi(67), int(0.5 * SR))) / SR)
place(fade(sw * np.sin(np.linspace(0, np.pi, len(sw))) ** 2, 0.01, 0.05) * 0.5, 8.84, -26, 0.35)
place(pop(1200, 700, 0.1, 0.2), 9.13, -22, 0.5)                                 # "code" label
place(pluck(67, 0.6, 1.0, 0.18), 9.31, -21, 0.35)                               # 20 %
# S6 · rapporter: four steps, one rising note each
for k, (s0, m) in enumerate(zip([10.25, 10.5, 10.75, 11.0], [72, 76, 79, 84])):
    place(pluck(m, 0.8, 1.0, 0.25), s0 + 0.01, -16, 0.2 + 0.1 * k)
    place(pop(1500 + 120 * k, 850, 0.08, 0.2), s0 + 0.04, -24, 0.45)
place(bell(96, 1.6, 0.8), 11.03, -23, 0.35)
place(sparkle(0.8, 1.0, 6200, 12), 11.04, -26, 0.35)
place(riser(0.42, 400, 6000, 1.0), 11.58, -19)                                 # anticipation
# S7 · les 100 %
place(impact(1.0, 1.8, 110, 34, 0.48, 0.35), 11.98, -9)
place(whoosh(0.8, 160, 1500, 0.15, 0.8, 0.0, 0.0, 0.5, 0.2), 11.97, -13)
place(thump(1.0), 12.22, -14)
place(impact(0.9, 1.2, 140, 45, 0.25, 0.25), 12.36, -12)
place(sparkle(0.6, 1.0, 5800, 10), 12.42, -27)
place(whoosh(0.4, 400, 2600, 0.6, 1.2, 0.0, 0.0, 0.2), 13.1, -22)              # text leaves
# S8 · Noé Calmes
place(suck(0.52, 200, 2400), 13.36, -16, -0.3)                                 # violet contracts
place(thump(0.8), 13.88, -18, -0.4)
place(pop(900, 420, 0.14, 0.15), 13.64, -19, -0.4)                             # photo
place(whoosh(0.3, 900, 4200, 0.6, 1.4, 0.1, 0.3, 0.1), 13.8, -27)             # name
place(pop(1500, 800, 0.1, 0.2), 14.21, -20, 0.2)                                # pills
place(pop(1700, 900, 0.1, 0.2), 14.35, -21, 0.25)
place(sparkle(0.5, 1.0), 14.87, -29, 0.2); place(sparkle(0.5, 1.0), 14.97, -30, 0.25)
place(whoosh(0.5, 2600, 500, 0.2, 1.0, 0.1, -0.2, 0.2), 15.3, -24)            # everything leaves
place(pop(560, 260, 0.16, 0.05), 15.74, -22, -0.4)

# ------------------------------------------------------------------ space + level
def room(x, rt=0.9, mix=0.14, pre=0.01):
    n = int((rt + pre) * SR); t = tsec(n); out = np.zeros_like(x)
    for c in range(2):
        ir = rng.standard_normal(n) * np.exp(-6.9 * t / rt); ir[: int(pre * SR)] = 0
        ir = lp(ir, 6000); ir /= np.sqrt(np.sum(ir ** 2))
        out[c] = fftconvolve(x[c], ir)[: x.shape[1]]
    return x + out * mix

mix = room(bus)
mix = hp(mix, 28)
mix = mix[:, : int(END * SR)]
pk = np.max(np.abs(mix))
if pk > db(-3): mix *= db(-3) / pk
print('sfx peak dBFS', round(20 * np.log10(np.max(np.abs(mix)) + 1e-12), 1))
wf.write(sys.argv[1], SR, (np.clip(mix, -1, 1).T * 32767).astype(np.int16))
