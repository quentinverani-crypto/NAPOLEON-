# Mission · Vision · Valeurs — Napoléon (V1 — 16/09/2025)

> **Objet** : version de travail, courte et actionnable, destinée au deck d’incubation et aux documents internes.  
> **Périmètre** : spécialités ciblées en lancement (radiologie ou ORL), France.

---

## Mission

**Rendre au spécialiste au moins 45 minutes par jour** en transformant une simple dictée en **compte‑rendu structuré, ordonnance et documents patients prêts** en **≤ 60 s**, avec **validation médicale obligatoire**, **traçabilité vérifiable** et **sécurité HDS**.

*Formulation alternative (radiologie d’abord)* :  
**Rendre 45 minutes/jour aux radiologues** en générant automatiquement **CR structuré + ordonnance + documents patients** en **≤ 60 s**, validés et **traçables** de bout en bout.

---

## Vision (3–5 ans)

Devenir **la couche standard du texte clinique** en Europe : à chaque fois qu’un médecin parle, **le dossier se construit** (CR, prescriptions, documents patients), **les accès sont prouvés** et **l’audit est portable**, au‑delà de la simple reconnaissance vocale.

---

## Valeurs (et preuves opérationnelles)

### 1) Sûreté par design
- **Principe** : protection des données par défaut (RGPD, HDS, pseudonymisation, chiffrement E2E, minimisation).
- **Comportements** : aucun document exploitable sans validation explicite ; secrets rotationnés ; journaux non contenant de PII.
- **Preuves** : rapports sécurité trimestriels ; DPIA/registre RGPD à jour ; pentests réguliers ; métriques de conformité publiées.

### 2) Vérité mesurée
- **Principe** : on publie ce qui compte vraiment pour le soin.
- **Comportements** : suivi continu de la **latence P95**, **% de documents sans retouche**, **minutes rendues/jour**, **WER** sur corpus FR médical.
- **Preuves** : tableau de bord client + étude avant/après 30 jours, signée par les pilotes.

### 3) Validation clinique obligatoire
- **Principe** : la responsabilité reste médicale.
- **Comportements** : flux “proposition → relecture → validation” ; aucun envoi (MSSanté/DMP) sans validation ; signature CPS/e‑CPS lorsque pertinent.
- **Preuves** : horodatage, identité du validateur et hash du document dans l’audit.

### 4) Sobriété cognitive
- **Principe** : chaque clic doit rendre du temps au soin.
- **Comportements** : **≤ 3 actions** pour produire CR + ordonnance + doc patient ; modèles par spécialité ; UI sans friction.
- **Preuves** : mesures de temps de parcours et de clics, revues mensuelles d’UX.

### 5) Traçabilité indépendante (blockchain)
- **Principe** : la preuve ne dépend pas de nous seuls.
- **Comportements** : journal immuable (hash + horodatage) ; délégations d’accès limitées dans le temps ; **preuve portable** exportable et vérifiable hors plateforme.
- **Preuves** : exports d’audit standard lisibles ; vérification tierce possible ; alertes d’accès anormaux.

### 6) Interop ouverte
- **Principe** : s’insérer dans l’existant plutôt que le remplacer.
- **Comportements** : intégrations **MSSanté**, **DMP**, **CI‑SIS/Ségur**, connecteurs LPS (libéral & hôpital).
- **Preuves** : matrice publique d’intégrations et de niveaux de support ; roadmaps codifiées.

### 7) Utilité en contexte réel
- **Principe** : terrain > labo.
- **Comportements** : tolérance au **bruit** ; **mode dégradé hors‑ligne** (capture locale chiffrée et synchronisation différée) ; multilingue patient.
- **Preuves** : tests terrain (salles bruyantes, réseau faible) avec résultats publiés.

---

## Engagements mesurables (cibles à 12 mois)

- **Latence P95** : ≤ **60 s** (objectif “wow” : **≤ 30 s**).  
- **Documents sans retouche** : ≥ **70 %** sur les gabarits ciblés.  
- **Temps rendu** : ≥ **45 min/jour** en moyenne par praticien sur 20 consultations/jour.  
- **Sécurité & conformité** : HDS en production ; DPIA/registre RGPD complets ; 0 PII en clair dans les logs ; temps moyen de remédiation < 72 h.  
- **Interop** : envoi **MSSanté** et publication **DMP** opérationnels ; **≥ 2 LPS majeurs** en pilote.  
- **Traçabilité** : **preuve portable** (export audit hashé/horodaté) disponible pour les établissements pilotes.  
- **Éthique** : bouton “justifier” sur les auto‑remplissages sensibles, avec note d’explicabilité.

---

## Annexe — Périmètre MVP (8 semaines, 5 fonctionnalités)

1. **ASR FR médical** + nettoyage contextuel (ponctuation, entités, abréviations).  
2. **CR structuré** à partir de la dictée (gabarits par spécialité).  
3. **Ordonnance automatique** détectée depuis le CR (“introduis paracétamol…” → ordonnance prête).  
4. **Documents patients** en langage clair (FR, option multilingue).  
5. **Validation obligatoire** + **export d’audit** (hash + horodatage ; preuve portable).

> **Lignes rouges** : pas d’envoi externe sans validation ; pas d’entraînement sur données patients sans base légale claire ; pas de PII en clair, jamais.

---

*Prochaine itération* : fixer le **persona de lancement** (radiologie ou ORL), verrouiller **3 métriques publiques** (latence, % sans retouche, minutes rendues) et intégrer les **chiffres pilotes** dès qu’ils sont disponibles.
