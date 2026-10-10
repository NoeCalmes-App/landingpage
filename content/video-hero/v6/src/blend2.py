"""Average the sub-frames of every frame in linear light (filmic motion blur).
Usage: python3 blend2.py subframe_dir out_dir [workers]
Reads subframe_dir/FFFFF_JJ.jpg, writes out_dir/FFFFF.png
"""
import sys, os, glob
from collections import defaultdict
from multiprocessing import Pool
import numpy as np
from PIL import Image

SRC, DST = sys.argv[1], sys.argv[2]
WORKERS = int(sys.argv[3]) if len(sys.argv) > 3 else 2
os.makedirs(DST, exist_ok=True)
groups = defaultdict(list)
for p in glob.glob(os.path.join(SRC, '*_*.jpg')):
    f = os.path.basename(p).split('_')[0]
    groups[f].append(p)

# sRGB <-> linear lookup
lin = ((np.arange(256) / 255.0) ** 2.2).astype(np.float32)

def job(item):
    f, paths = item
    out = os.path.join(DST, f + '.png')
    if os.path.exists(out): return
    acc = None
    for p in paths:
        a = lin[np.asarray(Image.open(p).convert('RGB'))]
        acc = a if acc is None else acc + a
    acc /= len(paths)
    img = (np.clip(acc, 0, 1) ** (1 / 2.2) * 255 + 0.5).astype(np.uint8)
    Image.fromarray(img).save(out, compress_level=1)

if __name__ == '__main__':
    items = sorted(groups.items())
    with Pool(WORKERS) as pool:
        for k, _ in enumerate(pool.imap_unordered(job, items, chunksize=4)):
            if k % 120 == 0: print('blended', k, '/', len(items), flush=True)
    print('done', len(items))
