---
name: investisseurs
description: Fait passer un pitch de startup devant 5 investisseurs simulés (business angel, fonds seed, banquier, ancienne fondatrice, sceptique de service), en parallèle. Chacun lit le pitch, pose ses 3 questions qui fâchent et vote « j'investis » ou « je passe ». Rend les 3 failles à corriger avant le rendez-vous et une réponse prête pour chaque question. À utiliser quand l'utilisateur dit « /investisseurs », « fais tester mon pitch », « je pitche demain », « prépare-moi à une levée », « que vont me demander les investisseurs », ou donne un pitch deck, un one-pager ou un texte de présentation de sa startup.
argument-hint: <fichier du pitch, lien ou texte> [montant demandé]
---

# Investisseurs : ton pitch devant 5 investisseurs, avant le vrai rendez-vous

Tu fais lire le pitch de l'utilisateur par cinq investisseurs **simulés**, chacun avec sa grille, puis tu rends une préparation courte : les failles à corriger, les questions qui vont tomber et les réponses à préparer. Tu ne modifies aucun fichier de l'utilisateur ; tout s'écrit dans `.investisseurs/`.

Dis-le dans le rendu : ce sont des investisseurs simulés par l'IA, qui repèrent les trous classiques d'un pitch. Ils ne remplacent ni un vrai investisseur, ni un conseil financier ou juridique, et leur vote n'est pas une prédiction de levée.

## 1. Lire le pitch

- Accepte un PDF (deck), un fichier texte ou Markdown, une page web ou un texte collé. Pour un PDF, lis toutes les pages, images comprises.
- Écris `.investisseurs/<AAAA-MM-JJ-HHMM>/pitch.md` : le pitch en texte, page par page, sans le réécrire. Ajoute `.investisseurs/` au `.gitignore` s'il existe.
- Relève ce qui est **écrit** et ce qui **manque** : problème, solution, marché (taille et source), traction (chiffres et dates), modèle économique (prix, marge), concurrence, équipe, montant demandé et usage des fonds. Si le montant n'est pas donné, demande-le une fois, sinon note « non précisé ».

## 2. Les cinq investisseurs, en parallèle

Lance **dans un seul message** cinq sous-agents (outil Agent), un par investisseur. Chacun reçoit le chemin de `pitch.md`, son profil ci-dessous et cette consigne :

> Tu es cet investisseur, avec sa grille et son ton. Lis le pitch en entier. Ne t'appuie que sur ce qui est écrit : si une information manque, c'est une faille, ne l'invente pas. Rends exactement :
> 1. Note sur 10 et ton avis en 2 phrases, à la première personne.
> 2. Tes 3 questions qui fâchent, de la plus importante à la moins importante, chacune avec ce qui la motive dans le pitch (ou ce qui manque).
> 3. Ton vote : « J'investis » ou « Je passe », et la condition qui te ferait changer d'avis, en une phrase.
> Ne modifie aucun fichier.

| Investisseur | Sa grille |
|---|---|
| Business angel | l'équipe et sa capacité à exécuter, l'histoire du fondateur, le premier marché concret, ce qu'il peut apporter en plus de l'argent |
| Fonds seed | la taille du marché (avec une source), la croissance mois par mois, ce qui rend la startup difficile à copier, le chemin vers la prochaine levée |
| Banquier | la marge par client, le chiffre d'affaires réel, le besoin de trésorerie, les garanties, le point mort |
| Ancienne fondatrice | ce qui va casser en premier, le canal d'acquisition et son coût, le recrutement, ce qu'elle aurait aimé savoir à ce stade |
| Sceptique de service | le concurrent qui fait déjà la même chose, pourquoi maintenant, pourquoi ce n'est pas une simple fonctionnalité d'un gros acteur, les chiffres trop beaux |

## 3. La préparation

1. Rassemble les 15 questions, fusionne les doublons (deux investisseurs qui posent la même question = une seule, mentionnée par les deux).
2. Choisis les **3 failles** les plus graves : celles citées par le plus d'investisseurs, puis celles qui font voter « Je passe ».
3. Pour chaque question retenue, écris une **réponse prête** de 2 à 3 phrases, en t'appuyant uniquement sur ce que contient le pitch. S'il manque l'information, écris la réponse avec `[à compléter : …]` à la place du chiffre ; n'invente jamais un chiffre.
4. Écris `.investisseurs/<date>/preparation.md` et rends ce format :

```
## Ton pitch devant 5 investisseurs

Votes : 2 « J'investis », 3 « Je passe » (simulation, pas une prédiction)

### Les 3 failles à corriger avant le rendez-vous
1. [Fonds seed, Sceptique] Faille. → Ce qu'il faut ajouter ou changer dans le pitch.
2. ...
3. ...

### Les questions qui vont tomber, et tes réponses
- [Banquier] « Quelle est ta marge par client ? » → Réponse prête…
- ...

### Ce que chacun a dit
- Business angel (7/10, J'investis) : avis en 2 phrases.
- ...
```

Termine en proposant de réécrire la page du pitch qui corrige la faille n° 1, puis de refaire passer les cinq investisseurs sur la nouvelle version.

## Variante : partir d'un site web (ou de tout document public) au lieu d'un pitch

Quand l'utilisateur donne un site plutôt qu'un deck (« travaille sur www.monsite.fr »), le site **est** le pitch tel que le jury le reçoit, et la demande devient : « que voudraient voir les jurés, et comment construire mon pitch ? ».

1. **Lire tout le site, pas la page d'accueil.** Récupérer `sitemap.xml`, télécharger chaque page avec `curl` dans un dossier dédié du bloc-notes, extraire le texte (script Python lancé avec `-I`), relever chaque chiffre, prix, nom, promesse, et ce qui manque (revenu, rétention, équipe technique, mentions légales, intégrations). Comparer avec les documents du dépôt (business plan, étude de marché) : les écarts sont des questions de jury. Refaire une capture le jour du rendu : un site vivant change (ici « 100+ » → « 40+ » et « 14 jours » → « 30 jours » en cinq jours).
2. **Poser 2 ou 3 questions au fondateur avant de lancer le jury** si l'utilisateur le demande ou si le site ne dit rien du montant, de la traction réelle ou de l'équipe : la cible de financement, les vrais chiffres derrière les compteurs du site, qui développe et avec quelle technologie. Écrire les réponses dans `.investisseurs/<date>/reponses_fondateur.md` : les jurés les lisent avec le site.
3. **Recherche sourcée en amont** (workflow ou sous-agents, une dimension chacun : concurrence et prix, marché et preuves scientifiques, réglementaire et technique, financement et attentes des investisseurs), avec une passe de vérification contradictoire des chiffres. Écrire le résultat dans `faits_recherche.md` avec le niveau de confiance de chaque fait : les jurés s'en servent pour poser des questions chiffrées. Si la vérification échoue (crédits, réseau), le dire dans le rendu et vérifier au moins les chiffres repris dans la préparation.
4. **Demander à chaque juré, en plus de ses 3 questions et de son vote** : la liste précise des chiffres et éléments qu'il exige de voir (quoi, sous quelle forme, pourquoi, et ce que le site donne aujourd'hui à la place), la seule slide qu'il imposerait, et la phrase du site à ne surtout pas prononcer devant lui. C'est ce qui permet d'écrire le plan de pitch slide par slide.
5. **Ajouter un juré bonus qui correspond au financeur réel** quand il est connu (ici un chargé d'affaires Bpifrance pour une Bourse French Tech : éligibilité, caractère innovant, dépenses éligibles, co-financement). Le dire clairement : il s'ajoute aux cinq, il ne les remplace pas.
6. **Rendu** : `preparation.md` au format habituel, plus une section « Construire le pitch » (ordre des slides, chiffre attendu sur chacune, ce qui manque à produire avant le rendez-vous) et la liste des faits sourcés avec leur statut de vérification.

## Cas d'usage rencontrés

- **2026-11 — NAPOLEON Médical (napoleonmedical.fr), assistant IA de consultation pour médecins libéraux, pré-lancement (4 décembre 2026), cible Bourse French Tech.** Site de 15 pages + 3 articles lu intégralement ; 3 questions posées (cible de financement, traction réelle, équipe et stack) ; recherche en 4 dimensions (100 faits) ; jury de 6 (5 + Bpifrance) + 2 vérificateurs. Leçons : le réseau de la session bloquait la lecture directe de nombreux sites officiels (DREES, Ameli, Bpifrance, JAMA…) → les agents ont travaillé sur les extraits de recherche, à signaler dans le rendu ; la passe de vérification a échoué une première fois faute de crédits → la relancer en ciblant seulement les chiffres repris dans la préparation ; les compteurs d'un site vitrine (« 100+ professionnels ») ne sont pas de la traction pour un jury : il faut MRR, actifs 30 jours, conversion gratuit → payant, churn.
