"""Sound design for hero film v6, synced pass: every whoosh is placed by its PEAK on the instant the element moves fastest
(start of an ease-out entrance, end of an ease-in exit, middle of an ease-in-out move), with the timings read from film23.html.
Usage: python3 sfx19.py cues24.json out_sfx.wav
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
def bubble(f=1500): return pop(f, f * 0.55, 0.07, 0.12)
def sw(t_peak, attack, release, lo, hi, gain, p0=0.0, p1=0.0, body=0.25, air=0.15, q=1.0, shape=1.6):
    """a whoosh whose loudest, brightest instant lands exactly on t_peak (the fastest frame of the move)"""
    dur = attack + release
    place(whoosh(dur, lo, hi, attack / dur, q, p0, p1, body, air, shape), t_peak - attack, gain)
def ent(a, gain, lo=240, hi=2600, p0=0.0, p1=0.0, rel=0.45, body=0.3):   # ease-out / spring entrance starting at a
    sw(a + 0.04, 0.1, rel, lo, hi, gain, p0, p1, body)
def ext(a, d, gain, hi=1800, lo=300, p0=0.0, p1=0.0):                  # ease-in exit starting at a, lasting d
    sw(a + d, d + 0.05, 0.12, hi, lo, gain, p0, p1, 0.2, 0.12)
def mid(a, d, gain, lo=400, hi=3000, p0=0.0, p1=0.0, body=0.2):        # ease-in-out move
    sw(a + d / 2, d / 2 + 0.03, d / 2 + 0.1, lo, hi, gain, p0, p1, body)
def wrd(tin, gain=-33, p=-0.3):                                          # words rising out of their masks
    sw(tin + 0.06, 0.07, 0.16, 1500, 6000, gain, p - 0.1, p + 0.1, 0.0, 0.45, 1.5, 1.4)
def wout(tout, gain=-34, p=-0.3):                                        # words leaving (ease-in, 0.18 s)
    sw(tout + 0.17, 0.15, 0.07, 5000, 1600, gain, p, p, 0.0, 0.4, 1.5, 1.4)

# ------------------------------------------------------------------ S1 · the project, the year, the dice
sw(c['c1'] + 0.05, 0.25, 0.4, 300, 2000, -31, -0.2, 0.2, 0.2)                 # opening breath
wrd(c['c1'], -33); wrd(c['c1'] + 0.3, -34)                                     # « Créer ton application / mobile ou ton SaaS »
ent(c['c1'] + 0.35, -23, 220, 2600, -0.9, -0.3, 0.5)                           # the site slides in (ease-out 0.7 s)
ent(c['c1'] + 0.5, -24, 240, 2800, 0.9, 0.3, 0.5)                              # the application slides in
wout(c['c1y'] - 0.24, -33)                                                     # the headline leaves
wrd(c['c1y'] + 0.02, -31)                                                      # « En 2026, »
ext(c['x1m'], 0.3, -27, 1500, 260)                                             # site and application drop away (ease-in 0.3 s), before the dice
tD = c['c1b'] + 0.02
sw(tD + 0.26, 0.25, 0.08, 300, 2600, -27, -0.8, -0.3, 0.25, 0.2)               # the dice fly in…
SEG = [0.32, 0.58, 0.78, 0.92]
for d0, dur, x0, x1, fq in [(0.0, 0.95, -300, 772, 2300), (0.07, 0.98, -470, 1000, 2650)]:
    for g, amp, gain in zip(SEG, [1.0, 0.75, 0.5, 0.3], [-16, -20, -25, -30]):   # …and hit the table exactly on each bounce
        x = x0 + (x1 - x0) * (1 - (1 - g) ** 2.2)
        place(clack(amp, fq * rng.uniform(0.96, 1.04)), tD + d0 + dur * g, gain, max(-0.9, min(0.9, (x + 93 - 960) / 900)))
    place(clack(0.2, fq * 0.9), tD + d0 + dur * 0.995, -33, (x1 + 93 - 960) / 900)
# ------------------------------------------------------------------ S2 · the violet rises, « 8 sur 10 », the dots, the two winners
sw(c['c2'] + 0.09, 0.22, 0.32, 180, 2200, -23, -0.25, 0.25, 0.3, 0.15)        # the violet rises (fastest at mid-wipe)
place(impact(1.0, 0.5, 150, 72, 0.075, 0.22), c['c2'] + 0.1, -18)              # « 8 sur 10 » lands: one short, tight hit
DOTX = lambda i: 1186 + (i % 5) * 108
for di in range(10):                                                           # each dot pops: a dry tick, same pitch (no melody)
    place(tick(2900 * rng.uniform(0.97, 1.03), 0.035, 1.0), c['c2'] + 0.25 + di * 0.05 + 0.015, -34 + rng.uniform(-1.5, 1.5), (DOTX(di) + 26 - 960) / 900)
place(bell(88, 0.9, 1.0, 2.0, 0.5, 0.2), c['c2b'] + 0.03, -27, 0.45)           # the two that make it light up: one short, soft ding
place(sparkle(0.5, 0.7, 6000, 5), c['c2b'] + 0.2, -37, 0.5)                    # the glint crossing them
wrd(c['c2c'], -32, -0.4)                                                       # « applications peinent… »
ext(c['x2'], 0.24, -28, 1800, 300)                                             # S2 leaves (ease-in exits, dots shrink) right after « par mois. »
# ------------------------------------------------------------------ S3 · the phone, opened once, never again
ent(c['p3'], -24, 260, 2400, 0.5, 0.5, 0.4)                                    # the phone springs up
tapT = c['tap3']; openT = c['open3']; closeT = c['close3']; dimT = c['dim3']
wrd(c['c3b'], -33, -0.4)                                                       # « Ouvertes une fois. »
place(tap(1.0), tapT - 0.02, -19, 0.5)
mid(openT, 0.34, -26, 500, 3800, 0.5, 0.5)                                     # the app zooms open
mid(closeT, 0.34, -26, 3600, 500, 0.5, 0.5)                                    # swiped away
wrd(c['c3c'] + 0.1, -33, -0.4)                                                 # « Jamais rouvertes. »
sw_ = np.sin(2 * np.pi * np.cumsum(np.linspace(midi(64), midi(52), int(0.5 * SR))) / SR)
place(fade(sw_ * np.exp(-np.linspace(0, 4, len(sw_))), 0.005, 0.05) * 0.6, dimT, -25, 0.5)   # the icon goes dark
ext(c['x3'], 0.3, -30, 1500, 260, 0.5, 0.5)                                   # S3 leaves: the phone falls away (ease-in 0.3 s)
wout(c['x3'], -35, -0.4)                                                       # « Ouvertes une fois. / Jamais rouvertes. » leave
# ------------------------------------------------------------------ S4 · the light opens on Noé, the ideas, his idea takes off
sw(c['c4'] + 0.16, 0.12, 0.7, 240, 2800, -21, -0.6, 0.6, 0.45, 0.2)          # the paper iris (ease-out 0.7 s)
place(pop(820, 400, 0.14, 0.12), c['c4'] + 0.04, -24, -0.6)                     # his photo pops
place(chime(79, 1.6, 0.8), c['c4'] + 0.22, -31, -0.5)
wrd(c['c4'] + 0.55, -33, -0.5)                                                 # « voit passer une dizaine… »
NIDEAS = 10
t0 = c['c4'] + 0.35; nT = c['c4b'] - 0.2; dt = (nT - t0) / NIDEAS
for i in range(NIDEAS):                                                        # each idea is thrown in (ease-out 0.32 s): sound on the throw
    place(card_flick(0.8), t0 + (i + 1) * dt - 0.31, -29 - 2 * (i % 2), 0.4 + 0.05 * (i % 3))
wout(c['c4b'] - 0.36, -36, -0.5)                                              # « voit passer… » leaves before « Il sait… »
mid(c['c4b'] - 0.05, 0.8, -31, 1400, 300, 0.3, 0.8, 0.15)                     # the pile steps back (ease-in-out 0.8 s)
mid(c['c4b'] - 0.02, 0.55, -25, 400, 3000, 0.5, -0.3, 0.15)                    # « Ton idée » comes forward (ease-in-out 0.55 s)
c4d = c.get('c4d', c['c4b'] + 1.4)
place(bubble(1200), c4d - 0.03, -26, 0.4)                                      # the revenue card pops
place(riser(0.85, 400, 5000, 0.8), c4d + 0.15, -27)                            # the curve climbs (0.85 s)
place(chime(91), c4d + 0.88, -23, 0.5)                                         # the arrow lands: « décoller »
# ------------------------------------------------------------------ S5 · the method, back every day, paying every month
sw(c['c5'], 0.3, 0.45, 300, 2400, -24, 0.0, 0.0, 0.3)                         # S4 is gone (ease-in, fastest at the end) as the phone springs up
wrd(c['c5'] + 0.02, -32, -0.5)                                                 # « Sa méthode / Stratégie + écrans »
swT = max(c['c5b'] + 0.05, c['c5'] + 0.5); tIn = swT + 0.4; tOut = max(c['c5c'] + 0.12, tIn + 0.9)
sh = whoosh(0.8, 2200, 8500, 0.47, 2.0, -0.2, 0.2, 0.0, 0.6, 1.3)               # the design sweeps down the screen (peak mid-sweep)
sp = sparkle(0.8, 0.6, 6400, 7); sh[:, :len(sp)] += np.vstack([sp, sp])[:, :sh.shape[1]] * 0.5
place(sh, swT + 0.375 - 0.376, -28)
wout(c['c5c'] - 0.22, -34, -0.5)                                               # the method words leave
wrd(c['c5c'] + 0.12, -32, -0.5)                                                # « Ils reviennent chaque jour. »
place(bubble(1500), c['c5c'] + 0.14, -29, 0.5)                                 # the week
sw(swT + 0.87, 0.12, 0.15, 2600, 900, -32, 0.0, 0.0, 0.0, 0.4)                # the reminder drops in…
place(chime(96, 1.2, 0.8), swT + 0.88, -26)                                    # …ding
wout(c['c5d'] - 0.13, -34, -0.5)                                               # « chaque jour » leaves upwards…
wrd(c['c5d'] + 0.06, -32, -0.5)                                                # …« Ils paient chaque mois. » rises in its place
for i in range(3):                                                             # three renewals
    place(bubble(1500 + 180 * i), c['c5d'] + 0.28 + i * 0.22 + 0.02, -27, 0.5)
place(chime(91, 1.4, 0.8), c['c5d'] + 0.32, -28, 0.5)
# ------------------------------------------------------------------ S7 · the violet opens from the phone: « Noé t'offre un audit… »
sw(c['c7'] - 0.04, 0.36, 0.6, 160, 1800, -19, 0.0, 0.0, 0.5, 0.1)             # everything leaves, the violet bursts out (ease-out)
place(impact(0.8, 1.5, 110, 36, 0.42, 0.22), c['c7'] - 0.05, -16)               # camera shake
wrd(c['c7'] + 0.12, -31, 0.0)                                                  # « Audit offert »
place(chime(84, 2.2, 0.9), c['c7'] + 0.4, -24); place(chime(91, 2.2, 0.6), c['c7'] + 0.47, -27)
c7c = c.get('c7c', c['c7'] + 0.9)
wrd(c7c - 0.02, -32, 0.0)                                                      # « personnalisé, au premier appel. »
sw(c['c7'] + 1.45, 0.45, 0.45, 3000, 7000, -34, -0.7, 0.7, 0.0, 0.5)          # the glint crosses (ease-in-out 0.9 s)
wrd(c7c + 1.25, -35, 0.0)                                                      # « Sans engagement. »
sw(c['end'] - 0.05, 0.3, 0.15, 1600, 300, -32)                                 # back to the start

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
