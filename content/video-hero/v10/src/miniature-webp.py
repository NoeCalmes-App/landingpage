# Miniature PNG 1920x1080 -> WebP 1600 et 960 px, avec un léger tramage contre les bandes dans les dégradés.
# python3 miniature-webp.py miniature.png ../../../../public/assets/videos/hero-v10-miniature
# donne hero-v10-miniature.webp (1600 px) et hero-v10-miniature-960.webp
import sys
import numpy as np
from PIL import Image

src, base = sys.argv[1], sys.argv[2]
im = Image.open(src).convert('RGB')
rng = np.random.default_rng(7)
for w, q, nom in ((1600, 92, f'{base}.webp'), (960, 90, f'{base}-960.webp')):
    h = round(w * im.height / im.width)
    r = np.asarray(im.resize((w, h), Image.LANCZOS)).astype(np.float32)
    r = np.clip(r + rng.normal(0, 0.9, r.shape), 0, 255).round().astype(np.uint8)
    Image.fromarray(r).save(nom, 'WEBP', quality=q, method=6)
    print(nom)
