# Bloc-note projet NAPOLEON — mémoire de travail Claude

> Fichier de mémoire synthétique, consulté avant chaque réponse et mis à jour à chaque point validé ensemble.
> Convention : on n'y écrit que ce qui est **validé** ou **factuel**, daté. Les hypothèses sont marquées `[hyp]`.

## 1. Fiche projet (état au 2026-11-04)

- **Produit** : NAPOLEON MEDICAL (www.napoleonmedical.fr). **Positionnement actuel du site (nov. 2026) : assistant IA ambiant** — « L'assistant IA qui rédige vos comptes rendus pendant la consultation » : écoute la consultation (médecin/patient), remplit le DPI, génère CR + ordonnance + courrier d'adressage ; validation médicale ; HDS/RGPD, données en France. Preuves affichées : « 100+ professionnels », « 2000+ consultations », « < 5 % de corrections » ; 7 témoignages (généralistes, pédiatre, médecin du sport) ; **Programme Fondateurs** (200 premiers utilisateurs), CTA « Essayer gratuitement », « Prêtez votre voix ».
- **Positionnement historique (BP v1, 2025)** : transcription médicale 2.0 par dictée (CR + ordonnances + documents patients ≤ 60 s), blockchain pour la preuve d'intégrité, annexes patients, aide au codage, interop MSSanté/DMP/Ségur. ⚠️ Les documents internes (BP, étude de marché v1, mission) parlent encore « dictée/transcription » alors que le site parle « assistant ambiant » : à harmoniser.
- **Équipe (page À propos)** : Quentin Verani, cofondateur, médecin ORL (internat ORL & chirurgie cervico-faciale), CEO/product owner ; **Laury Monge, cofondatrice, responsable commerciale**. Pas de profil technique ni de soutien (incubateur, Bpifrance, région) affiché sur le site. Ancrage Pyrénées-Orientales / Occitanie (UPVD, pilote P-O cité dans le BP).
- **Ce que dit le site (FAQ, Sécurité & données, nov. 2026)** : serveurs certifiés HDS en France, « aucune donnée ne quitte la France », audio non conservé au-delà du nécessaire, aucun entraînement de modèle commun sur les consultations ; hébergeur non nommé, pas de mention DPIA / chiffrement / journalisation / dispositif médical ; information du patient + affiche salle d'attente ; « rien n'est enregistré sans votre relecture » ; médecine générale couverte en premier ; **aucun partenariat d'intégration logiciel** (exports texte/CSV/PDF, copier-coller) ; CR disponible dans la minute ; fonctionne dans le navigateur ; micro-cravate conseillé ; téléconsultation « à confirmer ». Pages distinctes « La dictée médicale » (« Vous dictez, Napoléon retranscrit ») et « L'assistant médical IA » (« Vous consultez, Napoléon rédige »), sans explication de la différence.
- **Phase** : bêta test imminente (nov. 2026). MVP décrit dans `mission_vision_valeurs_napoleon_v1.md` (5 fonctions : ASR FR médical, CR structuré, ordonnance auto, documents patients, validation + export d'audit).
- **Cibles** : hôpitaux publics (CHU/CH), cliniques privées (ELSAN…), cabinets libéraux ; persona de lancement à fixer (radiologie ou ORL). Entrée commerciale via les médecins DIM.
- **Prix actuels du site (nov. 2026)** : Freemium 0 € (dictée illimitée, assistant IA 4 h) ; **Programme Fondateurs 39 € HT/mois** (barré 59 €, 200 premiers clients, 1er mois offert, tarif conservé à vie tant que l'abonnement est actif) ; **tarif standard 59 € HT/mois** ; option POSOS +29 €/mois ; 14 jours d'essai ; sans engagement.
- **Grille historique BP v1** : ECO 700/650/600 € et PREMIUM 1000/900/800 €/an/médecin (Solo / Équipe 5-15 / Hôpital 15+), -15/-20 % engagement annuel, essai 15 jours.
- **Financement visé (BP v1)** : ~200 k€ sur 12 mois ; AFI Bpifrance 50 k€, Bourse French Tech 30 k€, SID Occitanie 50+70 k€ ; levée privée après prototype + intérêt d'établissements.
- **KPI publics choisis** : latence P95 ≤ 60 s, ≥ 70 % de documents sans retouche, ≥ 45 min/jour rendues.

## 2. Documents de référence dans le repo

- `Business_Plan_Napoléon_v1.md` — BP complet v1 (marché, concurrents, tarifs, financement).
- `Etude_De_Marche_Napoléon_v1.md` — résumé marketing/site (promesse, one-pager, campagne).
- `mission_vision_valeurs_napoleon_v1.md` — mission/vision/valeurs + engagements mesurables (16/09/2025).
- Site vitrine Next.js (`src/`, `/vitrine`), GSAP/ScrollTrigger/Lenis.

## 3. Études externes reçues (2026-11-04)

Trois livrables fournis par Quentin (auteur Tom Horning / « Via Domitia », réalisés sur Canva) :
1. **Analyse du marché – Via Domitia** (94 p., juin 2026) — « Etude de marché PROJET NAPOLEON ».
2. **Analyse quantitative – Via Domitia** (41 p., juil. 2026) — « Livrable – Enquête quantitative ».
3. **Rapport enquête adoption IA en santé – janvier 2026** (112 p.).

Repères méthodo : (1) étude documentaire (DREES, ANS, HAS, CNIL, cabinets GVR/DataIntelo/GMI) ; (2) **n = 223** réponses complètes, > 80 % Occitanie, 47,5 % MG / 23,3 % spécialistes / 10,8 % IDE, aucun croisement significatif au khi² → tendances, pas de preuves ; (3) **n = 1 097** réponses complètes (10/02–10/05/2025), ~954 utilisateurs / ~131 fournisseurs, soutien DGE, participation HAS, non représentatif.

Demande : extraire ce qui est réellement utile pour (a) le commercial, (b) le marketing, (c) les financeurs / levée de fonds, dans la perspective de la bêta.

## 4. Décisions / points validés

- (à compléter au fil des échanges)

## 5. Compétences (skills) Napoleon existantes

- `napoleon-items-recommandation` — rédaction d'items de dictée « recommandation » par sous-agents + relecture factuelle.
- `napoleon-reco-passes-directes` — même objectif, sans agents, par petites passes.
- Règle Quentin : avant de déployer un agent, vérifier qu'une compétence existante ne couvre pas déjà le besoin ; transformer les nouveaux agents utiles en compétences.

## 6. Journal

- 2026-11-04 : réception des 3 études ; lancement de l'analyse (lecture parallélisée + synthèse par angle commercial / marketing / financeurs).
- 2026-11-04 : livrable v1 `Synthese_Etudes_Marche_Napoleon_v1.md` (lecture directe des 247 pages, 311 chiffres recontrôlés à la page citée) ; commit 58ba88f sur `claude/friendly-lamport-gypk9h`. Compétence `napoleon-analyse-etudes` créée dans `.claude/skills/`. Workflow de vérification par agents (`wf_24dbe5ea-50f`) en cours pour une v2.

## 7. Chiffres clés des trois études (vérifiés à la source, à citer avec la référence)

**Enquête quantitative Via Domitia (n = 223, > 80 % Occitanie, juil. 2026)**
- Charge : CR + lettres de liaison = tâche la plus chronophage pour 59,6 % ; ~53 % y consacrent ≥ 1 h/jour ; ~1/5 > 2 h/jour [QUANTI p.4, 11].
- Pratiques : saisie manuelle pendant 57,4 % / après 33,6 % ; dictée IA 22,4 % ; dictée simple 12,6 % ; **assistant ambiant 6,7 %** [p.13].
- Fonctions attendues : génération CR 89,7 % ; résumé antécédents avant consult 87,9 % ; MAJ dossier 79,4 % ; **intégration logiciel métier 74,9 % (prérequis)** ; lettres 65,9 % ; ordonnances 65,5 % ; aide à la décision dernière 49,3 % [p.15, 37].
- Bénéfices attendus n° 1 et 2 : charge mentale / stress de fin de journée et temps patient (registre émotionnel) ; sécurité (erreur documentaire, traçabilité) ~1/2 [p.16].
- Perception IA : 48,4 % plutôt positive avec garanties, 4 % très positive, 35,9 % neutre, 8,1 % plutôt négative ; **83 % ne distinguent pas dictée / assistant** [p.17].
- Freins : responsabilité 71 %, sécurité 70 %, coût 64 %, fiabilité 59 %, intégration 44 %, nationalité serveurs 42 % ; < 10 % sans frein ; ~1/4 anticipent une réticence des patients [p.19-20].
- Prix : **médiane et mode 50 € HT/mois** (toutes sous-populations) ; moyenne 61,7 € ; 3/4 entre 30 et 50 € ; ≥ 80 € : 36-46 % ; 0 € : 3,6 % ; salariés publics moyenne 78,6 € ; abonnement mensuel sans engagement préféré ~45 % ; reco cabinet : 49-59 € + palier premium [p.23-25, 33-34, 40].
- Gain minimal attendu : 30-45 min/jour ; > 80 consult/semaine = early adopters [p.27].
- Fiabilité : littérature ~58 % de CR acceptés sans modification ; Whisper 1,4 % hallucinations (40 % potentiellement dommageables) ; gain ~15 % du temps de documentation [p.21].
- Aucun croisement significatif au khi² → tendances seulement [p.5, 31].

**Étude de marché Via Domitia (juin 2026)**
- Monde scribe médical ~1,5 Md$ 2025 → ~5 Md$ 2030 (~27 %/an ; fourchette sources 0,8-3,8 Md$) ; US 397 M$ 2024 → 2,96 Md$ 2033 (CAGR 25,09 %) [p.5, 17, 20].
- France : TAM 237 200 médecins ; 129 000 à activité libérale ; **SAM 103 000** (80 % équipés logiciel) ; scénarios 2030 à 69 €/mois : 10 % → 8,5 M€ ; **18 % → 15,3 M€** ; 25 % → 21,3 M€ ; à 99 €/139 € : 22 / 31 M€ [p.18-19, 40].
- Kaiser Permanente : 7 260 médecins, 2,5 M consultations en 15 mois ; JAMA 2026 : ~16 min gagnées / 8 h de consultation vs « 5 min/consult » Microsoft [p.5-6].
- Marges IA 50-60 % vs SaaS 80-90 % ; secrétariat ≈ 600 €/mois comme référence de valeur [p.6, 73, 76].
- Prix observés : Nabla 69 €/mois FR (119 $ US) ; Freed 39/79/104-119 $ ; Doctolib assistant téléphonique 99 € TTC, assistant de consultation non tarifé ; Abridge ≈ 600-800 $/mois ; Dragon Copilot ≈ 600 $/mois ; AWS HealthScribe 0,10 $/min [p.72-73].
- Levées : Abridge 250 M$ (début 2025), Nabla total 120 M$ (70 M$ en 2025), Ambience et Suki 70 M$ chacun ; Abridge ~100 M$ ARR ; Nabla 85 000 cliniciens / 130+ organisations (surtout US) ; Weda 23 000 pros (Nabla intégré) ; Heidi 2 M consultations/semaine, 116 pays [p.27, 49-50, 75].
- Tandem Health : premier scribe européen DM classe IIa (mai 2026) ; AI Act haut risque : 2 déc. 2027 (annexe III) / 2 août 2028 (annexe I) ; EHDS en vigueur 26/03/2025, application 26/03/2027, jalons 2029/2031 [p.5, 52, 81].
- Souveraineté : Doctolib sur AWS, Tandem sur Azure, Nabla sur GCP (Cloud Act) → hébergeur souverain (OVH, Scaleway, Outscale) = angle mort différenciant [p.52].
- Espace stratégique non occupé : conformité souveraine + ancrage écosystème FR + accompagnement terrain [p.57] ; cibles recommandées : généralistes libéraux, cabinets de groupe, téléconsultation [p.8].

**Enquête nationale Hub France IA (n = 1 097, fév.-mai 2025, janv. 2026)**
- 88 % utilisateurs / 12 % fournisseurs ; 60,9 % libéraux ; 43,5 % professions médicales [p.23-24].
- Utilisateurs : garanties qui encouragent l'adoption = démonstration pratique 64 %, exemples concrets 63 %, accompagnement 60 %, conformité 56 %, analyse économique 38 % (n = 934) [p.45] ; obstacles = sécurité données 62 %, fiabilité 57 %, absence de régulation claire 50 %, compétences 47 %, coûts/intégration 41 % (n = 941) [p.47] ; domaine n° 1 d'usage = aide administrative et documents 51 % (n = 779) [p.44] ; bénéfice constaté n° 1 = productivité 62 % (n = 790) [p.46].
- Fournisseurs (n ≈ 131) : difficultés = financement 60 %, accès marché 56 %, réglementation 52 %, données 51 %, concurrence 11 % [p.37] ; leviers marketing = partenariat/co-développement 58 %, essais gratuits/démos 53 %, accompagnement 47 %, garantie de performance 41 % [p.36] ; freins réglementaires = temps de certification 65 %, coût de conformité 61 % [p.41].
- Réglementaire : art. L.4001-3 CSP (information patient, explicabilité) ; directive 2024/2853 produits défectueux (transposition avant 09/12/2026, présomption de défectuosité si pas de journalisation) ; AI Act art. 13/14/50 [p.53-56].
