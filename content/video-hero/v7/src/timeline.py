"""Cues for film24 / sfx19: the voice cues plus the derived scene-change times, in one file so picture and sound share them.
Scene changes follow the voice: a scene leaves right after its last word and is gone before the next one arrives.
Usage: python3 timeline24.py ../audio6v/cues.json ../audio6v/cues24.json"""
import json, sys
Q = json.load(open(sys.argv[1]))
# two scene starts were late on the voice (measured onsets: « Noé » 9.72 s, « grâce » 15.76 s)
Q['c4'] = 9.70
Q['c5'] = 15.70
Q['x1m'] = round(Q['c1b'] - 0.30, 3)          # S1: the site and the application leave before the dice are thrown
Q['x2'] = round(Q['c3'] - 0.31, 3)            # S2 leaves right after « …par mois. » (ends 7.21 s)
Q['p3'] = round(Q['x2'] + 0.26, 3)            # the phone rises once S2 has gone
Q['tap3'] = round(max(Q['c3b'] + 0.05, Q['p3'] + 0.5), 3)
Q['open3'] = round(Q['tap3'] + 0.1, 3)
Q['close3'] = round(max(Q['c3c'] - 0.05, Q['open3'] + 0.6), 3)
Q['dim3'] = round(Q['close3'] + 0.28, 3)
Q['x3'] = round(Q['c4'] - 0.28, 3)            # S3 leaves right after « …jamais. » (ends 9.35 s), gone before Noé appears
Q['x4'] = round(Q['c5'] - 0.28, 3)            # S4 leaves right after « …décoller, » (ends 15.41 s)
json.dump(Q, open(sys.argv[2], 'w'), indent=0)
for k in ['c1b', 'x1m', 'c2', 'x2', 'p3', 'tap3', 'open3', 'close3', 'dim3', 'x3', 'c4', 'c4b', 'x4', 'c5', 'c5c', 'c5d', 'c7', 'end']:
    print(f'{k:7s} {Q[k]:6.2f}')
