"""Sound design for hero film v6, motion pass: every entrance and exit has its sound (whoosh in, whoosh out, pop, swish for the text),
impacts on the two hits, the dice, and only five chimes for the peaks. No melodic runs.
Usage: python3 sfx17.py cues.json out_sfx.wav
Writes a stereo 48 kHz sound-effects stem (no music, no voice). Levels are kept modest so the
stem can sit under a voice-over and a music bed.
"""
import sys
import numpy as np
from scipy.signal import fftconvolve, butter, sosfilt
import scipy.io.wavfile as wf

SR = 48000
import json
Q = json.load(open(sys.argv[1]))
END = Q["end"]
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



# ------------------------------------------------------------------ palette
c = Q
def card_flick(amp=1.0):
    n = int(0.07 * SR); t = tsec(n)
    s = bp(rng.standard_normal(n), 1800, 6000) * np.exp(-t / 0.012) + np.sin(2 * np.pi * 180 * t) * np.exp(-t / 0.02) * 0.4
    return fade(s, 0, 0.01) * amp
def chime(m, dur=1.8, amp=1.0):
    a, b = bell(m, dur, amp, 2.0, 0.7, 0.55), bell(m + 12, dur * 0.6, amp * 0.22, 2.0, 0.5, 0.3)
    a[:len(b)] += b[:len(a)]
    return a
def clack(amp=1.0, f=2300):
    n = int(0.1 * SR); t = tsec(n)
    s = bp(rng.standard_normal(n), 1200, 6500) * np.exp(-t / 0.005) + np.sin(2 * np.pi * f * t) * np.exp(-t / 0.02) * 0.35 \
        + np.sin(2 * np.pi * f * 1.57 * t) * np.exp(-t / 0.011) * 0.22 + lp(rng.standard_normal(n), 400) * np.exp(-t / 0.012) * 0.6
    return fade(s, 0.0003, 0.01) * amp
def w_in(dur, lo=240, hi=2600, p0=0.0, p1=0.0, body=0.3):        # something arrives: the air builds up to the landing
    return whoosh(dur, lo, hi, 0.68, 1.0, p0, p1, body, 0.15, 1.8)
def w_out(dur, hi=1800, lo=300, p0=0.0, p1=0.0, body=0.2):       # something leaves: quick push, long tail
    return whoosh(dur, hi, lo, 0.22, 1.0, p0, p1, body, 0.12, 1.2)
def swish(dur=0.22, p=0.0):                                      # words sliding up out of their mask: light air
    return whoosh(dur, 1500, 6000, 0.45, 1.5, p - 0.1, p + 0.1, 0.0, 0.45, 1.4)
def bubble(f=1500):                                              # a small round element pops in
    return pop(f, f * 0.55, 0.07, 0.12)
def shimmer(dur=0.8):                                            # the screen gets designed: a soft bright sweep
    w = whoosh(dur, 2200, 8500, 0.35, 2.0, -0.2, 0.2, 0.0, 0.6, 1.3)
    s = sparkle(dur, 0.6, 6400, 7); s = np.vstack([s, s]) * 0.5
    return w + s[:, :w.shape[1]] if s.shape[1] >= w.shape[1] else w

# ------------------------------------------------------------------ events
# S1 · the project slides in, the headline changes, the dice are thrown
place(w_in(0.6, 300, 2000, -0.2, 0.2, 0.2), c['c1'] - 0.12, -30)                                  # opening breath
place(swish(0.24, -0.1), c['c1'] - 0.01, -32)                                                     # « Créer ton application »
place(w_in(0.62, 220, 2600, -0.85, -0.25), c['c1'] + 0.3, -23)                                    # the site slides in from the left
place(w_in(0.62, 240, 2800, 0.85, 0.3), c['c1'] + 0.45, -24)                                      # the application from the right
place(thump(0.5), c['c1'] + 0.64, -29, -0.3); place(thump(0.5), c['c1'] + 0.8, -30, 0.4)          # they land
place(w_out(0.28, 2400, 700), c['c1y'] - 0.24, -32)                                               # the headline leaves
place(swish(0.24, -0.2), c['c1y'] + 0.01, -31)                                                    # « En 2026, »
place(w_out(0.42, 1500, 260, 0.0, 0.0, 0.25), c['c1b'] - 0.16, -27)                               # site and application drop away
tD = c['c1b'] + 0.02
place(whoosh(0.4, 300, 2600, 0.6, 1.0, -0.8, -0.2, 0.25, 0.2), tD - 0.1, -26)                    # the dice are thrown
SEG = [0.32, 0.58, 0.78, 0.92]
for d0, dur, x0, x1, fq in [(0.0, 0.95, -300, 772, 2300), (0.07, 0.98, -470, 1000, 2650)]:
    for g, amp, gain in zip(SEG, [1.0, 0.75, 0.5, 0.3], [-16, -20, -25, -30]):
        x = x0 + (x1 - x0) * (1 - (1 - g) ** 2.2)
        place(clack(amp, fq * rng.uniform(0.96, 1.04)), tD + d0 + dur * g, gain, max(-0.9, min(0.9, (x + 93 - 960) / 900)))
    place(clack(0.2, fq * 0.9), tD + d0 + dur * 0.995, -33, (x1 + 93 - 960) / 900)
# S2 · the violet rises, « 8 sur 10 » hits, the dots pop in, two of them light up
place(suck(0.42, 160, 1800), c['c2'] + 0.1 - 0.4, -20)
place(impact(0.85, 1.3, 100, 38, 0.38, 0.22), c['c2'] + 0.1, -14)                                # the hit (the camera shakes)
for di in range(10):
    place(bubble(1300 + 70 * di), c['c2'] + 0.25 + di * 0.05 + 0.02, -31, 0.25 + 0.07 * (di % 5))
place(chime(84), c['c2b'] + 0.04, -24, 0.35)                                                      # the two that make it
place(swish(0.26, -0.4), c['c2c'] - 0.01, -32)                                                    # « applications peinent… »
place(w_out(0.4, 1800, 300, 0.2, -0.2), c['c3'] - 0.14, -26)                                      # S2 leaves
# S3 · the phone rises, the app is opened once, closed, it goes dark
place(w_in(0.5, 260, 2400, 0.5, 0.5, 0.3), c['c3'] - 0.32, -24)
place(thump(0.5), c['c3'] + 0.08, -29, 0.5)
place(swish(0.22, -0.4), c['c3'] + 0.01, -33)                                                     # « Pourquoi ? »
tapT = max(c['c3b'] + 0.05, c['c3'] + 0.3); openT = tapT + 0.1; closeT = max(c['c3c'] - 0.05, openT + 0.6); dimT = c['c3c'] + 0.45
place(swish(0.22, -0.4), c['c3b'] - 0.01, -33)                                                    # « Ouvertes une fois. »
place(tap(1.0), tapT, -19, 0.5)
place(whoosh(0.3, 500, 3800, 0.6, 1.3, 0.5, 0.5, 0.2, 0.3), openT - 0.03, -26)                   # the app zooms open
place(whoosh(0.32, 3600, 500, 0.3, 1.3, 0.5, 0.5, 0.2, 0.3), closeT - 0.03, -26)                  # swiped away
place(swish(0.22, -0.4), c['c3c'] + 0.09, -33)                                                    # « Jamais rouvertes. »
sw = np.sin(2 * np.pi * np.cumsum(np.linspace(midi(64), midi(52), int(0.5 * SR))) / SR)
place(fade(sw * np.exp(-np.linspace(0, 4, len(sw))), 0.005, 0.05) * 0.6, dimT, -25, 0.5)        # the icon goes dark
place(bubble(900), dimT + 0.15, -29, 0.4)                                                         # « dernière ouverture »
# S4 · the light opens on Noé, ideas come and go, his idea takes off
place(w_out(0.5, 1600, 260, 0.5, 0.5), c['c4'] + 0.12, -28)                                       # S3 falls away
place(hp(whoosh(0.8, 240, 2800, 0.25, 0.9, -0.6, 0.6, 0.45, 0.2), 180), c['c4'] + 0.06, -21)      # the light opens
place(pop(820, 400, 0.14, 0.12), c['c4'] + 0.03, -24, -0.6)                                       # his photo
place(chime(79, 1.6, 0.8), c['c4'] + 0.22, -30, -0.5)
place(swish(0.24, -0.5), c['c4'] + 0.54, -33)                                                     # « voit passer une dizaine… »
NIDEAS = 10
t0 = c['c4'] + 0.35; nT = c['c4b'] - 0.2; dt = (nT - t0) / NIDEAS
for i in range(NIDEAS):                                                                           # each idea lands on the pile
    place(card_flick(0.8), t0 + (i + 1) * dt - 0.03, -29 - 2 * (i % 2), 0.4 + 0.05 * (i % 3))
place(w_out(0.6, 1400, 300, 0.3, 0.8, 0.15), c['c4b'] - 0.05, -29)                               # the pile steps back
place(w_in(0.5, 400, 3000, 0.5, -0.3, 0.15), c['c4b'] - 0.12, -25)                                # « Ton idée » comes forward
c4d = c.get('c4d', c['c4b'] + 1.4)
place(bubble(1200), c4d - 0.04, -26, 0.4)                                                         # the revenue card pops in
place(riser(0.95, 400, 5000, 0.8), c4d + 0.1, -27)                                                # the curve climbs
place(chime(91), c4d + 1.0, -23, 0.5)                                                             # « décoller »
place(w_out(0.45, 1800, 300, -0.2, 0.2), c['c5'] - 0.28, -26)                                     # S4 falls away
# S5 · the phone, the method, the daily return, the monthly payment
place(w_in(0.5, 260, 2400, 0.2, 0.0, 0.3), c['c5'] - 0.3, -24)
place(thump(0.5), c['c5'] + 0.3, -29)
place(swish(0.26, -0.5), c['c5'] + 0.01, -32)                                                     # « Sa méthode / Stratégie + écrans »
swT = max(c['c5b'] + 0.05, c['c5'] + 0.5); tIn = swT + 0.4; tOut = max(c['c5c'] + 0.12, tIn + 0.9)
place(shimmer(0.8), swT, -28)                                                                     # the screens get designed
place(bubble(1250), tIn, -27, 0.4)                                                                # « Conçue par Noé »
place(w_out(0.28, 2400, 700, -0.5, -0.5), c['c5c'] - 0.16, -32)                                   # the method words leave
place(swish(0.26, -0.5), c['c5c'] + 0.04, -32)                                                    # « Ils reviennent chaque jour. »
place(bubble(1500), c['c5c'] + 0.06, -29, 0.5)                                                    # the week
place(whoosh(0.25, 2600, 900, 0.5, 1.2, 0.0, 0.0, 0.0, 0.4), swT + 0.8, -32)                      # the reminder drops in…
place(chime(96, 1.2, 0.8), swT + 0.88, -26)                                                       # …ding
place(w_out(0.26, 2400, 700, 0.4, 0.6), tOut, -33)                                                # the tag leaves
place(w_out(0.26, 2400, 700, 0.5, 0.5), c['c5d'] + 0.01, -31)                                     # the week leaves
place(swish(0.26, -0.5), c['c5d'] + 0.04, -32)                                                    # « Ils paient chaque mois. »
for i in range(3):                                                                                # three renewals
    place(bubble(1500 + 180 * i), c['c5d'] + 0.25 + i * 0.22, -27, 0.5)
place(chime(91, 1.4, 0.8), c['c5d'] + 0.27, -28, 0.5)
place(w_out(0.4, 1500, 300, 0.2, 0.2), c['c7'] - 0.3, -26)                                        # S5 leaves
# S7 · the violet opens from the phone, the free audit
place(whoosh(0.7, 160, 1800, 0.18, 0.8, 0.0, 0.0, 0.5, 0.1), c['c7'] - 0.12, -19)
place(impact(0.8, 1.5, 110, 36, 0.42, 0.22), c['c7'] - 0.05, -16)                                 # the hit (the camera shakes)
place(swish(0.28, 0.0), c['c7'] + 0.07, -31)                                                      # « L'audit de ton idée »
place(swish(0.24, 0.0), c['c7'] + 0.41, -32)                                                      # « est offert. »
place(chime(84, 2.2, 0.9), c['c7'] + 0.45, -24); place(chime(91, 2.2, 0.6), c['c7'] + 0.52, -27)
place(swish(0.22, 0.0), c['c7'] + 0.74, -35)                                                      # « On en parle… »
place(whoosh(0.9, 3000, 7000, 0.5, 1.6, -0.7, 0.7, 0.0, 0.5), c['c7'] + 1.0, -33)                 # the glint crosses
place(w_out(0.5, 1600, 300), c['end'] - 0.42, -32)                                                # back to the start

# ------------------------------------------------------------------ space + level
def room(x, rt=0.9, mix=0.14, pre=0.01):
    n = int((rt + pre) * SR); t = tsec(n); out = np.zeros_like(x)
    for c in range(2):
        ir = rng.standard_normal(n) * np.exp(-6.9 * t / rt); ir[: int(pre * SR)] = 0
        ir = lp(ir, 6000); ir /= np.sqrt(np.sum(ir ** 2))
        out[c] = fftconvolve(x[c], ir)[: x.shape[1]]
    return x + out * mix

mix = room(bus, 0.9, 0.12)
mix = lp(hp(mix, 40), 9000, 1)
mix = mix[:, : int(END * SR)]
pk = np.max(np.abs(mix))
if pk > db(-3): mix *= db(-3) / pk
print('sfx peak dBFS', round(20 * np.log10(np.max(np.abs(mix)) + 1e-12), 1))
wf.write(sys.argv[2], SR, (np.clip(mix, -1, 1).T * 32767).astype(np.int16))
