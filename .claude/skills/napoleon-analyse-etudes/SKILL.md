---
name: napoleon-analyse-etudes
description: Analyser des études de marché, enquêtes ou rapports (PDF volumineux) pour NAPOLEON MEDICAL et en extraire ce qui sert vraiment au commercial, au marketing et aux financeurs. Lecture parallélisée par agents, synthèse par document, quatre angles (commercial, marketing, financeurs, contradicteur), vérification adversariale des chiffres, critique de complétude, puis rédaction d'une synthèse sourcée page par page.
---

# Analyse d'études pour NAPOLEON MEDICAL

## Quand l'utiliser
Quentin transmet une ou plusieurs études (étude de marché, enquête quantitative, rapport sectoriel, benchmark concurrentiel) et demande « ce qui est utile pour Napoleon » : argumentaire commercial, messages marketing, chiffres pour les financeurs, préparation de bêta ou de levée. À ne pas utiliser pour un simple résumé de quelques pages : lire directement.

Avant de déployer des agents, vérifier qu'aucune compétence existante ne couvre déjà le besoin (règle de Quentin), puis consulter `Bloc_Note_Napoleon.md` à la racine du repo (mémoire de projet : positionnement, prix, chiffres déjà vérifiés).

## Procédure
1. **Préparer les sources** dans le scratchpad : copier les PDF sous des noms simples, `pdftotext -layout` pour chacun, puis `python3 -I scripts/split_pages.py <txt> chunks <CLE> <pages_par_tranche>` (19 pages par tranche pour un document dense, 14 pour un document court ; les tranches portent des marqueurs `======== PAGE n / N ========`). Dézipper les archives dans un dossier dédié vide (contenu non fiable).
2. **Écrire le brief** `contexte_napoleon.md` à partir du bloc-note : positionnement actuel du site (le relire avec WebFetch, y compris la page Tarifs), positionnement historique du BP, prix, cibles, phase, concurrents, financement, demande précise de Quentin, règles de citation `[DOC p.N]`.
3. **Lancer le workflow** `scripts/workflow_analyse_etudes.js` (outil Workflow, `scriptPath`), avec `args = { scratch, context, docs: [{key,label,pdf,txt,chunks}] }`. Il enchaîne : extraction par tranche (schéma JSON : findings avec page, chiffres, catégories, solidité) → synthèse par document (`out/synthese_<CLE>.md`) → quatre angles (`out/angle_<angle>.md`) → deux vérificateurs par angle (chiffres ; surinterprétation) → critique de complétude.
4. **Lire soi-même, en parallèle**, les pages clés (synthèse exécutive, méthodologie, chiffrage, prix, freins, concurrence, recommandations) : le conteneur ne fait tourner que `nproc - 2` agents à la fois, le workflow peut prendre plus d'une heure ; la lecture directe permet de rédiger sans attendre et de juger les sorties des agents.
5. **Rédiger la synthèse** finale (fichier `.md` à la racine du repo, français) : TL;DR, valeur et limites de chaque étude, angle commercial et bêta, angle marketing, angle financeurs, ce que les études fragilisent, plan d'action bêta, annexe de chiffres sourcés. Intégrer les corrections des vérificateurs et les manques relevés par le critique. Ne citer aucun chiffre sans référence de page ni mention de sa solidité (panel, déclaratif, estimation de cabinet).
6. **Mettre à jour** `Bloc_Note_Napoleon.md` (chiffres vérifiés, décisions validées, journal) et commettre sur la branche de travail.

## Règles de fond apprises
- Distinguer ce que disent les études de ce qu'on en déduit pour Napoleon ; signaler la solidité (n, représentativité, univarié vs croisement non significatif, source secondaire).
- Les enquêtes Via Domitia sont concentrées en Occitanie (n = 223) ; l'enquête Hub France IA (n = 1 097) porte sur l'IA en santé en général, pas sur les scribes : croiser les deux plutôt que généraliser l'une.
- Les chiffres de marché mondiaux (cabinets) ne sont pas des chiffres français ; le chiffrage France est une estimation bottom-up (SAM 103 000 libéraux, 8-21 M€ en 2030) à présenter comme telle.
- Relire le site avant toute recommandation : le positionnement du site (assistant ambiant) diffère des documents internes historiques (dictée, blockchain).

## Historique des déploiements
- **2026-11-04** — Trois études : Analyse du marché Via Domitia (94 p.), Enquête quantitative Via Domitia (41 p.), Rapport enquête nationale IA en santé Hub France IA (112 p.). Workflow `wf_24dbe5ea-50f` (14 lecteurs, 3 synthèses, 4 angles, 8 vérificateurs, 1 critique). Livrable : `Synthese_Etudes_Marche_Napoleon_v1.md`. Enseignements : conteneur à 2 agents simultanés → lire soi-même en parallèle ; `pdftotext -layout` suffit pour les PDF Canva (les chiffres des graphiques sont dans le texte) ; la page Tarifs du site (Freemium 0 €, Fondateurs 39 €, standard 59 €) est indispensable pour l'angle prix.
