# Film du hero v11 : le début recalé sur la voix (demande de Noé du 10/10/2026).
# v10 : le site et l'application restaient jusqu'au milieu de « 2026 », puis « En 2026, un vrai pari. » et les
# dés arrivaient ensemble, après « 2026 ». v11 : le projet part à la fin de « …ton SaaS », « En 2026, » arrive
# quand la voix le dit, puis « un vrai pari. » et les dés sur « un vrai pari » (dés un peu plus rapides pour
# avoir le temps de se poser avant le violet). Le reste du film ne change pas.
# usage : python3 film_v11_patch.py film-v10.html film-v11.html
import sys, re, json
src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read()
def R(old, new):
    global s
    assert s.count(old) == 1, old[:80]
    s = s.replace(old, new)
m = re.search(r'window\.__CUES = (\{.*?\});', s)
Q = json.loads(m.group(1))
Q.update({'x1m': 1.58, 'c1b': 1.88, 'c1p': 2.93, 'dice': 2.86, 'dscale': 0.85})
s = s[:m.start(1)] + json.dumps(Q) + s[m.end(1):]
R("    words('A2', t, Q.c1b + 0.02, Q.c2 - 0.28, { st: 0.07 });",
  "    // « En 2026, » quand la voix le dit, « un vrai pari. » quand elle le dit\n"
  "    words('A2', t, Q.c1b + 0.02, Q.c2 - 0.28, { at: [Q.c1b + 0.02, Q.c1b + 0.09, Q.c1p + 0.02, Q.c1p + 0.09, Q.c1p + 0.16] });")
R("    const tD = Q.c1b + 0.02;\n    DICE.forEach((D, k) => {\n      const el = $(D.id), sh = $(D.sh); const u = C((t - tD - D.d0) / D.dur), vis = t > tD + D.d0;",
  "    const tD = Q.dice != null ? Q.dice : Q.c1b + 0.02, DSC = Q.dscale || 1;   // les dés partent sur « un vrai pari »\n"
  "    DICE.forEach((D, k) => {\n      const el = $(D.id), sh = $(D.sh); const u = C((t - tD - D.d0 * DSC) / (D.dur * DSC)), vis = t > tD + D.d0 * DSC;")
R('<title>Film hero v12</title>', '<title>Film hero v11</title>')
open(dst, 'w', encoding='utf-8').write(s)
json.dump(Q, open(dst.replace('.html', '').replace('film-', 'cues-') + '.json', 'w'))
print('ok', dst)
