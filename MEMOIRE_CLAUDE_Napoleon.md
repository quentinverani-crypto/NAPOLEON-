# MÉMOIRE CLAUDE — NAPOLEON Médical (bloc-notes inter-sessions)

> **Rôle** : mémoire synthétique du projet et des conversations, chargée automatiquement à chaque session via `CLAUDE.md`. À lire avant chaque réponse. À mettre à jour à chaque échange qui valide une décision ou apporte un fait nouveau. Ne contient que des faits vérifiés ou des décisions prises avec Quentin.
> **Dernière mise à jour** : 2026-11-04 (session « audit référencement IA / GEO »).

## 1. Le projet (faits établis)

- **Produit** : NAPOLEON Médical, assistant IA de consultation pour médecins en France. Deux usages : dictée médicale (retranscription, correction, structuration) et assistant de consultation (écoute, distinction médecin/patient, remplissage du dossier patient, rédaction compte rendu + ordonnance + courrier d'adressage). Le médecin relit et valide ; l'IA ne décide rien. Navigateur, sans installation. Pas encore d'intégration aux logiciels métier (export texte/CSV/PDF). Option POSOS (+29 €/mois).
- **Société** : NAPOLEON, siège Claira (66530, Pyrénées-Orientales), immatriculée 21/01/2026, capital 1 000 €, président Quentin Verani (source Pappers). Fondateurs : **Quentin Verani** (médecin ORL, thèse Montpellier 2024) et **Laury Monge** (responsable commerciale).
- **Offre (oct. 2026, HT)** : Freemium 0 €/mois (dictée illimitée, assistant limité à 4 h) · Programme Fondateurs 39 €/mois (200 premiers médecins, 1er mois offert, tarif conservé) · Praticien 59 €/mois (14 j d'essai).
- **Preuves affichées** : 100+ professionnels, 2000+ consultations, < 5 % de corrections ; 7 témoignages (prénoms seuls).
- **Sécurité** : serveurs en France, infrastructures certifiées HDS, RGPD, audio non conservé, aucun entraînement sur les consultations ; corpus vocal via contributeurs rémunérés (objectif 20 000 phrases, programme « Prêtez votre voix »).
- **Contact** : contact@napoleonmedical.fr · +33 7 66 70 47 83 (affiché uniquement sur une page noindex).
- **Site live** : https://www.napoleonmedical.fr — projet Vercel `napoleon_medical_site_vitrine` (team `team_HopPgFqIDoIlnEoZUVkI73dx`). Export statique « Claude Design » + `js/router.js` + `scripts/build-routes.py` (une page HTML par route). **Ce code n'est pas dans ce dépôt GitHub.** Apex → 301 www. Anciens projets Vercel : `napoleon` (napoleon-six.vercel.app) et `napoleon-site-vitrine-3` (sans redirection, à vérifier).
- **Ce dépôt** (`quentinverani-crypto/napoleon-`) : Next.js 16 / React 19 / Tailwind 4 / GSAP, ancienne landing « La voix médicale souveraine » + `/vitrine` (positionnement blockchain, 250 pionniers) : **obsolète par rapport au site live**. Docs internes : Business_Plan, Etude_De_Marche, mission_vision_valeurs (cibles initiales radiologie/ORL, pilote 66).
- **Marché / concurrents cités par les IA** : Nabla, Doctolib Assistant (79 € TTC/mois), Heidi (gratuit, australien), Loquii (Equasens), Scribe Médical (OVH HDS), Dragon Medical One, Maiia/Cegedim, Calmedica, Tandem, Praxy, Meditext.

## 2. Préférences de travail de Quentin

- Réponses en **français**. Mesures simples, rapides, efficaces ; vérifier ce qui est « spontanément mis de côté » (presse, LinkedIn, annuaires).
- Tenir ce bloc-notes à jour à chaque message validé ; le consulter avant chaque réponse.
- Avant de créer un agent : vérifier les compétences existantes ; transformer tout nouvel agent en compétence (`.claude/skills/...`) et l'alimenter avec les conversations utiles.
- Les skills `napoleon-reco-passes-directes` indiquent que les agents en parallèle ont déjà posé des problèmes de quota (429) : privilégier le travail direct quand Quentin le demande.

## 3. Compétences disponibles

- **Projet** (`.claude/skills/`) : `napoleon-referencement-ia` (créée le 2026-11-04 : audit GEO, script de vérification, prompts de test, kit) · `gsap-*` · `ui-ux-pro-max`.
- **Compte Claude** : `napoleon-items-recommandation`, `napoleon-reco-passes-directes` (corpus de dictée ASR, hors référencement).
- **Plugin `seo-aeo-geo-ultimate`** : `ai-search-research`, `seo-geo`, `seo-aeo`, `ai-visibility-monitor`, `seo-authority`, `seo-schema`, `seo-local`, `seo-audit`, `seo-action-plan`… (protocoles formels, hash-pinés : à utiliser pour un audit reproductible).

## 4. Historique des sessions

### 2026-11-04 — Audit référencement IA (ChatGPT / Perplexity / Gemini / Claude / Copilot)
- **Demande** : visiter le site et donner des mesures rapides pour être le mieux cité par les IA, sans oublier presse, LinkedIn, etc.
- **Constats clés** : base technique du site très bonne (robots IA autorisés, sitemap 15 URL, llms.txt, JSON-LD Organization/WebSite/SoftwareApplication/FAQPage 28 Q-R/Article ×3, pages statiques propres). **Zéro mention externe** (presse, comparatifs, LinkedIn, annuaires, avis). Index Google/Bing périmé (ancien site). Entité peu vérifiable : mentions légales en `?page=` non crawlables, pas de `sameAs`/réseaux sociaux, hébergeur HDS non nommé, /a-propos mince, témoignages prénoms seuls, incohérence « médecin ORL » (site) vs « médecin généraliste » (annuaire tiers).
- **Livrables** : `Audit_Referencement_IA_Napoleon_v1.md` (verdict, état des lieux, plan A/B/C, checklist, kit : fiche d'identité, JSON-LD, message aux comparatifs, angles presse, protocole de mesure 10 prompts × 6 moteurs) ; compétence `.claude/skills/napoleon-referencement-ia` ; ce bloc-notes + inclusion dans `CLAUDE.md`.
- **Limites** : proxy de session bloquant linkedin.com, pappers.fr, bing, duckduckgo, api.gouv, *.vercel.app, comparescribes.com, markus-sante.com ; aucun test direct dans les moteurs IA.

## 5. Décisions validées avec Quentin

- (aucune pour l'instant : en attente de retour sur le plan d'action du 2026-11-04)

## 6. À faire / en attente

- Quentin : choisir les actions de la semaine (A1–A8 de l'audit), fournir le nom de l'hébergeur HDS, les URL LinkedIn, le SIREN, et dire si Claude peut configurer les redirections Vercel des anciens déploiements.
- Claude (si validé) : rédiger les pages mentions légales / a-propos enrichie / comparatifs ; produire le JSON-LD final ; préparer le communiqué de presse ; établir la base de mesure.
