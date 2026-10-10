# Le film du hero (1920x1080) recomposé en vertical (1080x1920) pour un Reel Instagram.
# Même minutage que la voix et les bruitages : seules les positions, les tailles et le découpage des lignes changent.
# Zone utile : y 250 à 1290 (en haut, l'en-tête d'Instagram ; en bas, les sous-titres puis la légende et les boutons).
# usage : python3 reel_patch.py film-v11.html reel.html sous_titres.json
import sys

src, dst = sys.argv[1], sys.argv[2]
s = open(src, encoding='utf-8').read()


def R(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, f'{c} occurrence(s) au lieu de {n} : {old[:90]!r}'
    s = s.replace(old, new)


# ---------------- scène et fond ----------------
R('#stage { position: relative; width: 1920px; height: 1080px;', '#stage { position: relative; width: 1080px; height: 1920px;')
R('#cam { position: absolute; inset: 0; transform-origin: 960px 540px; }', '#cam { position: absolute; inset: 0; transform-origin: 540px 960px; }')
R('.grp { position: absolute; inset: 0; transform-origin: 960px 540px; }', '.grp { position: absolute; inset: 0; transform-origin: 540px 960px; }')
R('.ctr { left: 0; width: 1920px; text-align: center; }', '.ctr { left: 0; width: 1080px; text-align: center; }')
R('#bA { width: 1800px; height: 1150px;', '#bA { width: 1350px; height: 1750px;')
R('#bB { width: 1400px; height: 950px;', '#bB { width: 1150px; height: 1400px;')
R('#navyBg { position: absolute; left: -200px; top: -200px; width: 2320px; height: 1480px; background: radial-gradient(1300px 820px at 50% 42%,',
  '#navyBg { position: absolute; left: -200px; top: -200px; width: 1480px; height: 2320px; background: radial-gradient(900px 1400px at 50% 44%,')
R('#nGlow { position: absolute; left: 0; top: 0; width: 1500px; height: 900px;', '#nGlow { position: absolute; left: 0; top: 0; width: 1100px; height: 1300px;')
R('#vglow { position: absolute; inset: -60px; background: radial-gradient(1100px 760px at 28% 18%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 70%), radial-gradient(1000px 760px at 86% 96%,',
  '#vglow { position: absolute; inset: -60px; background: radial-gradient(900px 1150px at 24% 16%, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 70%), radial-gradient(900px 1100px at 88% 94%,')
R('#glint { position: absolute; top: -200px; left: 0; width: 300px; height: 1480px;', '#glint { position: absolute; top: -260px; left: 0; width: 300px; height: 2440px;')
R("S($('bA'), 'transform', `translate(${f2(380 + Math.sin(t * 0.42) * 170)}px, ${f2(120 + Math.cos(t * 0.36) * 90)}px)`);",
  "S($('bA'), 'transform', `translate(${f2(-260 + Math.sin(t * 0.42) * 150)}px, ${f2(260 + Math.cos(t * 0.36) * 130)}px)`);")
R("S($('bB'), 'transform', `translate(${f2(-260 + Math.cos(t * 0.31) * 150)}px, ${f2(-220 + Math.sin(t * 0.39) * 80)}px)`);",
  "S($('bB'), 'transform', `translate(${f2(-300 + Math.cos(t * 0.31) * 130)}px, ${f2(-260 + Math.sin(t * 0.39) * 110)}px)`);")
R("S($('nGlow'), 'transform', `translate(${f2(300 + Math.sin(t * 0.7) * 180)}px, ${f2(-160 + Math.cos(t * 0.55) * 80)}px)`);",
  "S($('nGlow'), 'transform', `translate(${f2(-60 + Math.sin(t * 0.7) * 160)}px, ${f2(120 + Math.cos(t * 0.55) * 140)}px)`);")

# ---------------- scène 1 : le projet, puis « En 2026, un vrai pari. » et les dés ----------------
R('<div class="t ctr" id="A1" data-w style="top: 104px; font-size: 104px">Créer ton application</div>',
  '<div class="t ctr" id="A1" data-w style="top: 300px; font-size: 98px">Créer ton application</div>')
R('<div class="t ctr" id="A1b" data-w style="top: 226px; font-size: 104px"><span class="grad">mobile</span> ou ton <span class="grad">SaaS</span></div>',
  '<div class="t ctr" id="A1b" data-w style="top: 414px; font-size: 98px"><span class="grad">mobile</span> ou ton <span class="grad">SaaS</span></div>')
R('#browser1 { position: absolute; left: 322px; top: 350px;', '#browser1 { position: absolute; left: -40px; top: 560px;')
R('<div class="phone" id="ph1" style="left: 1233px; top: 321px">', '<div class="phone" id="ph1" style="left: 676px; top: 616px">')
R('<div class="t ctr" id="A2" data-w style="top: 214px; font-size: 120px">En 2026, un vrai <span class="ser">pari.</span></div>',
  '<div class="t ctr" id="A2" data-w style="top: 330px; font-size: 150px">En 2026,</div>\n'
  '    <div class="t ctr" id="A2b" data-w style="top: 500px; font-size: 150px">un vrai <span class="ser">pari.</span></div>')
# film v11 : « En 2026, » quand la voix le dit, « un vrai pari. » quand elle le dit (deux lignes ici)
R("    words('A2', t, Q.c1b + 0.02, Q.c2 - 0.28, { at: [Q.c1b + 0.02, Q.c1b + 0.09, Q.c1p + 0.02, Q.c1p + 0.09, Q.c1p + 0.16] });",
  "    words('A2', t, Q.c1b + 0.02, Q.c2 - 0.28, { st: 0.07 });\n"
  "    words('A2b', t, Q.c1p + 0.02, Q.c2 - 0.25, { st: 0.07 });")
# les dés retombent sous la phrase, côte à côte au milieu
R("const DICE = [{ id: 'die1', sh: 'dsh1', d0: 0.0, dur: 0.95, x0: -300, x1: 772, a0: -40, spin: 752, fin: 5 },",
  "const DICE = [{ id: 'die1', sh: 'dsh1', d0: 0.0, dur: 0.95, x0: -300, x1: 330, a0: -40, spin: 752, fin: 5 },")
R("                { id: 'die2', sh: 'dsh2', d0: 0.07, dur: 0.98, x0: -470, x1: 1000, a0: 20, spin: -552, fin: 2 }];",
  "                { id: 'die2', sh: 'dsh2', d0: 0.07, dur: 0.98, x0: -470, x1: 580, a0: 20, spin: -552, fin: 2 }];")
R('const SEG = [0.32, 0.58, 0.78, 0.92], HGT = [0, 170, 70, 22], FLOOR = 592, DS = 1.25;',
  'const SEG = [0.32, 0.58, 0.78, 0.92], HGT = [0, 170, 70, 22], FLOOR = 900, DS = 1.25;')

# ---------------- scène 2 : « 8 apps sur 10 » ----------------
R('<div class="t white ctr" id="B1" style="top: 252px; font-size: 200px; letter-spacing: -0.055em">8 apps sur 10</div>',
  '<div class="t white ctr" id="B1" style="top: 320px; font-size: 160px; letter-spacing: -0.055em">8 apps sur 10</div>')
R('<div class="t white ctr" id="B2" data-w style="top: 726px; font-size: 64px; letter-spacing: -0.025em; font-weight: 700">peinent à rapporter <span class="hl">1&#160;000&#160;€ par mois</span>.</div>',
  '<div class="t white ctr" id="B2" data-w style="top: 1000px; font-size: 76px; letter-spacing: -0.025em; font-weight: 700">peinent à rapporter</div>\n'
  '    <div class="t white ctr" id="B2b" data-w style="top: 1092px; font-size: 76px; letter-spacing: -0.025em; font-weight: 700"><span class="hl">1&#160;000&#160;€ par mois</span>.</div>')
# dix applications en deux rangées de cinq ; les deux qui rapportent ne sont pas l'une sous l'autre
R('const APP_WIN = [2, 7], APP_X = (i) => 960 - (10 * 120 + 9 * 40) / 2 + i * 160, APP_Y = 528;',
  'const APP_WIN = [1, 8], APP_X = (i) => 540 - (5 * 120 + 4 * 36) / 2 + (i % 5) * 156, APP_Y = (i) => 610 + Math.floor(i / 5) * 156;')
R("d.style.left = APP_X(i) + 'px'; d.style.top = APP_Y + 'px';", "d.style.left = APP_X(i) + 'px'; d.style.top = APP_Y(i) + 'px';")
R("    words('B2', t, Q.c2c, Q.x2, { st: 0.05, sto: 0.015, dout: 0.16 });\n    highlight('B2', t, Q.hl2, Q.x2);",
  "    words('B2', t, Q.c2c, Q.x2, { st: 0.05, sto: 0.015, dout: 0.16 });\n"
  "    words('B2b', t, Q.c2c + 0.15, Q.x2 + 0.03, { st: 0.05, sto: 0.015, dout: 0.16 });\n"
  "    highlight('B2b', t, Q.hl2, Q.x2 + 0.03);")
R("['B2', 'C2', 'C3'].forEach(buildHighlight);", "['B2b', 'C2', 'C3'].forEach(buildHighlight);")

# ---------------- scène 3 : « On les ouvre une fois… puis plus jamais. » ----------------
R('<div class="t white" id="C2" data-w style="left: 170px; top: 432px; font-size: 84px">On les ouvre <span class="hl">une fois</span>…</div>',
  '<div class="t white ctr" id="C2a" data-w style="top: 262px; font-size: 92px">On les ouvre</div>\n'
  '    <div class="t white ctr" id="C2" data-w style="top: 362px; font-size: 92px"><span class="hl">une fois</span>…</div>')
R('<div class="t white" id="C3" data-w style="left: 170px; top: 552px; font-size: 84px">puis <span class="hl">plus jamais</span>.</div>',
  '<div class="t white ctr" id="C3" data-w style="top: 312px; font-size: 92px">puis <span class="hl">plus jamais</span>.</div>')
R('<div class="phone" id="ph3" style="left: 1220px; top: 214px">', '<div class="phone" id="ph3" style="left: 384px; top: 652px">')
R("    words('C2', t, Q.c3 + 0.05, out, { st: 0.06, sto: 0.015, dout: 0.16 });",
  "    words('C2a', t, Q.c3 + 0.05, Q.c3c - 0.06, { st: 0.06, sto: 0.015, dout: 0.16 });\n"
  "    words('C2', t, Q.c3 + 0.23, Q.c3c - 0.04, { st: 0.06, sto: 0.015, dout: 0.16 });")
# une phrase à la fois (demande de Noé) : la seconde arrive quand la première est sortie
R("    words('C3', t, Q.c3c + 0.1, out + 0.03, { st: 0.06, sto: 0.015, dout: 0.16 });",
  "    words('C3', t, Q.c3c + 0.16, out + 0.03, { st: 0.06, sto: 0.015, dout: 0.16 });")
R("    highlight('C2', t, Q.hl3a, out); highlight('C3', t, Q.hl3b, out + 0.03);",
  "    highlight('C2', t, Q.hl3a, Q.c3c - 0.04); highlight('C3', t, Q.hl3b, out + 0.03);")

# ---------------- scène 4 : Noé, les idées, « Ton idée », le potentiel et la courbe ----------------
R('<div class="t" id="D1" data-w style="left: 500px; top: 196px; font-size: 140px"><span class="grad">Noé</span></div>',
  '<div class="t" id="D1" data-w style="left: 520px; top: 300px; font-size: 150px"><span class="grad">Noé</span></div>')
R('<div class="t" id="D2" data-w style="left: 506px; top: 372px; font-size: 56px; letter-spacing: -0.025em">voit passer <span class="grad">une dizaine</span> d’idées par semaine.</div>',
  '<div class="t ctr" id="D2" data-w style="top: 560px; font-size: 76px; letter-spacing: -0.025em">voit passer <span class="grad">une dizaine</span></div>\n'
  '    <div class="t ctr" id="D2b" data-w style="top: 648px; font-size: 76px; letter-spacing: -0.025em">d’idées par semaine.</div>')
R('<div class="t" id="D3" data-w style="left: 506px; top: 376px; font-size: 52px; letter-spacing: -0.025em">Il sait si la tienne a du <span class="ser">potentiel…</span></div>',
  '<div class="t ctr" id="D3" data-w style="top: 540px; font-size: 76px; letter-spacing: -0.025em">Il sait si la tienne</div>\n'
  '    <div class="t ctr" id="D3b" data-w style="top: 628px; font-size: 76px; letter-spacing: -0.025em">a du <span class="ser">potentiel…</span></div>')
R('<div class="t" id="D4" data-w style="left: 506px; top: 446px; font-size: 52px; letter-spacing: -0.025em">et comment la faire <span class="grad">décoller.</span></div>',
  '<div class="t ctr" id="D4" data-w style="top: 540px; font-size: 76px; letter-spacing: -0.025em">et comment la faire</div>\n'
  '    <div class="t ctr" id="D4b" data-w style="top: 628px; font-size: 76px; letter-spacing: -0.025em"><span class="grad">décoller.</span></div>')
R('#chart4 { position: absolute; left: 1086px; top: 548px;', '#chart4 { position: absolute; left: 512px; top: 960px;')
R('<div id="pot5w" style="position: absolute; left: 730px; top: 566px;', '<div id="pot5w" style="position: absolute; left: 292px; top: 948px;')
# l'avatar et son anneau, à gauche de « Noé », le tout centré
R("    const r = 110 * s * (1 - ex), cx = 330, cy = 336;", "    const r = 100 * s * (1 - ex), cx = 385, cy = 385;")
R("    S(rg, 'transform', `scale(${f2(rr * 0.92)}) rotate(${f2(t * 40)}deg)`);", "    S(rg, 'transform', `scale(${f2(rr * 0.84)}) rotate(${f2(t * 40)}deg)`);")
R("      const r = L(110, 2300, io); const cx = 330, cy = 336;", "      const r = L(100, 2300, io); const cx = 385, cy = 385;")
R("    words('D2', t, Q.c4 + 0.55, Q.c4b - 0.36, { st: 0.045, sto: 0.015, dout: 0.16 });",
  "    words('D2', t, Q.c4 + 0.55, Q.c4b - 0.36, { st: 0.045, sto: 0.015, dout: 0.16 });\n"
  "    words('D2b', t, Q.c4 + 0.55 + 4 * 0.045, Q.c4b - 0.33, { st: 0.045, sto: 0.015, dout: 0.16 });")
R("    words('D3', t, Q.c4b, out, { st: 0.06, sto: 0.015, dout: 0.16 });",
  "    words('D3', t, Q.c4b, Q.c4d - 0.05, { st: 0.06, sto: 0.015, dout: 0.16 });\n"
  "    words('D3b', t, Q.c4b + 5 * 0.06, Q.c4d - 0.03, { st: 0.06, sto: 0.015, dout: 0.16 });")
R("    words('D4', t, c4d, out + 0.02, { st: 0.06, sto: 0.015, dout: 0.16 });",
  "    words('D4', t, c4d + 0.2, out + 0.02, { st: 0.06, sto: 0.015, dout: 0.16 });\n"
  "    words('D4b', t, c4d + 0.2 + 4 * 0.06, out + 0.04, { st: 0.06, sto: 0.015, dout: 0.16 });")
R("show(ch, chs > 0.001); S(ch, 'transform', `scale(${chs.toFixed(4)})`);", "show(ch, chs > 0.001); S(ch, 'transform', `scale(${(0.8 * chs).toFixed(4)})`);")
# la pile d'idées : au milieu, sous le texte ; elles arrivent du bas à droite
R("    const PX = 1420, PY = 676;                                    // centre of the pile",
  "    const PX = 540, PY = 1080;                                    // centre of the pile")
R("      let x = L(2150 + 120 * hash(i + 3), PX - 190 + ox, fIn) + 320 * pileOut, y = L(1190 + 140 * hash(i + 5), PY - 68 + oy + drift, fIn) + 50 * pileOut;",
  "      let x = L(1250 + 120 * hash(i + 3), PX - 190 + ox, fIn) + 320 * pileOut, y = L(1500 + 160 * hash(i + 5), PY - 68 + oy + drift, fIn) + 50 * pileOut;")
# « Ton idée » sort de la pile et se pose à gauche de la courbe
R("      const mx = L(PX - 190, 540, mk), my2 = L(PY - 68, 640, mk) - 60 * Math.sin(Math.PI * mk), msc = L(0.9, 1.22, mk);",
  "      const mx = L(PX - 190, 102, mk), my2 = L(PY - 68, 1010, mk) - 60 * Math.sin(Math.PI * mk), msc = L(0.9, 1.0, mk);")

# ---------------- scène 5 : la méthode, le téléphone, « chaque jour », « chaque mois » ----------------
R('<div class="t" id="E0" data-w style="left: 160px; top: 404px; font-size: 104px"><span class="grad">Sa méthode</span></div>',
  '<div class="t ctr" id="E0" data-w style="top: 280px; font-size: 120px"><span class="grad">Sa méthode</span></div>')
R('<div class="t" id="E0b" data-w style="left: 164px; top: 534px; font-size: 64px; letter-spacing: -0.025em">Stratégie + écrans</div>',
  '<div class="t ctr" id="E0b" data-w style="top: 420px; font-size: 72px; letter-spacing: -0.025em">Stratégie + écrans</div>')
R('<div class="t" id="E1a" data-w style="left: 164px; top: 436px; font-size: 52px; letter-spacing: -0.02em; color: #5d6b86">Ils reviennent</div>',
  '<div class="t ctr" id="E1a" data-w style="top: 290px; font-size: 60px; letter-spacing: -0.02em; color: #5d6b86">Ils reviennent</div>')
R('<div class="t" id="E1" data-w style="left: 160px; top: 498px; font-size: 104px">chaque <span class="grad">jour.</span></div>',
  '<div class="t ctr" id="E1" data-w style="top: 362px; font-size: 120px">chaque <span class="grad">jour.</span></div>')
R('<div class="t" id="E2a" data-w style="left: 164px; top: 436px; font-size: 52px; letter-spacing: -0.02em; color: #5d6b86">Ils paient</div>',
  '<div class="t ctr" id="E2a" data-w style="top: 290px; font-size: 60px; letter-spacing: -0.02em; color: #5d6b86">Ils paient</div>')
R('<div class="t" id="E2" data-w style="left: 160px; top: 498px; font-size: 104px">chaque <span class="grad">mois.</span></div>',
  '<div class="t ctr" id="E2" data-w style="top: 362px; font-size: 120px">chaque <span class="grad">mois.</span></div>')
R('<div class="phone" id="ph5" style="left: 849px; top: 214px">', '<div class="phone" id="ph5" style="left: 76px; top: 560px">')
R('    const mv = 0;\n    const x = L(0, 1348 - 849, mv), y = L((1 - rise) * 900, 290 - 214, mv);\n    const sc = L(1, 0.86, mv);',
  '    const mv = cIO(P(t, Q.c5c - 0.36, 0.5));\n    const x = L(540 - 134 - 76, 0, mv), y = (1 - rise) * 900;\n    const sc = 0.86;')
R('.week { position: absolute; left: 1250px; top: 478px; }', '.week { position: absolute; left: 384px; top: 712px; }')
R("S(wk, 'transform', `scale(${ws.toFixed(4)})`);", "S(wk, 'transform', `scale(${(1.05 * ws).toFixed(4)})`);")
R('.pay { position: absolute; left: 1250px; width: 520px;', '.pay { position: absolute; left: 404px; width: 520px;')
R("const PAYS = [['Octobre', 370], ['Novembre', 490], ['Décembre', 610]];", "const PAYS = [['Octobre', 640], ['Novembre', 760], ['Décembre', 880]];")

# ---------------- scène 6 : « Audit offert » ----------------
R('<div class="t ctr white" id="G1" data-w style="top: 300px; font-size: 176px">',
  '<div class="t ctr white" id="G1" data-w style="top: 520px; font-size: 150px">')
R('<div class="t ctr white" id="G1b" data-w style="top: 528px; font-size: 76px; letter-spacing: -0.025em">personnalisé, au premier appel.</div>',
  '<div class="t ctr white" id="G1b" data-w style="top: 742px; font-size: 76px; letter-spacing: -0.025em">personnalisé,</div>\n'
  '    <div class="t ctr white" id="G1d" data-w style="top: 828px; font-size: 76px; letter-spacing: -0.025em">au premier appel.</div>')
R('<div class="t ctr" id="G2" data-w style="top: 680px; font-size: 46px;', '<div class="t ctr" id="G2" data-w style="top: 968px; font-size: 50px;')
R("    words('G1b', t, c7c - 0.02, null, { st: 0.05 });",
  "    words('G1b', t, c7c - 0.02, null, { st: 0.05 });\n    words('G1d', t, c7c + 0.03, null, { st: 0.05 });")
# le violet de la fin naît du téléphone de la scène 5 (son centre), puis remplit l'écran
R('    const cta = { x: 849 + 156, y: 214 + 326 };', '    const cta = { x: 76 + 134, y: 560 + 280 };')
R("return [L(cta.x, 960, p), L(cta.y, 540, p), L(0, 2300, p)]; };", "return [L(cta.x, 540, p), L(cta.y, 960, p), L(0, 2300, p)]; };")
R("S($('glint'), 'transform', `translateX(${f2(L(-500, 2300, sIO(P(t, Q.c7 + 1.0, 0.9))))}px) skewX(-18deg)`);",
  "S($('glint'), 'transform', `translateX(${f2(L(-700, 1500, sIO(P(t, Q.c7 + 1.0, 0.9))))}px) skewX(-18deg)`);")

# ---------------- sous-titres de la voix (hors caméra : ils ne bougent pas avec l'image) ----------------
import json
SUBS = json.load(open(sys.argv[3], encoding='utf-8')) if len(sys.argv) > 3 else []
SUBS_CSS = """#subs { position: absolute; left: 0; top: 1352px; width: 1080px; z-index: 200; display: flex; justify-content: center; pointer-events: none; }
#subs .box { max-width: 960px; padding: 12px 30px 17px; border-radius: 26px; background: rgba(3, 18, 52, 0.86); color: #fffefc;
  font-family: 'PJS', sans-serif; font-weight: 800; font-size: 52px; line-height: 1.16; letter-spacing: -0.02em; text-align: center; white-space: nowrap;
  box-shadow: 0 14px 34px rgba(3, 18, 52, 0.22); transform-origin: 50% 100%; }
#subs .box i { font-style: normal; }
#subs .box i.on { color: #b3adff; }
"""
SUBS_JS = """  // sous-titres : un morceau court à la fois, le mot dit en violet clair
  const SUBS = %s;
  let subsKey = -1;
  function sceneSubs(t) {
    const el = $('subs');
    const k = SUBS.findIndex(([a, b]) => t >= a && t < b);
    if (k < 0) { el.style.opacity = '0'; subsKey = -1; return; }
    const [a, b, ws] = SUBS[k];
    if (k !== subsKey) { subsKey = k; el.innerHTML = '<div class="box">' + ws.map(([, w]) => '<i>' + w + '</i>').join(' ') + '</div>'; }
    const box = el.firstChild, is = box.querySelectorAll('i');
    let cur = 0; ws.forEach(([wt], j) => { if (t >= wt - 0.02) cur = j; });
    is.forEach((e, j) => { e.className = j === cur ? 'on' : ''; });
    const nx = SUBS[k + 1], suite = nx && nx[0] - b < 0.15;      // le morceau suivant arrive tout de suite : pas de fondu entre les deux
    const pin = Math.max(0, spring(t - a, 18, 0.62)), q = suite ? 0 : P(t, b - 0.08, 0.08);
    el.style.opacity = (C((t - a) / 0.05) * (1 - q)).toFixed(3);
    S(box, 'transform', `translateY(${f2((1 - Math.min(1, pin)) * 14)}px) scale(${(0.94 + 0.06 * Math.min(1.02, pin)).toFixed(4)})`);
  }

  function render(t) {""" % json.dumps(SUBS, ensure_ascii=False)
R('#glint { position: absolute;', SUBS_CSS + '#glint { position: absolute;')
R('  <div id="loopFade" class="grp" style="background: var(--paper)"></div>\n</div></div>',
  '  <div id="loopFade" class="grp" style="background: var(--paper)"></div>\n</div><div id="subs"></div></div>')
R('  function render(t) {', SUBS_JS)
R('sceneS6(t); sceneS7(t); sceneLoop(t);', 'sceneS6(t); sceneS7(t); sceneLoop(t); sceneSubs(t);')

open(dst, 'w', encoding='utf-8').write(s)
print('ok', dst)
