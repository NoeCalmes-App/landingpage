"""Check the generated voice-over against the script, cut it into sentences, tighten
internal pauses, speed it up slightly, re-space it for pacing, and write the cue times
the film and the sound mix use.
Usage: python3 vo_align.py main.wav out_timed.wav cues.json [idx=override.wav ...]
"""
import sys, json, re, difflib, unicodedata, subprocess, tempfile, os
import numpy as np, scipy.io.wavfile as wf
from scipy.signal import resample_poly
from math import gcd
from faster_whisper import WhisperModel

SRC, OUTWAV, OUTCUES = sys.argv[1:4]
OVERRIDES = dict((int(a.split('=')[0]), a.split('=')[1]) for a in sys.argv[4:])
SENTENCES = [
    "Tu as une idée d'application ?",
    "Mobile, web, ou les deux ?",
    "Peut-être même une maquette ?",
    "Alors, tu cherches un développeur.",
    "Mais le code, c'est vingt pour cent.",
    "Les quatre-vingts autres, c'est ce qui fait payer tes utilisateurs.",
    "Et revenir.",
    "Ça, c'est un métier.",
    "Le mien.",
]
CUE_KEYS = ['c1', 'c2', 'c3', 'c4', 'c5', 'c6', 'c6b', 'c7', 'c8']
GAP_BEFORE = [0.24, 0.16, 0.18, 0.2, 0.3, 0.2, 0.06, 0.26, 0.36]
MIN_BEAT = [1.5, 1.75, 1.9, 2.05, 1.55, 2.0, 0.7, 1.2, 0.0]
LEAD = 0.08
TEMPO = 1.1
MAX_PAUSE = 0.1

def norm(w):
    w = unicodedata.normalize('NFD', w.lower())
    w = ''.join(c for c in w if unicodedata.category(c) != 'Mn')
    w = w.replace('80', 'quatre-vingts').replace('20', 'vingt').replace('%', 'pour cent')
    return re.sub(r"[^a-z' -]", '', w).replace('-', ' ')
def tokens(s): return [t for t in re.split(r"[ ']+", norm(s)) if t]

def load(path):
    sr, x = wf.read(path)
    x = x.astype(np.float32) / (32768.0 if x.dtype == np.int16 else 1.0)
    if x.ndim > 1: x = x.mean(1)
    return sr, x

model = WhisperModel('small', device='cpu', compute_type='int8')
def words_of(sr, x):
    g = gcd(sr, 16000); x16 = resample_poly(x, 16000 // g, sr // g).astype(np.float32)
    segs, _ = model.transcribe(x16, language='fr', word_timestamps=True, beam_size=5)
    return [w for s in segs for w in s.words]

def energy_of(sr, x):
    fr = int(0.01 * sr)
    e = np.array([np.sqrt(np.mean(x[i:i + fr] ** 2)) for i in range(0, len(x) - fr, fr)])
    return e, max(0.008, np.percentile(e, 20) * 3)

sr, x = load(SRC)
words = words_of(sr, x)
print('HEARD   :', ' '.join(w.word.strip() for w in words))
rec_tokens, rec_times = [], []
for w in words:
    for t in tokens(w.word): rec_tokens.append(t); rec_times.append((w.start, w.end))
exp_tokens, exp_sent = [], []
for i, s in enumerate(SENTENCES):
    for t in tokens(s): exp_tokens.append(t); exp_sent.append(i)
sm = difflib.SequenceMatcher(a=exp_tokens, b=rec_tokens, autojunk=False)
print('match ratio', round(sm.ratio(), 3))
for op in sm.get_opcodes():
    if op[0] != 'equal': print('DIFF', op[0], exp_tokens[op[1]:op[2]], '->', rec_tokens[op[3]:op[4]])
exp2rec = {}
for tag, i1, i2, j1, j2 in sm.get_opcodes():
    if tag == 'equal':
        for k in range(i2 - i1): exp2rec[i1 + k] = j1 + k
bounds = []
for si in range(len(SENTENCES)):
    idx = [i for i, s in enumerate(exp_sent) if s == si and i in exp2rec]
    bounds.append([rec_times[exp2rec[idx[0]]][0], rec_times[exp2rec[idx[-1]]][1]])

energy, thr = energy_of(sr, x)
def refine(e, thr, st, en, lo_t, hi_t):
    a = int(st / 0.01); b = int(en / 0.01); lo = int(lo_t / 0.01); hi = int(hi_t / 0.01)
    while a - 1 > lo and e[a - 1] > thr * 0.6: a -= 1
    while b + 1 < min(hi, len(e) - 1) and e[b + 1] > thr * 0.6: b += 1
    return a * 0.01, (b + 1) * 0.01

def tighten(seg, sr):
    """shrink internal pauses longer than MAX_PAUSE."""
    e, th = energy_of(sr, seg)
    sil = e < th * 0.6
    keep = np.ones(len(seg), bool); i = 0
    while i < len(sil):
        if sil[i]:
            j = i
            while j < len(sil) and sil[j]: j += 1
            dur = (j - i) * 0.01
            if dur > MAX_PAUSE and i > 3 and j < len(sil) - 3:
                cut0 = int((i * 0.01 + MAX_PAUSE / 2) * sr); cut1 = int((j * 0.01 - MAX_PAUSE / 2) * sr)
                keep[cut0:cut1] = False
            i = j
        else: i += 1
    return seg[keep]

def stretch(seg, sr, tempo):
    with tempfile.TemporaryDirectory() as d:
        a, b = os.path.join(d, 'a.wav'), os.path.join(d, 'b.wav')
        wf.write(a, sr, (np.clip(seg, -1, 1) * 32767).astype(np.int16))
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', a, '-filter:a', f'atempo={tempo}', b], check=True)
        _, y = load(b)
    return y

pieces = []
pre, post = 0.03, 0.09
for i, (st, en) in enumerate(bounds):
    if i in OVERRIDES:
        osr, ox = load(OVERRIDES[i])
        if osr != sr:
            g = gcd(osr, sr); ox = resample_poly(ox, sr // g, osr // g).astype(np.float32)
        ow = words_of(sr, ox)
        print(f'override {i}:', ' '.join(w.word.strip() for w in ow))
        oe, oth = energy_of(sr, ox)
        a_, b_ = refine(oe, oth, ow[0].start, ow[-1].end, 0, len(ox) / sr)
        seg = ox[max(0, int((a_ - pre) * sr)): int((b_ + post) * sr)]
    else:
        pe = bounds[i - 1][1] if i else 0.0
        ns = bounds[i + 1][0] if i + 1 < len(bounds) else len(x) / sr
        a_, b_ = refine(energy, thr, st, en, pe, ns)
        seg = x[max(0, int((a_ - pre) * sr)): int((b_ + post) * sr)]
    seg = tighten(seg.copy(), sr)
    seg = stretch(seg, sr, TEMPO)
    fi, fo = int(0.01 * sr), int(0.05 * sr)
    seg[:fi] *= np.linspace(0, 1, fi); seg[-fo:] *= np.linspace(1, 0, fo)
    pieces.append(seg)

cues, placed, t = {}, [], 0.0
for i, seg in enumerate(pieces):
    t += GAP_BEFORE[i]
    if i > 0: t = max(t, cues[CUE_KEYS[i - 1]] + LEAD + MIN_BEAT[i - 1])
    placed.append((t, seg))
    cues[CUE_KEYS[i]] = round(t - LEAD + pre, 3)
    dur = len(seg) / sr
    print(f'{CUE_KEYS[i]:>3}  {cues[CUE_KEYS[i]]:6.2f}s  {dur:4.2f}s  {SENTENCES[i]}')
    t += dur
end = cues["c8"] + 3.1
cues['end'] = round(end, 3); cues['vo_offset'] = 0.0
out = np.zeros(int((end + 0.5) * sr), dtype=np.float32)
for (tt, seg) in placed:
    k = int(round(tt * sr)); n = min(len(seg), len(out) - k); out[k:k + n] += seg[:n]
wf.write(OUTWAV, sr, (np.clip(out, -1, 1) * 32767).astype(np.int16))
json.dump(cues, open(OUTCUES, 'w'), indent=1)
print('end', round(end, 2), 's')
