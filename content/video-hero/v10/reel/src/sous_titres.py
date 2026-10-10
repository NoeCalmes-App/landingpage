# Sous-titres du Reel : la voix découpée en morceaux courts (une ligne), calés mot à mot sur la voix du film.
# Horodatage : faster-whisper (mots.json, mots_debut.json pour la première phrase). Sortie : sous_titres.json
# [[début, fin, [[début du mot, "mot affiché"], ...]], ...]
import json
debut = json.load(open('mots_debut.json'))[:13]           # « Créer … pari. »
reste = json.load(open('mots.json'))[2:]                  # à partir de « huit » (« Aujourd'hui » est repris de mots_debut)
aujourd = json.load(open('mots_debut.json'))[13:15]
T = [w[0] for w in debut] + [aujourd[0][0]] + [w[0] for w in reste]
T[0] = 0.09                                               # la voix commence à 0,09 s (repère c1 du film)
FIN = [w[1] for w in debut] + [aujourd[1][1]] + [w[1] for w in reste]
# les mots tels qu'on les affiche (chiffres, apostrophes, points de suspension), dans l'ordre de la voix
AFF = ("Créer ton application mobile ou ton SaaS en 2026 est un vrai pari. "
       "Aujourd’hui, 8 applications sur 10… peinent à rapporter 1 000 € par mois. "
       "On les ouvre une fois… puis plus jamais. "
       "Noé, lui, voit passer une dizaine d’idées par semaine. "
       "Il sait si la tienne a du potentiel… et comment la faire décoller. "
       "Grâce à une stratégie et des écrans pensés pour que tes utilisateurs reviennent chaque jour… et paient chaque mois. "
       "Un audit personnalisé de ton idée est offert au premier appel.").replace('1 000 €', '1 000 €').split(' ')
# « d'idées » : la voix en fait deux mots pour whisper (d / 'idées) ; « 1 000 € » : trois mots (mille, euros) → un seul affiché
voix = [w[2] for w in debut] + ["Aujourd'hui,"] + [w[2] for w in reste]
print(len(AFF), len(voix))
# alignement : on fusionne « d » + « 'idées » et « 1000 » + « euros » côté voix
tv, fv, mv = [], [], []
i = 0
while i < len(voix):
    w = voix[i]
    if w == 'd' and voix[i + 1].startswith("'"):
        tv.append(T[i]); fv.append(FIN[i + 1]); mv.append("d'" + voix[i + 1][1:]); i += 2; continue
    if w == '1000' and voix[i + 1] == 'euros':
        tv.append(T[i]); fv.append(FIN[i + 1]); mv.append('1000 euros'); i += 2; continue
    tv.append(T[i]); fv.append(FIN[i]); mv.append(w); i += 1
assert len(tv) == len(AFF), (len(tv), len(AFF), list(zip(mv, AFF)))
for a, b in zip(mv, AFF): print(f'{a:>14} → {b}')
# découpage en morceaux d'une ligne (nombre de mots par morceau)
TAILLES = [3, 4, 2, 4,  1, 4, 3, 3,  5, 3,  2, 4, 3,  5, 3, 4, 1,  4, 4, 4, 3, 4,  3, 5, 3]
assert sum(TAILLES) == len(AFF), (sum(TAILLES), len(AFF))
morceaux, k = [], 0
for n in TAILLES:
    morceaux.append(list(range(k, k + n))); k += n
out = []
for j, m in enumerate(morceaux):
    a = round(tv[m[0]] - 0.04, 3)
    fin_voix = fv[m[-1]]
    suivant = tv[morceaux[j + 1][0]] - 0.04 if j + 1 < len(morceaux) else 25.0
    b = round(min(suivant, fin_voix + 0.6), 3)              # on garde le texte pendant une courte pause, pas plus
    out.append([a, b, [[round(tv[i], 3), AFF[i]] for i in m]])
json.dump(out, open('sous_titres.json', 'w'), ensure_ascii=False, indent=0)
for a, b, ws in out: print(f'{a:6.2f}–{b:6.2f}  ' + ' '.join(w for _, w in ws))
