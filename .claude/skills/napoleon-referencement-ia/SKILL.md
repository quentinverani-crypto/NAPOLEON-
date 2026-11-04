---
name: napoleon-referencement-ia
description: "Audit et suivi du référencement de NAPOLEON Médical dans les moteurs de réponse IA (ChatGPT, Perplexity, Gemini, Claude, Copilot) : vérification du site live (robots, sitemap, llms.txt, JSON-LD, rendu sans JS), présence externe (presse, LinkedIn, comparatifs, annuaires, avis), prompts de test, plan d'action et kit (fiche d'identité, JSON-LD, message aux comparatifs). À utiliser quand Quentin parle de GEO, AEO, SEO IA, visibilité dans ChatGPT/Perplexity, citations, llms.txt, comparatifs, presse ou LinkedIn."
---

# Référencement IA (GEO/AEO) — NAPOLEON Médical

## Quand l'utiliser
Quentin demande : « comment être mieux cité par ChatGPT / Perplexity », « audit GEO / AEO », « est-ce que les IA parlent de nous », « que faire sur LinkedIn / la presse / les annuaires », « vérifie le site pour les IA », « mets à jour le plan de référencement », ou toute question de visibilité dans les moteurs de réponse IA.

## Avant tout
1. Lire `MEMOIRE_CLAUDE_Napoleon.md` (chargé via CLAUDE.md) et `Audit_Referencement_IA_Napoleon_v1.md` (dernier état + plan A/B/C + kit).
2. Le site en production **n'est pas** le code de ce dépôt (export statique « Claude Design », projet Vercel `napoleon_medical_site_vitrine`). Toute modification on-site se fait sur cette source, pas ici.
3. Pour un audit formel reproductible (captures hash-pinées, research pack), préférer les compétences du plugin `seo-aeo-geo-ultimate` : `ai-search-research` → `seo-geo` / `seo-aeo` → `ai-visibility-monitor`. Cette compétence-ci est la version rapide et opérationnelle.

## Procédure rapide (≈ 15 min)
1. **Site** : exécuter `bash .claude/skills/napoleon-referencement-ia/scripts/check_site.sh` (sortie dans le scratchpad). Il vérifie robots.txt, sitemap.xml, llms.txt, puis pour chaque URL du sitemap : code HTTP, titre, canonical, robots meta, H1, types JSON-LD, liens sociaux, nombre de mots uniques, pages légales crawlables ou non.
2. **Index** : rechercher `"NAPOLEON Médical"`, `napoleonmedical.fr`, `"Quentin Verani" Napoleon`, `"Laury Monge"` ; noter si le snippet est l'ancien site (« voix médicale souveraine », « blockchain », « 250 pionniers ») → index périmé.
3. **Présence externe** : rechercher les comparatifs « meilleur assistant IA consultation médicale France », « dictée médicale IA gratuite », « alternatives Nabla », et vérifier si NAPOLEON y figure ; vérifier presse médicale (What's Up Doc, LQDM, Egora, Medscape FR, TICsanté/DSIH, mind Health), presse locale (L'Indépendant, Made in Perpignan), startup (Maddyness, ActuIA tag Perpignan), avis (Capterra, GetApp, Appvizer, G2, Trustpilot), LinkedIn, YouTube, Wikidata, Pappers.
4. **Mesure** : faire exécuter par Quentin les 10 prompts fixes (§ 6 de l'audit) sur 6 moteurs ; consigner mention / citation / exactitude / sources citées. Les sources citées deviennent la liste de cibles du mois suivant.
5. **Mettre à jour** `Audit_Referencement_IA_Napoleon_v1.md` (ou créer une v2 datée) et `MEMOIRE_CLAUDE_Napoleon.md`.

## Règles
- Ne jamais inventer une mention, une citation ou un résultat de moteur : tout constat est daté et sourcé (URL ou capture).
- Pas de score universel, pas de promesse de placement, pas de causalité (« tel changement a provoqué telle citation ») sans observation répétée.
- Pas de faux avis, de comptes multiples, de liens achetés, de spam de forums.
- **Cohérence d'entité avant tout** : la fiche d'identité canonique (§ 5.1 de l'audit) se copie mot pour mot sur tous les supports (site, llms.txt, LinkedIn, Pappers, annuaires, communiqués).
- Les limites réseau de la session (proxy) sont indiquées comme « à vérifier », jamais passées sous silence.

## Points de vigilance connus (2026-11-04)
- Mentions légales en `?page=` : invisibles des crawlers → vraies URL à créer.
- Organization sans `sameAs` / adresse / `legalName` ; pas de `Person` détaillé ; articles signés par l'organisation.
- Hébergeur HDS non nommé ; témoignages prénoms seuls ; /a-propos mince ; spécialité de Quentin incohérente entre site (ORL) et un annuaire tiers (généraliste).
- Anciens déploiements Vercel `napoleon-six.vercel.app` et `napoleon-site-vitrine-3.vercel.app` sans redirection.
- Zéro mention externe ; index Google/Bing périmé.

## Journal des sessions
- **2026-11-04** — Audit initial complet, plan A/B/C, kit, protocole de mesure. Décisions de Quentin : en attente.
