// Workflow réutilisable : analyse d'études / rapports (PDF) pour NAPOLEON MEDICAL.
// À lancer avec l'outil Workflow, args = {
//   scratch: "<dossier de travail absolu>",
//   context: "<chemin du brief contexte_napoleon.md>",
//   docs: [ { key: "MARCHE", label: "…", pdf: "…pdf", txt: "…txt", chunks: [[1,19],[20,38]] }, … ],
//   lenses: optionnel, liste {key,title,focus} ; par défaut commercial / marketing / financeurs / contradicteur
// }
export const meta = {
  name: 'napoleon-analyse-etudes',
  description: 'Lire des études (PDF), synthétiser par document, analyser par angle (commercial, marketing, financeurs, contradicteur), vérifier les chiffres, critiquer la complétude',
  phases: [
    { title: 'Extraction', detail: 'un lecteur par tranche de pages' },
    { title: 'Synthèse par document', detail: 'une synthèse consolidée par document' },
    { title: 'Analyse par angle', detail: 'commercial, marketing, financeurs, contradicteur' },
    { title: 'Vérification', detail: 'chiffres et surinterprétations, 2 vérificateurs par angle' },
    { title: 'Complétude', detail: 'ce qui manque' },
  ],
}

const S = args.scratch
const CTX = args.context
const DOCS = args.docs
const pad = n => String(n).padStart(3, '0')

const EXTRACT_SCHEMA = {
  type: 'object',
  properties: {
    doc: { type: 'string' }, pages: { type: 'string' },
    section_titles: { type: 'array', items: { type: 'string' } },
    methodology_notes: { type: 'string' },
    findings: { type: 'array', items: { type: 'object', properties: {
      page: { type: 'integer' }, claim: { type: 'string' }, figures: { type: 'string' }, verbatim: { type: 'string' },
      categories: { type: 'array', items: { type: 'string', enum: ['commercial', 'marketing', 'financeurs', 'beta', 'concurrence', 'reglementaire', 'contexte'] } },
      relevance_napoleon: { type: 'integer', minimum: 1, maximum: 5 }, why_relevant: { type: 'string' },
      solidity: { type: 'string', enum: ['mesure_primaire', 'source_secondaire_citee', 'estimation_cabinet', 'opinion', 'inconnue'] },
      caveat: { type: 'string' },
    }, required: ['page', 'claim', 'categories', 'relevance_napoleon', 'why_relevant', 'solidity'] } },
  },
  required: ['doc', 'pages', 'section_titles', 'methodology_notes', 'findings'],
}

function extractPrompt(doc, [a, b]) {
  const chunkFile = `${S}/chunks/${doc.key}_p${pad(a)}-${pad(b)}.txt`
  return `Tu es un analyste senior en stratégie santé numérique. Tu lis une tranche d'un document pour en extraire TOUT ce qui peut servir à la startup NAPOLEON MEDICAL.
Lis d'abord le brief : ${CTX}
Document : ${doc.label}. Tranche : pages ${a} à ${b}.
1) Lis intégralement le texte extrait : ${chunkFile} (marqueurs "======== PAGE n / N ========").
2) Regarde AUSSI les pages dans le PDF ${doc.pdf} avec l'outil Read et pages="${a}-${b}" (20 pages max par appel) : graphiques et tableaux contiennent parfois des chiffres absents du texte. Si le Read échoue, continue avec le texte seul et dis-le dans methodology_notes.
Extrais de façon EXHAUSTIVE (25 à 60 findings pour une tranche dense) : chaque constat chiffré avec sa base (n=, %, €, horizon, source citée) ; chaque recommandation des auteurs ; chaque élément concurrence (noms, prix, positionnement, levées) ; chaque élément réglementaire ; freins, attentes, objections, critères de confiance ; verbatims réutilisables ; limites méthodologiques.
Pour chaque finding : page exacte, catégories, pertinence Napoleon 1-5, solidité, réserve. Recopie les chiffres tels quels. Ne déduis rien qui n'est pas dans la tranche. Français.`
}

const SYNTH_SCHEMA = {
  type: 'object',
  properties: {
    doc: { type: 'string' }, one_paragraph: { type: 'string' }, methodology_and_limits: { type: 'string' },
    key_facts: { type: 'array', items: { type: 'object', properties: { fact: { type: 'string' }, ref: { type: 'string' }, solidity: { type: 'string' }, use_for: { type: 'array', items: { type: 'string' } } }, required: ['fact', 'ref', 'solidity', 'use_for'] } },
    recommendations_of_authors: { type: 'array', items: { type: 'object', properties: { reco: { type: 'string' }, ref: { type: 'string' } }, required: ['reco', 'ref'] } },
    competitors: { type: 'array', items: { type: 'object', properties: { name: { type: 'string' }, what: { type: 'string' }, ref: { type: 'string' } }, required: ['name', 'what', 'ref'] } },
    verbatims: { type: 'array', items: { type: 'object', properties: { text: { type: 'string' }, who: { type: 'string' }, ref: { type: 'string' } }, required: ['text', 'ref'] } },
    tensions_with_napoleon: { type: 'array', items: { type: 'object', properties: { tension: { type: 'string' }, ref: { type: 'string' } }, required: ['tension', 'ref'] } },
    output_file: { type: 'string' },
  },
  required: ['doc', 'one_paragraph', 'methodology_and_limits', 'key_facts', 'recommendations_of_authors', 'competitors', 'verbatims', 'tensions_with_napoleon', 'output_file'],
}

function synthPrompt(doc, chunkResults) {
  const outFile = `${S}/out/synthese_${doc.key}.md`
  return `Tu consolides les extractions de plusieurs lecteurs sur UN document, pour NAPOLEON MEDICAL. Brief : ${CTX}
Document : ${doc.label}. Texte intégral pour vérifier : ${doc.txt} (pages séparées par \\f). PDF : ${doc.pdf}.
Extractions (JSON) : ${JSON.stringify(chunkResults, null, 1)}
Travail : 1) déduplique et consolide (40 à 80 key_facts, chacun avec [${doc.key} p.N], solidité, usage) ; 2) recommandations des auteurs ; 3) concurrents cités ; 4) verbatims ; 5) tensions avec le positionnement / prix / hypothèses Napoleon ; 6) vérifie dans le texte intégral toute extraction douteuse ; 7) écris une synthèse complète en markdown (français, tableaux, références de page) dans ${outFile} et renvoie son chemin dans output_file.`
}

const DEFAULT_LENSES = [
  { key: 'commercial', title: 'Commercial & go-to-market (bêta incluse)', focus: `Segment d'entrée ; cibles bêta et première vente ; conditions d'adoption ; argumentaire chiffré ; objections et réponses ; logique tarifaire vs prix actuels et concurrents ; canaux et prescripteurs ; ce que la bêta doit mesurer et prouver ; pitch d'une minute ; questions de découverte.` },
  { key: 'marketing', title: 'Marketing, positionnement & messages', focus: `Positionnement face à la confusion dictée / assistant ; messages hiérarchisés et chiffrés ; preuves à afficher ; pédagogie ; personas ; craintes à désamorcer ; ton ; canaux ; contenus ; cohérence avec le site actuel ; ce qu'il ne faut PAS dire.` },
  { key: 'financeurs', title: 'Financeurs & levée de fonds', focus: `TAM/SAM/SOM, horizons, CAGR, solidité ; moteurs ; preuves de besoin ; disposition à payer ; concurrence et migration de la valeur ; risques investisseurs et réponses ; comparables et levées ; 10-15 chiffres slide-ready sourcés ; structure du pitch et du dossier Bpifrance/Région ; traction à produire en bêta.` },
  { key: 'contradicteur', title: 'Contradicteur : ce que les études fragilisent', focus: `Investisseur sceptique et DSI méfiant : tout ce qui contredit le positionnement, les prix, le persona, les KPI annoncés, le plan de financement ; faiblesses méthodologiques des études ; chiffres imprudents à citer ; contradictions entre documents ; parade pour chaque point.` },
]
const LENSES = args.lenses || DEFAULT_LENSES

function lensPrompt(lens, syntheses) {
  const outFile = `${S}/out/angle_${lens.key}.md`
  return `Consultant senior go-to-market santé numérique mandaté par NAPOLEON MEDICAL. Angle : ${lens.title}.
Brief : ${CTX}
Synthèses (lis les fichiers en entier) : ${syntheses.map(s => `- ${s.doc} : ${s.output_file}`).join('\n')}
Résumé JSON : ${JSON.stringify(syntheses.map(s => ({ doc: s.doc, one_paragraph: s.one_paragraph, methodology_and_limits: s.methodology_and_limits, tensions_with_napoleon: s.tensions_with_napoleon })), null, 1)}
Textes intégraux (grep -n pour vérifier chaque chiffre) : ${DOCS.map(d => `${d.key} = ${d.txt}`).join(' ; ')}.
Attendu : ${lens.focus}
Exigences : 5 à 8 enseignements prioritaires d'abord ; chaque chiffre avec [DOC p.N] et sa fragilité ; séparer « ce que disent les études » / « ce que nous en concluons » ; concret et actionnable ; aucun chiffre non retrouvé dans les sources ; 1 500 à 3 000 mots.
Écris en markdown, en français, dans ${outFile}. Renvoie le chemin puis un résumé en 10 lignes.`
}

const VERIF_SCHEMA = {
  type: 'object',
  properties: {
    lens: { type: 'string' }, checked_count: { type: 'integer' },
    issues: { type: 'array', items: { type: 'object', properties: {
      quote: { type: 'string' }, problem: { type: 'string', enum: ['chiffre_faux', 'page_fausse', 'non_trouve_dans_les_sources', 'surinterpretation', 'contexte_manquant', 'contradiction_interne'] },
      evidence: { type: 'string' }, fix: { type: 'string' }, severity: { type: 'string', enum: ['bloquant', 'important', 'mineur'] },
    }, required: ['quote', 'problem', 'evidence', 'fix', 'severity'] } },
    overall: { type: 'string' },
  },
  required: ['lens', 'checked_count', 'issues', 'overall'],
}

function verifPrompt(lens, mode) {
  const file = `${S}/out/angle_${lens.key}.md`
  const modeText = mode === 'chiffres'
    ? `Mode CHIFFRES : vérifie UN PAR UN chaque nombre, pourcentage, montant, horizon, échantillon et référence de page contre les textes intégraux (grep -n, puis lecture de la page). Toute valeur absente, arrondie de façon trompeuse ou mal attribuée est une issue. Compte les chiffres vérifiés.`
    : `Mode SURINTERPRÉTATION : généralisation d'un panel non représentatif, intention déclarée prise pour un comportement, mélange de bases, chiffres mondiaux présentés comme français, recommandations de cabinet présentées comme des faits, conclusion non appuyée par la source citée. Propose une reformulation défendable devant un investisseur.`
  return `Vérificateur adversarial : par défaut tu cherches à RÉFUTER. Fichier : ${file} (angle « ${lens.title} »). Brief : ${CTX}
Sources : ${DOCS.map(d => `${d.key} = ${d.txt}`).join(' ; ')} ; PDF aux mêmes noms en .pdf.
${modeText}
Pas de fausses issues ; aucune erreur réelle ne doit passer. Français.`
}

const COMPLETE_SCHEMA = {
  type: 'object',
  properties: {
    missing: { type: 'array', items: { type: 'object', properties: { what: { type: 'string' }, ref: { type: 'string' }, why_it_matters: { type: 'string' }, where_to_add: { type: 'string', enum: ['commercial', 'marketing', 'financeurs', 'contradicteur', 'transversal'] } }, required: ['what', 'ref', 'why_it_matters', 'where_to_add'] } },
    cross_doc_insights: { type: 'array', items: { type: 'string' } },
    top_actions_for_beta: { type: 'array', items: { type: 'string' } },
  },
  required: ['missing', 'cross_doc_insights', 'top_actions_for_beta'],
}

log(`Extraction : ${DOCS.reduce((n, d) => n + d.chunks.length, 0)} lecteurs`)
const syntheses = await pipeline(
  DOCS,
  async doc => {
    const chunkResults = await parallel(doc.chunks.map(c => () =>
      agent(extractPrompt(doc, c), { label: `lire:${doc.key} p${c[0]}-${c[1]}`, phase: 'Extraction', schema: EXTRACT_SCHEMA })))
    const ok = chunkResults.filter(Boolean)
    if (ok.length < doc.chunks.length) log(`${doc.key} : ${doc.chunks.length - ok.length} tranche(s) perdue(s)`)
    log(`${doc.key} : ${ok.reduce((n, r) => n + r.findings.length, 0)} findings`)
    return ok
  },
  (chunkResults, doc) => agent(synthPrompt(doc, chunkResults), { label: `synthese:${doc.key}`, phase: 'Synthèse par document', schema: SYNTH_SCHEMA }),
)
const synthOk = syntheses.filter(Boolean)

const lensResults = await pipeline(
  LENSES,
  lens => agent(lensPrompt(lens, synthOk), { label: `angle:${lens.key}`, phase: 'Analyse par angle' }).then(text => ({ lens, text })),
  async (r, lens) => {
    if (!r) return null
    const verifs = await parallel(['chiffres', 'surinterpretation'].map(mode => () =>
      agent(verifPrompt(lens, mode), { label: `verif-${mode}:${lens.key}`, phase: 'Vérification', schema: VERIF_SCHEMA })))
    return { lens: lens.key, summary: r.text, verifs: verifs.filter(Boolean) }
  },
)
const lensOk = lensResults.filter(Boolean)

const completeness = await agent(`Critique de complétude pour NAPOLEON MEDICAL (brief : ${CTX}). Lis les synthèses : ${synthOk.map(s => s.output_file).join(' ; ')} ; les angles : ${LENSES.map(l => `${S}/out/angle_${l.key}.md`).join(' ; ')} ; parcours les textes intégraux : ${DOCS.map(d => `${d.key} = ${d.txt}`).join(' ; ')}.
Qu'est-ce qui est utile à Napoleon et n'apparaît dans AUCUN angle ? Référence [DOC p.N]. Enseignements qui n'émergent qu'en croisant les documents. 10 actions prioritaires pour la bêta. Français.`,
  { label: 'completude', phase: 'Complétude', schema: COMPLETE_SCHEMA })

return { syntheses: synthOk.map(s => ({ doc: s.doc, file: s.output_file, n_facts: s.key_facts.length, tensions: s.tensions_with_napoleon })), lenses: lensOk, completeness }
