# Audit « référencement IA » (GEO / AEO) — NAPOLEON Médical — v1

> **Date** : 4 novembre 2026 · **Périmètre** : www.napoleonmedical.fr (site live, redéployé le 04/11/2026 à 22:40 UTC) et présence externe de la marque.
> **Objectif** : être le mieux cité possible dans les moteurs de réponse IA (ChatGPT avec recherche, Perplexity, Gemini / AI Overviews, Claude, Copilot).
> **Statut** : audit + plan d'action. Rien n'a été modifié sur le site live.

---

## 0. Verdict en cinq points

1. **Le site est déjà bien équipé pour les IA (≈ 80 % de la base technique est faite).** Bots IA explicitement autorisés dans robots.txt, sitemap de 15 URL, `llms.txt` complet, JSON-LD présents (Organization, WebSite, SoftwareApplication avec 3 offres, FAQPage de 28 questions, 3 Article datés avec BreadcrumbList, CollectionPage), une page HTML statique par URL avec titre, description, canonical et H1 propres. Ne pas refaire ce travail.
2. **Le vrai frein est hors site : NAPOLEON Médical n'existe nulle part ailleurs sur le web.** Aucune mention indépendante trouvée : pas de presse, pas de comparatif, pas d'annuaire, pas de page LinkedIn indexée, pas d'avis. Or les moteurs IA répondent aux questions « quel assistant IA de consultation… » en citant des comparatifs et blogs tiers. Dans tous ceux identifiés, Nabla, Doctolib, Heidi, Loquii, Dragon, Scribe Médical apparaissent ; NAPOLEON jamais.
3. **L'index des moteurs classiques est périmé.** Google et Bing affichent encore l'ancien site (« La voix médicale souveraine », « 250 médecins pionniers », « blockchain »). Les IA qui s'appuient sur ces index décrivent un produit qui n'est plus le vôtre et avec un positionnement contradictoire.
4. **L'entité est peu vérifiable.** Mentions légales non crawlables (SIREN, adresse, directeur de publication invisibles), aucun réseau social relié, hébergeur HDS non nommé, fondateurs sans profil public relié au site, témoignages avec prénoms seuls, deux anciens déploiements Vercel potentiellement encore en ligne.
5. **Ordre des priorités** : (1) purger l'index et aligner une description unique partout ; (2) obtenir 5 à 10 mentions tierces en 30 jours (comparatifs, presse médicale, LinkedIn, annuaires, avis) ; (3) rendre l'entité vérifiable (mentions légales, schema `sameAs`, hébergeur nommé, témoignages nominatifs).

---

## 1. Méthode et limites

**Vérifié le 04/11/2026** : HTML brut de l'accueil et de 15 sous-pages récupérés avec un user-agent de bot IA (GPTBot / PerplexityBot), robots.txt, sitemap.xml, llms.txt, en-têtes HTTP, JSON-LD, liens sortants, images OG, page 404, redirections d'anciens chemins, configuration des domaines Vercel, recherches web sur la marque, les fondateurs, les concurrents et les comparatifs cités par les IA.

**Non vérifiable depuis cette session (proxy réseau)** : linkedin.com, pappers.fr, bing.com, duckduckgo.com, l'API recherche-entreprises.api.gouv.fr, les domaines `*.vercel.app`, comparescribes.com et markus-sante.com. Les points qui en dépendent sont marqués « à vérifier ».

**Aucun test en direct dans ChatGPT, Perplexity ou Gemini n'a été réalisé** (pas d'accès). Le protocole du § 6 est à exécuter par Quentin pour établir la base de référence. Aucune promesse de résultat : un moteur IA n'est jamais garanti de citer une source, on maximise les chances.

---

## 2. État des lieux détaillé

### 2.1 Site : ce qui est déjà bon (à conserver)

| Élément | Constat |
|---|---|
| robots.txt | GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, anthropic-ai, Claude-Web, PerplexityBot, Google-Extended, Bingbot, Applebot(-Extended), DuckAssistBot, CCBot, meta-externalagent : tous `Allow: /`, `/api/` interdit, sitemap déclaré. |
| sitemap.xml | 15 URL, `lastmod` renseigné. |
| llms.txt | Description, fondateurs, usages, tarifs datés (octobre 2026), sécurité, liste des pages et ressources. Très bon. |
| Rendu | Une page HTML statique par route (générée par `scripts/build-routes.py`) : titre, description, canonical, `robots` meta et H1 spécifiques, texte lisible sans JavaScript. Les bots IA (qui n'exécutent pas le JS) voient le contenu. |
| JSON-LD accueil | Organization (2 fondateurs), WebSite, SoftwareApplication avec 3 Offer (0 €, 39 €, 59 € HT/mois). |
| JSON-LD /faq | FAQPage, 28 couples Question/Answer, réponses courtes et factuelles : format idéal pour l'extraction par les IA. |
| JSON-LD /tarifs | SoftwareApplication + Offer + UnitPriceSpecification. |
| JSON-LD /ressources | CollectionPage + 3 Article (datePublished 12/03, 04/06, 17/09/2026) + BreadcrumbList sur les articles. |
| Contenu | Pages claires, chiffres (100+ professionnels, 2000+ consultations, < 5 % de corrections), FAQ honnête (« pas encore d'intégration aux logiciels métier »), article HDS de qualité avec références légales. |
| Technique | HTTPS + HSTS, apex `napoleonmedical.fr` → 301 vers www (config Vercel), 404 réel sur URL inconnue, `/beta` → 308 vers `/programme-fondateurs`, OG image et logo accessibles, pages de conversion en `noindex`. |

### 2.2 Site : manques, classés par impact sur les IA

| # | Manque | Pourquoi ça compte | Effort |
|---|---|---|---|
| S1 | **Mentions légales, CGV, confidentialité servies en `?page=…`** : même HTML que l'accueil, canonical vers l'accueil. `/mentions-legales` renvoie 404. SIREN, forme juridique, siège, directeur de publication, hébergeur sont invisibles des crawlers. | Les IA et Google vérifient l'existence juridique d'un éditeur santé. C'est la première preuve « d'entité réelle ». | 1 h |
| S2 | **Organization sans `sameAs`, `address`, `legalName`, `foundingDate`, `telephone`** ; fondateurs = simples noms sans `Person` détaillé ni lien externe. | Le `sameAs` relie le site à LinkedIn, Pappers, YouTube… et permet aux moteurs de fusionner toutes vos traces en une seule entité. | 1 h |
| S3 | **Aucun lien vers un réseau social** sur tout le site (0 occurrence de linkedin/instagram/x/youtube). L'ancien site avait des liens vides (`https://linkedin.com`). | Sans profils publics reliés, pas de graphe d'entité, pas de signal de vie. | 30 min + création des comptes |
| S4 | **Hébergeur HDS non nommé** (« infrastructures certifiées HDS ») alors que votre propre article dit : « attendez des noms, des lieux et des durées ». | Les IA reformulent ce qui est précis. « Hébergé chez X, certifié HDS, serveurs à Y » sera repris ; « conforme » ne le sera pas. | 30 min |
| S5 | **/a-propos très mince (≈ 800 caractères)** : pas de parcours, pas de diplôme, pas de lieu, pas de date de création, pas de photo nommée, pas de `Person`. Un annuaire tiers présente par ailleurs Quentin comme « médecin généraliste » alors que le site dit « médecin ORL ». | E-E-A-T : les IA citent plus volontiers un médecin identifiable. L'incohérence de spécialité entre sources nuit à la fusion d'entité. | 2 h |
| S6 | **Témoignages avec prénoms seuls** (Claire, Thomas, Paul…). | Invérifiables, donc non repris par les IA, et perçus comme faibles. 3 témoignages « Dr Nom, spécialité, ville » avec accord valent plus que 7 prénoms. | Dépend des accords |
| S7 | **Articles signés « L'équipe NAPOLEON Médical »** (`author` = Organization). | Signer par Quentin (médecin) avec `Person` + `sameAs` augmente la crédibilité des contenus santé. | 30 min |
| S8 | **Pas de bloc « fiche d'identité » factuel** (qui, quoi, où, depuis quand, combien) sur l'accueil et /a-propos. | Les IA extraient des paragraphes autonomes et factuels. Un paragraphe canonique répété partout fixe la description que les IA retiendront. | 1 h |
| S9 | **Pas de pages de comparaison ni « alternatives »** (NAPOLEON vs Nabla / Doctolib / Dragon / Heidi) ni de pages par spécialité. | Les requêtes IA les plus fréquentes sont « meilleur … », « alternative à … », « … pour ORL ». Sans page dédiée, impossible d'être cité. | 1 j par page |
| S10 | **Index périmé** : les moteurs affichent encore l'ancien titre et l'ancien positionnement (blockchain, 250 pionniers). | Les réponses IA héritent de l'index. | 1 h (GSC + Bing) |
| S11 | **Deux anciens déploiements Vercel sans redirection** : `napoleon-six.vercel.app` (projet « napoleon ») et `napoleon-site-vitrine-3.vercel.app`. Le troisième (`napoleonmedicalsitevitrine.vercel.app`) redirige déjà vers www. **À vérifier** : s'ils servent encore l'ancien site sans `noindex`, ils entretiennent la confusion d'entité et le contenu dupliqué. | Contenu contradictoire crawlable. | 15 min |
| S12 | Détails : `/essai-gratuit` (noindex) laisse fuir des gabarits `{{ … }}` ; pas de flux RSS pour /ressources ; pas de `dateModified` visible sur /tarifs et /securite-donnees ; pas de `llms-full.txt` (optionnel, non obligatoire). | Mineur. | 1 h |

### 2.3 Présence externe (le point bloquant)

| Canal | Constat au 04/11/2026 |
|---|---|
| Presse (médicale, locale, startup) | Aucun article. Pas de trace dans Maddyness, ActuIA, Health20, listes de startups santé, L'Indépendant, etc. |
| Comparatifs et listes cités par les IA | NAPOLEON absent de **tous** : assurup.com (« 6 outils IA… 2026 »), cocowork.fr, markus-sante.com (comparatif Nabla/Heidi/Doctolib/Tandem/Praxy), ethanolle.com (qui publie même une version `.md` de son article), blog-ia.com, comparescribes.com/best/france, medicall.fr, telesecretariat-medical.com, lonasante.com, logicieldrsante.com, get-steno.io, aldebaran.care, sonix.ai (FR), unite.ai (FR). |
| LinkedIn | Aucune page entreprise « NAPOLEON Médical » indexée. Profils fondateurs non vérifiables depuis ici (à faire par Quentin). |
| Registres | Pappers : société **NAPOLEON**, siège **Claira (66)**, Quentin Verani président depuis le **21/01/2026**, capital 1 000 €, activité programmation informatique. Aucun site web ni description produit associés. |
| Références universitaires | idRef / Sudoc : thèse de médecine 2024, Université de Montpellier (toxine botulique et rhinorrhée chronique, dir. César Cartier). Source vérifiable utile pour le `sameAs` du Person. |
| Avis | Rien sur Trustpilot, Capterra, GetApp, G2, Appvizer, Google. |
| Vidéo | Aucune vidéo YouTube trouvée. |
| Wikidata / Wikipédia | Aucune entrée. |
| Communautés | Aucune discussion trouvée (Reddit, forums de médecins). |

### 2.4 Ce que les IA citent aujourd'hui sur votre marché

Pour « meilleur assistant IA de consultation médicale en France », les sources remontées sont des comparatifs de blogs commerciaux et d'éditeurs, qui placent **Nabla** (français, RGPD/HDS via Azure), **Doctolib Assistant** (79 € TTC/mois, intégré à l'écosystème), **Heidi** (australien, offre gratuite), puis Loquii (Equasens), Scribe Médical (indépendant, OVH HDS), Dragon Medical One. L'article de la **MACSF** sur les assistants IA en consultation sert de référence « bonnes pratiques ». Sur « dictée médicale IA gratuite », seul Heidi ressort comme vraiment gratuit : **votre Freemium « dictée illimitée à 0 € » est un angle unique non exploité**, de même que le programme de contribution vocale rémunéré (objectif 20 000 phrases).

---

## 3. Plan d'action priorisé

### A. Cette semaine (0 €, environ une journée de travail)

| # | Action | Détail opérationnel | Résout |
|---|---|---|---|
| A1 | **Purger l'index** | Google Search Console : vérifier la propriété `www.napoleonmedical.fr`, soumettre le sitemap, « Inspection d'URL → Demander l'indexation » pour les 15 URL. Bing Webmaster Tools : importer depuis GSC, soumettre le sitemap, activer **IndexNow** (un appel HTTP après chaque déploiement). Bing alimente ChatGPT search et Copilot ; Google alimente Gemini et AI Overviews. | S10 |
| A2 | **Neutraliser les anciens déploiements** | Dans Vercel, pour `napoleon-six.vercel.app` et `napoleon-site-vitrine-3.vercel.app` : redirection 301 vers `https://www.napoleonmedical.fr/` (comme déjà fait pour le 3e) ou activation de la protection de déploiement, ou suppression des projets. | S11 |
| A3 | **Mentions légales crawlables** | Vraies URL `/mentions-legales`, `/confidentialite`, `/cgv` (index,follow), avec : raison sociale NAPOLEON, forme juridique, SIREN/RCS, siège (Claira), capital, directeur de publication, hébergeur du site (Vercel) et hébergeur des données de santé (nom + certification HDS). Lien dans le pied de page de toutes les pages. | S1 |
| A4 | **Fiche d'identité canonique** | Rédiger un paragraphe unique (modèle § 5.1) et le placer : accueil (section « Qui sommes-nous »), /a-propos, llms.txt, LinkedIn, Pappers, annuaires, communiqués. Ne jamais le reformuler d'un support à l'autre : la cohérence mot à mot est ce qui fixe l'entité dans les IA. | S8 |
| A5 | **Enrichir le JSON-LD** | Organization avec `@id`, `legalName`, `alternateName`, `foundingDate`, `address`, `telephone`, `sameAs` ; `Person` pour chaque fondateur avec `jobTitle`, `alumniOf`, `sameAs` (LinkedIn, idRef) ; `author` des articles → Person Quentin Verani. Modèle § 5.2. | S2, S5, S7 |
| A6 | **Nommer l'hébergeur HDS** | Sur /securite-donnees, /faq et llms.txt : « hébergé chez [nom], hébergeur certifié HDS (périmètre, référence du certificat), centres de données à [ville] ». Lien vers la liste officielle des hébergeurs certifiés sur esante.gouv.fr. | S4 |
| A7 | **LinkedIn** | Créer la page entreprise « NAPOLEON Médical » (description = fiche § 5.1, site, Claira, secteur logiciels santé). Mettre à jour les deux profils fondateurs : titre « Cofondateur NAPOLEON Médical, assistant IA de consultation », expérience reliée à la page, lien vers le site. Ajouter les liens LinkedIn sur le site (pied de page + `sameAs`). | S3 |
| A8 | **Annuaires d'entité** | Pappers / societe.com : vérifier que le site web et l'activité « édition d'un assistant IA de consultation médicale » apparaissent. Google Business Profile (catégorie « Éditeur de logiciels », Claira, site, description § 5.1) : il alimente Gemini et les réponses locales. Bing Places. Crunchbase (fiche gratuite). | S2 |

### B. Dans les 30 jours

| # | Action | Détail |
|---|---|---|
| B1 | **Entrer dans les comparatifs que les IA citent** | Contacter les auteurs des pages listées au § 2.3 avec le kit § 5.3 (fiche produit + capture + prix + HDS + lien). Cibler d'abord les sites éditoriaux indépendants (assurup, cocowork, ethanolle, blog-ia, medicall, comparescribes, telesecretariat-medical, logicieldrsante), ensuite les blogs d'éditeurs. Un seul comparatif cité par Perplexity vaut plus que dix pages sur votre site. |
| B2 | **Plateformes d'avis** | Inscription gratuite Capterra / GetApp / Software Advice (Gartner Digital Markets), Appvizer (francophone), G2. Demander 5 avis à des médecins du Programme Fondateurs. Les IA citent ces fiches pour les requêtes « avis ». |
| B3 | **Témoignages nominatifs** | 3 à 5 « Dr Prénom Nom, spécialité, ville », avec accord écrit et photo. Les placer sur l'accueil et /a-propos. |
| B4 | **Communiqué de presse** | Angles : (1) un médecin ORL de Claira lance un assistant IA de consultation hébergé en France ; (2) dictée médicale IA gratuite et illimitée ; (3) programme de contribution vocale rémunéré, 20 000 phrases, accents et langues maternelles ; (4) 200 places Fondateurs à 39 € HT. Cibles : What's Up Doc, Le Quotidien du Médecin, Egora, Medscape France, TICsanté/DSIH, mind Health, Hospitalia ; L'Indépendant, Made in Perpignan, La Semaine du Roussillon, La Tribune Occitanie, ToulÉco ; Maddyness, ActuIA (qui a un tag « Perpignan »), FrenchWeb. Proposer Quentin comme médecin-expert à interviewer sur « l'IA qui écoute la consultation ». |
| B5 | **Vidéo YouTube** | Démo de 90 s (dictée → compte rendu + ordonnance) + « comment ça marche » 3 min, titres explicites, description = fiche § 5.1, sous-titres. Intégrer sur le site avec `VideoObject`. Gemini et Perplexity citent les transcriptions YouTube. |
| B6 | **Pages comparatives et alternatives** | `/comparatif/napoleon-vs-nabla`, `-vs-doctolib-assistant`, `-vs-dragon-medical-one`, `-vs-heidi` : tableaux factuels, datés, sourcés (prix public, hébergement, gratuité, intégrations, langue), sans dénigrement. Page `/alternatives-assistant-ia-consultation` (« Alternatives françaises hébergées HDS »). |
| B7 | **Pages par spécialité** | `/specialites/medecine-generale`, `/orl`, `/pediatrie`, `/medecine-du-sport` : structure du compte rendu, exemples, témoignage de la spécialité. Correspond aux témoignages déjà présents. |
| B8 | **Écosystème local et institutionnel** | UPVD In Cube, Ad'Occ, Eurobiomed, French Tech locale, URPS Occitanie, CPTS du 66, Ordre des médecins 66 : chaque adhésion ou présentation produit une page tierce qui vous nomme. Si une aide Bpifrance / Région est obtenue, demander la publication officielle. |

### C. Dans les 90 jours

| # | Action | Détail |
|---|---|---|
| C1 | **Rythme éditorial** | 2 articles par mois dans /ressources, datés, signés Dr Quentin Verani, sur les questions réelles des médecins (consentement, DMP, secrétariat, téléconsultation, codage des actes, POSOS, micro-cravate…). Mettre à jour `dateModified`. |
| C2 | **Page Presse / kit média** | Logo, photos des fondateurs, boilerplate (§ 5.1), chiffres clés, contact presse. Les journalistes et les IA s'en servent. |
| C3 | **Wikidata** | Créer l'élément « NAPOLEON Médical » (instance de : entreprise ; fondateurs ; siège ; site officiel ; date de création) dès que 2 ou 3 sources indépendantes existent (presse, registre). Le Knowledge Graph et plusieurs IA s'y alimentent. |
| C4 | **Communautés** | Reddit (r/medecine) : présentation honnête par le fondateur, réponses aux questions ; forums et groupes de médecins généralistes ; podcasts santé numérique. Jamais de faux avis ni de comptes multiples. |
| C5 | **Mesure mensuelle** | Protocole § 6, base de référence à établir dès maintenant. |

---

## 4. Leviers souvent mis de côté (checklist à cocher)

- [ ] Page LinkedIn entreprise + 2 profils fondateurs reliés, description identique au site.
- [ ] Posts LinkedIn **publics** des fondateurs (les posts publics et les articles LinkedIn sont indexés par Bing et cités par Perplexity ; une newsletter LinkedIn mensuelle « L'IA en consultation » est crawlable).
- [ ] Presse médicale, presse locale (66), presse startup, blogs d'assureurs/mutuelles de médecins (MACSF, Assurup…) et de télésecrétariats qui publient des comparatifs.
- [ ] Fiche Pappers / societe.com / annuaire-entreprises.data.gouv.fr avec site web et description claire.
- [ ] Google Business Profile et Bing Places.
- [ ] Plateformes d'avis logiciels : Capterra, GetApp, Appvizer, G2, Trustpilot (revendiquer la fiche).
- [ ] YouTube (démo, interview fondateur), avec sous-titres.
- [ ] Annuaire de l'Ordre / Doctolib / Maiia / mablouseblanche : spécialité et nom cohérents avec le site (« médecin ORL »).
- [ ] idRef / thèse : lien dans le `sameAs` du Person (preuve académique vérifiable).
- [ ] Guichet national de l'innovation en e-santé (G_NIUS, ANS) et liste des hébergeurs HDS : citer vos références officielles, demander un référencement si éligible.
- [ ] Wikidata (puis Wikipédia seulement après couverture presse suffisante).
- [ ] Product Hunt / AlternativeTo / SaaSHub : fiches « alternative à Nabla / Doctolib Assistant ».
- [ ] Podcasts et webinaires (What's Up Doc, URPS, CPTS) : chaque page d'épisode est une citation.
- [ ] Partenariats visibles : chaque logiciel métier, hébergeur, école ou association qui vous liste sur son site.
- [ ] Contributeurs vocaux : page publique d'avancement du corpus (20 000 phrases) partageable, angle presse.
- [ ] Archiver ou aligner le dépôt GitHub `quentinverani-crypto/napoleon-` (ancienne landing « blockchain ») pour éviter tout redéploiement contradictoire.

---

## 5. Kit prêt à l'emploi

### 5.1 Fiche d'identité canonique (à copier sans modification)

> NAPOLEON Médical est un assistant IA de consultation pour les médecins exerçant en France, édité par la société NAPOLEON, basée à Claira (Pyrénées-Orientales) et immatriculée en janvier 2026, fondée par Quentin Verani, médecin ORL, et Laury Monge, responsable commerciale. Il écoute la consultation ou la dictée du médecin, distingue la voix du médecin et celle du patient, complète le dossier patient et rédige le compte rendu, l'ordonnance et le courrier d'adressage, que le médecin relit et valide ; l'IA ne prend aucune décision médicale. Il fonctionne dans le navigateur, sans installation, depuis des serveurs hébergés en France sur des infrastructures certifiées HDS et conformes au RGPD ; l'audio n'est pas conservé au-delà de la production des documents et aucune consultation ne sert à entraîner un modèle commun. Tarifs (octobre 2026, HT) : Freemium 0 €/mois avec dictée médicale illimitée, Programme Fondateurs 39 €/mois pour les 200 premiers médecins, Praticien 59 €/mois avec 14 jours d'essai. Site : www.napoleonmedical.fr. Contact : contact@napoleonmedical.fr.

Compléter avec le nom de l'hébergeur HDS dès qu'il est public.

### 5.2 JSON-LD Organization enrichi (à adapter : liens réels, SIREN, téléphone si souhaité)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.napoleonmedical.fr/#organization",
      "name": "NAPOLEON Médical",
      "legalName": "NAPOLEON",
      "alternateName": ["Napoléon Médical", "Napoleon Medical"],
      "url": "https://www.napoleonmedical.fr/",
      "logo": "https://www.napoleonmedical.fr/assets/web/logo-napoleon.png",
      "email": "contact@napoleonmedical.fr",
      "foundingDate": "2026-01",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Claira",
        "postalCode": "66530",
        "addressRegion": "Occitanie",
        "addressCountry": "FR"
      },
      "areaServed": "FR",
      "knowsAbout": ["assistant IA de consultation", "dictée médicale", "compte rendu médical", "hébergement HDS", "RGPD santé"],
      "founder": [
        { "@id": "https://www.napoleonmedical.fr/a-propos#quentin-verani" },
        { "@id": "https://www.napoleonmedical.fr/a-propos#laury-monge" }
      ],
      "sameAs": [
        "https://www.linkedin.com/company/<page-entreprise>",
        "https://www.pappers.fr/entreprise/<fiche>",
        "https://www.youtube.com/@<chaine>"
      ]
    },
    {
      "@type": "Person",
      "@id": "https://www.napoleonmedical.fr/a-propos#quentin-verani",
      "name": "Quentin Verani",
      "honorificPrefix": "Dr",
      "jobTitle": "Cofondateur, médecin ORL",
      "worksFor": { "@id": "https://www.napoleonmedical.fr/#organization" },
      "alumniOf": { "@type": "CollegeOrUniversity", "name": "Université de Montpellier" },
      "sameAs": ["https://www.linkedin.com/in/<profil>", "https://www.idref.fr/282384553"]
    },
    {
      "@type": "Person",
      "@id": "https://www.napoleonmedical.fr/a-propos#laury-monge",
      "name": "Laury Monge",
      "jobTitle": "Cofondatrice, responsable commerciale",
      "worksFor": { "@id": "https://www.napoleonmedical.fr/#organization" },
      "sameAs": ["https://www.linkedin.com/in/<profil>"]
    }
  ]
}
```

### 5.3 Comparatifs à contacter et message type

Pages identifiées (toutes citées par les moteurs de recherche sur votre thématique) : assurup.com/blog/articles/medecin-ia · cocowork.fr/meilleurs-outils-ia-medecins · markus-sante.com (comparatif transcription médicale) · ethanolle.com/ia-pour-les-medecins · blog-ia.com/ia-pour-les-medecins · comparescribes.com/best/france · medicall.fr · telesecretariat-medical.com/blog/transcription-ia-medecins · lonasante.com · logicieldrsante.com · sonix.ai/resources/fr · unite.ai/fr · get-steno.io (éditeur) · aldebaran.care (éditeur).

Message type (court, factuel, une pièce jointe) :

> Bonjour, je suis Quentin Verani, médecin ORL et cofondateur de NAPOLEON Médical (Claira, 66). Votre comparatif « … » est l'une des références que les médecins et les assistants IA citent sur la transcription médicale. Nous proposons un assistant IA de consultation hébergé en France sur infrastructure certifiée HDS, avec une dictée médicale gratuite et illimitée (Freemium) et un abonnement à 39 € HT/mois pour les 200 premiers médecins. Fiche produit, captures et accès de test en pièce jointe. Je reste disponible pour une démo de 15 minutes si vous souhaitez l'évaluer vous-même. Site : www.napoleonmedical.fr.

### 5.4 Angles presse

1. Un médecin ORL catalan crée un assistant IA de consultation 100 % hébergé en France.
2. La dictée médicale par IA devient gratuite et illimitée.
3. « Prêtez votre voix » : un corpus de 20 000 phrases médicales, rémunéré, pour que l'IA comprenne tous les accents.
4. Chiffres de terrain : 100+ professionnels, 2000+ consultations, moins de 5 % de corrections (préciser la méthode de mesure).
5. Tribune d'expert : « Que dire au patient quand une IA écoute la consultation ? » (reprend votre article).

---

## 6. Protocole de mesure mensuel (base de référence à créer maintenant)

**Moteurs** : ChatGPT (avec recherche web), Perplexity, Gemini, Claude (recherche web), Copilot / Bing, Google AI Overviews / AI Mode. Session neutre (navigation privée, non connecté si possible), France, français.

**10 requêtes fixes** (ne pas les reformuler d'un mois à l'autre) :

1. Quel assistant IA de consultation médicale est hébergé en France avec un hébergeur certifié HDS ?
2. Meilleur logiciel de dictée médicale par IA gratuit pour un médecin généraliste.
3. Alternatives françaises à Nabla pour la transcription de consultation.
4. Alternative à l'assistant de consultation Doctolib moins chère.
5. Assistant IA qui rédige le compte rendu et l'ordonnance pendant la consultation : prix.
6. NAPOLEON Médical avis.
7. Qu'est-ce que NAPOLEON Médical ?
8. Scribe IA pour ORL en France.
9. Outil qui remplit le dossier patient automatiquement pendant la consultation.
10. Comment informer le patient qu'une IA enregistre la consultation ?

**Grille par cellule (requête × moteur)** : NAPOLEON mentionné (oui/non) · site cité (oui/non) · exactitude des faits (prix, hébergement, fondateurs : correct / partiel / faux) · sources citées (URL) · concurrents cités. Conserver les captures d'écran datées. Les sources citées pour les requêtes 1 à 5 et 8 à 10 sont **la liste des sites où obtenir une mention le mois suivant**.

Pour un audit formel, hash-piné et reproductible, les compétences du plugin `seo-aeo-geo-ultimate` (`ai-search-research` → `seo-geo` / `seo-aeo` → `ai-visibility-monitor`) sont disponibles dans cet environnement.

---

## 7. Sources consultées

- Site live et fichiers : https://www.napoleonmedical.fr/ · /robots.txt · /sitemap.xml · /llms.txt · /faq · /tarifs · /a-propos · /securite-donnees · /ressources/…
- Registre : https://www.pappers.fr/dirigeant/quentin_verani_1995-10 (résumé de recherche, page non ouverte depuis la session)
- Référence académique : https://www.idref.fr/282384553
- Annuaire tiers (spécialité à aligner) : https://www.mablouseblanche.fr/pro/A10102187704/docteur-verani-quentin-medecin
- Comparatifs cités par les moteurs : https://www.assurup.com/blog/articles/medecin-ia · https://cocowork.fr/meilleurs-outils-ia-medecins/ · https://www.markus-sante.com/blog/transcription-medicale-nabla-heidi-doctolib-tandem-praxy · https://ethanolle.com/ia-pour-les-medecins/ · https://blog-ia.com/ia-pour-les-medecins/ · https://comparescribes.com/best/france · https://www.medicall.fr/quel-agenda-medecin-choisir/ · https://telesecretariat-medical.com/blog/transcription-ia-medecins/ · https://www.lonasante.com/nabla/ · https://www.logicieldrsante.com/guides-pratiques/hebergement-hds-ce-que-signifie-vraiment-cette-certification/ · https://www.get-steno.io/blog/dictee-medicale-ia/ · https://aldebaran.care/en/blog/top-5-des-assistants-medicaux-ia-en-france-en-2026 · https://sonix.ai/resources/fr/best-ai-medical-scribes/ · https://www.unite.ai/fr/best-ai-medical-scribes/
- Référence « bonnes pratiques » : https://www.macsf.fr/responsabilite-professionnelle/relation-au-patient-et-deontologie/assistants-ia-consultation-medicale-bonnes-pratiques
- Concurrents : https://loquii.ai/ · https://www.heidihealth.com/fr-fr · https://scribe-medical.app/ · https://www.maddyness.com/2024/10/15/intelligence-artificielle-doctolib-lance-son-assistant-de-consultation/ · https://cancerologie.lequotidiendumedecin.fr/sante-societe/e-sante/quand-lia-vocale-assiste-les-medecins
- Écosystème local : https://my.motherbase.ai/startup/176688-upvd-in-cube · https://www.actuia.com/tag/perpignan/
