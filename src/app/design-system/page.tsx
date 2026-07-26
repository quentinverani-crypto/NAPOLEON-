import type { Metadata } from "next";
import {
  Badge,
  Body,
  Button,
  Callout,
  Caption,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Checkbox,
  Display,
  Divider,
  ELEVATION,
  STATES,
  Emblem,
  Eyebrow,
  Field,
  GoldRule,
  BASELINE,
  IMPERIAL_ANGLE_DEG,
  LabelledDivider,
  Lead,
  Logotype,
  PALETTE,
  Quote,
  RADIUS,
  Select,
  SectionNumber,
  Stat,
  Surface,
  TBody,
  TD,
  TH,
  THead,
  TR,
  TYPE_SCALE,
  Table,
  TextArea,
  TextInput,
  Title,
  type ColorToken,
} from "@/design-system";

export const metadata: Metadata = {
  title: "Design system — NAPOLEON Médical",
  description:
    "Référence vivante de l'identité NAPOLEON Médical : logotype, typographie, palette, composants. Charte graphique 2026.",
};

/* ------------------------------------------------------------------ shell */

function Section({
  n,
  eyebrow,
  title,
  intro,
  children,
  id,
}: {
  n: number;
  eyebrow: string;
  title: string;
  intro?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-3">
        <div className="flex items-center gap-4">
          <SectionNumber value={n} />
          <span className="nm-hairline-gold w-16" aria-hidden="true" />
          <Eyebrow tone="blue">{eyebrow}</Eyebrow>
        </div>
        <Title size="lg" as="h2">
          {title}
        </Title>
        {intro && (
          <Body size="lg" className="max-w-2xl">
            {intro}
          </Body>
        )}
      </div>
      {children}
    </section>
  );
}

function Spec({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <Caption className="nm-eyebrow">{label}</Caption>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ colour */

function Swatch({ c }: { c: ColorToken }) {
  const pass = c.onPaper >= 4.5 ? "AA" : c.onPaper >= 3 ? "AA large" : "décoratif";
  const light = c.onPaper < 2.2;
  return (
    <div className="border-nm-border rounded-nm-md overflow-hidden border">
      <div
        className="flex h-20 items-end justify-end p-2"
        style={{ backgroundColor: c.hex }}
      >
        <span
          className={`font-text nm-nums text-[0.6875rem] font-semibold ${
            light ? "text-nm-ink-soft" : "text-nm-paper/80"
          }`}
        >
          {c.hex}
        </span>
      </div>
      <div className="flex flex-col gap-1 p-3">
        <p className="font-text text-body-sm text-nm-ink font-semibold">{c.name}</p>
        <code className="font-mono text-nm-blue text-[0.6875rem]">{c.token}</code>
        <p className="font-text text-caption text-nm-ink-soft">{c.usage}</p>
        <p className="font-text nm-nums text-[0.6875rem] text-nm-ink-soft">
          {c.onPaper.toFixed(2)}:1 sur blanc — {pass}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------- page */

export default function DesignSystemPage() {
  return (
    <div className="bg-nm-canvas font-text text-nm-ink min-h-screen">
      {/* ---------------------------------------------------------- header */}
      <header className="bg-nm-ink relative overflow-hidden">
        <div
          className="nm-rule-imperial absolute top-[-10%] right-[22%] hidden h-[120%] sm:block"
          aria-hidden="true"
        />
        <div className="mx-auto flex max-w-5xl flex-col gap-8 px-6 py-20">
          <Logotype variant="primary" tone="gold-on-ink" size="lg" />
          <div className="flex flex-col gap-4">
            <Eyebrow tone="inverse">Volume II · Système d&apos;interface · Édition 2026</Eyebrow>
            <Display size="lg" tone="inverse" as="h1">
              Le design system.
            </Display>
            <Lead className="text-nm-ivory/75 max-w-2xl">
              La charte fixe l&apos;identité ; ce document fixe l&apos;interface. Jetons,
              logotype vectoriel, typographie et composants — tout ce qui se code, décidé
              une fois, appliqué partout.
            </Lead>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "Georgia — les grandes écritures",
              "Open Sans — les contenus",
              "Palette charte § 11",
              "Emblème vectoriel",
            ].map((t) => (
              <Badge key={t} tone="gold-inverse" variant="outline">
                {t}
              </Badge>
            ))}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-5xl flex-col gap-24 px-6 py-20">
        {/* ------------------------------------------------------ logotype */}
        <Section
          id="logotype"
          n={1}
          eyebrow="Identité"
          title="Le logotype"
          intro="Deux verrouillages, et deux seulement. Le primaire signe à l'horizontale ; le secondaire s'empile là où il n'y a pas la place d'une ligne. La signature « La voix médicale souveraine » ne fait pas partie du logotype : elle s'écrit dans la mise en page."
        >
          <div className="flex flex-col gap-6">
            <Surface padding="lg" className="flex flex-col gap-10">
              <Spec label="Primaire · emblème + nom">
                <Logotype variant="primary" size="lg" />
                <Caption>
                  La signature de référence. En-têtes, supports commerciaux, signatures
                  e-mail, documents officiels.
                </Caption>
              </Spec>
              <Divider />
              <Spec label="Secondaire · empilé">
                <Logotype variant="secondary" size="lg" />
                <Caption>
                  Formats étroits, carrés, avatars larges — tout ce qui n&apos;a pas la place
                  d&apos;une ligne.
                </Caption>
              </Spec>
            </Surface>

            <div className="grid gap-4 sm:grid-cols-3">
              <Surface tone="ink" border="inverse" padding="lg" className="flex flex-col gap-4">
                <Caption className="nm-eyebrow text-nm-gold">Or sur encre</Caption>
                <Logotype variant="primary" tone="gold-on-ink" size="sm" />
                <Caption className="text-nm-paper/60">Protocolaire — charte § 07.</Caption>
              </Surface>
              <Surface padding="lg" className="flex flex-col gap-4">
                <Caption className="nm-eyebrow">Monochrome</Caption>
                <Logotype variant="primary" tone="mono" size="sm" />
                <Caption>Fax, gravure, tampon, photocopie.</Caption>
              </Surface>
              <Surface tone="ink" border="inverse" padding="lg" className="flex flex-col gap-4">
                <Caption className="nm-eyebrow text-nm-ivory">Négatif</Caption>
                <Logotype variant="primary" tone="negative" size="sm" field="#1A2540" />
                <Caption className="text-nm-paper/60">Fond coloré ou photographique.</Caption>
              </Surface>
            </div>

            <Surface tone="ivory" border="gold" padding="lg" className="flex flex-col gap-3">
              <Caption className="nm-eyebrow">La signature, hors logotype</Caption>
              <p className="font-display text-title-lg text-nm-slate">{BASELINE}</p>
              <Caption>
                Elle se compose dans la page, à distance du verrouillage — jamais accrochée
                sous le nom.
              </Caption>
            </Surface>

            <Callout tone="gold" title="Zone de protection — charte § 10">
              Conserver tout autour du logotype un espace libre égal à <strong>½ × le
              diamètre du cercle</strong>. Aucun texte, image ou élément graphique ne doit y
              pénétrer. Ne jamais recolorer, rogner, déformer, pivoter, ni ajouter d&apos;ombre
              ou de contour.
            </Callout>
          </div>
        </Section>

        {/* ------------------------------------------------------- emblème */}
        <Section
          id="embleme"
          n={2}
          eyebrow="Identité"
          title="L'emblème"
          intro="Reconstruit en vectoriel sur la grille de tracé de la charte : un cercle, trois piliers en stade, une diagonale, une tête de serpent. Net du favicon 16 px à la signalétique."
        >
          <div className="flex flex-col gap-6">
            <Surface padding="lg">
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                {(
                  [
                    ["slate", "Bleu Ardoise", "bg-nm-paper"],
                    ["blue", "Bleu Napoléon", "bg-nm-paper"],
                    ["gold", "Or", "bg-nm-paper"],
                    ["mono", "Monochrome", "bg-nm-paper"],
                    ["gold-on-ink", "Or sur encre", "bg-nm-ink"],
                    ["cream-on-ink", "Crème sur encre", "bg-nm-ink"],
                    ["negative", "Négatif", "bg-nm-blue"],
                    ["slate", "Sur ivoire", "bg-nm-ivory"],
                  ] as const
                ).map(([variant, label, bg], i) => (
                  <div key={`${variant}-${i}`} className="flex flex-col items-center gap-3">
                    <div
                      className={`rounded-nm-md flex aspect-square w-full items-center justify-center ${bg}`}
                    >
                      <Emblem
                        variant={variant}
                        size={72}
                        title={null}
                        field={
                          bg === "bg-nm-ivory"
                            ? "#F3F1EC"
                            : bg === "bg-nm-blue"
                              ? "#5478A8"
                              : undefined
                        }
                      />
                    </div>
                    <Caption className="text-center">{label}</Caption>
                  </div>
                ))}
              </div>
            </Surface>

            <Surface padding="lg" className="flex flex-col gap-6">
              <Spec label="Échelle — le dessin tient à toutes les tailles">
                <div className="flex flex-wrap items-end gap-8">
                  {[16, 24, 32, 48, 64, 96].map((s) => (
                    <div key={s} className="flex flex-col items-center gap-2">
                      <Emblem size={s} title={null} />
                      <Caption className="nm-nums">{s} px</Caption>
                    </div>
                  ))}
                </div>
              </Spec>
              <Callout tone="info" title="Seuil de lisibilité">
                Sous 24 px, le liseré de réserve qui détache la tête des piliers devient
                sous-pixellique et le dessin se referme. Utiliser <code>variant=&quot;mono&quot;</code>{" "}
                en dessous de ce seuil.
              </Callout>
            </Surface>

            <Surface padding="lg" className="flex flex-col gap-4">
              <Caption className="nm-eyebrow">Symbolique — la triade</Caption>
              <div className="grid gap-6 sm:grid-cols-3">
                {[
                  ["Les trois piliers", "Le H ouvert : soutien, hospitalité, hôpital."],
                  ["La tête de serpent", "Héritage du caducée, signe immémorial de la médecine."],
                  [
                    "La diagonale",
                    `Tracée à ${IMPERIAL_ANGLE_DEG}°, elle traverse le cercle : souveraineté, geste impérial.`,
                  ],
                ].map(([t, d]) => (
                  <div key={t} className="flex flex-col gap-1.5">
                    <p className="font-display text-title-sm text-nm-ink">{t}</p>
                    <Caption>{d}</Caption>
                  </div>
                ))}
              </div>
            </Surface>
          </div>
        </Section>

        {/* ---------------------------------------------------- typographie */}
        <Section
          id="typographie"
          n={3}
          eyebrow="Fondations"
          title="Typographie"
          intro="Une seule règle décide de tout : Georgia porte le nom et les grandes écritures, Open Sans porte les contenus. C'est la taille qui tranche, jamais l'importance éditoriale."
        >
          <div className="flex flex-col gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Surface padding="lg" className="flex flex-col gap-3">
                <Caption className="nm-eyebrow text-nm-ink">Georgia · font-display</Caption>
                <p className="font-display text-display-sm text-nm-ink">NAPOLEON Médical</p>
                <Caption>
                  Le nom, les titres, les chiffres-clés, les citations. Serif à grande
                  hauteur d&apos;x — la prestance sans la raideur.
                </Caption>
                <Caption className="text-nm-ink-soft">
                  Secours : Gelasio, substitut libre aux métriques identiques. Aucun
                  décalage de mise en page là où Georgia manque (Android, Linux).
                </Caption>
              </Surface>
              <Surface padding="lg" className="flex flex-col gap-3">
                <Caption className="nm-eyebrow text-nm-ink">Open Sans · font-text</Caption>
                <p className="font-text text-title-lg text-nm-ink">La voix médicale souveraine</p>
                <Caption>
                  Tous les contenus, sans exception : corps, formulaires, tableaux,
                  surtitres, légendes, messages d&apos;erreur.
                </Caption>
                <Caption className="text-nm-ink-soft">
                  Neutre, très lisible en petit corps et en écran partagé — ce que demande
                  une consultation.
                </Caption>
              </Surface>
            </div>

            <Surface padding="none" className="overflow-hidden">
              <div className="divide-nm-border divide-y">
                {TYPE_SCALE.map((t) => (
                  <div
                    key={t.token}
                    className="flex flex-col gap-3 p-6 sm:flex-row sm:items-baseline sm:gap-8"
                  >
                    <div className="flex w-52 shrink-0 flex-col gap-1">
                      <code className="font-mono text-nm-blue text-[0.6875rem]">
                        {t.cls}
                      </code>
                      <Caption className="nm-nums">
                        {t.family} · {t.size}
                      </Caption>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`${t.family === "Georgia" ? "font-display" : "font-text"} ${t.cls} text-nm-ink truncate`}
                      >
                        {t.token === "eyebrow"
                          ? "Document officiel"
                          : "La voix médicale souveraine"}
                      </p>
                      <Caption className="mt-1">{t.usage}</Caption>
                    </div>
                  </div>
                ))}
              </div>
            </Surface>

            <Callout tone="warning" title="Écart assumé avec la charte § 12">
              La charte proposait trois directions typographiques et retenait Newsreader +
              Manrope comme direction de référence (§ 13). La marque a arbitré{" "}
              <strong>Georgia + Open Sans</strong>. Cet arbitrage prévaut, et c&apos;est lui
              qu&apos;implémente ce système. Les pages <code>/vitrine</code>{" "} conservent pour
              l&apos;instant Newsreader + Manrope — leur migration est un chantier distinct.
            </Callout>
          </div>
        </Section>

        {/* --------------------------------------------------------- palette */}
        <Section
          id="palette"
          n={4}
          eyebrow="Fondations"
          title="Palette"
          intro="Quinze valeurs, pas une de plus : les quatorze de la charte § 11 et § 08, et le Bleu Ardoise du logotype. Chaque valeur porte son contraste mesuré — c'est lui qui décide de l'usage, pas le goût."
        >
          <div className="flex flex-col gap-8">
            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {PALETTE.map((c) => (
                <Swatch key={c.token} c={c} />
              ))}
            </div>

            <Callout tone="info" title="Il n'y a pas d'autre teinte">
              Une interface a besoin de nuances que ces quinze valeurs ne couvrent pas :
              filets, survols, fonds d&apos;encarts. Elles s&apos;obtiennent{" "}
              <strong>exclusivement par opacité</strong> sur une couleur ci-dessus —{" "}
              <code>border-nm-ink-soft/45</code>, <code>bg-nm-gold/12</code>. Une opacité
              n&apos;introduit aucune teinte nouvelle ; un nouveau code hexadécimal, si.
            </Callout>

            <Surface padding="lg" className="flex flex-col gap-5">
              <Caption className="nm-eyebrow">
                États — composés avec la charte, sans y ajouter
              </Caption>
              {STATES.map((st) => (
                <div key={st.state} className="flex items-start gap-4">
                  <span
                    className={`mt-1 size-4 shrink-0 rounded-nm-xs ${st.cls}`}
                    aria-hidden="true"
                  />
                  <div className="min-w-0">
                    <p className="font-text text-body-sm text-nm-ink font-semibold">
                      {st.state}
                    </p>
                    <Caption>{st.note}</Caption>
                  </div>
                </div>
              ))}
            </Surface>

            <Callout tone="danger" title="Le doré ne s'écrit pas sur fond clair">
              Doré Médical <code>#DFB670</code>{" "} plafonne à <strong>1,9:1</strong>{" "} sur blanc.
              La charte le dit déjà autrement — « l&apos;or, jamais en aplat dominant, en
              touche seulement » — et le contraste le confirme. L&apos;or reste donc une
              couleur de filet et d&apos;aplat, jamais de texte. Seul le logotype fait
              exception : les logotypes sont explicitement exemptés du critère WCAG 1.4.3.
            </Callout>
          </div>
        </Section>

        {/* ----------------------------------------------- forme & mouvement */}
        <Section
          id="forme"
          n={5}
          eyebrow="Fondations"
          title="Forme, élévation, mouvement"
          intro="L'emblème est un cercle et ses piliers sont des stades : le système assume des arrondis généreux. Les ombres sont teintées à l'encre, jamais au noir — une ombre grise salit une palette bleue."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <Surface padding="lg" className="flex flex-col gap-5">
              <Caption className="nm-eyebrow">Rayons</Caption>
              {RADIUS.map((r) => (
                <div key={r.token} className="flex items-center gap-4">
                  <div
                    className={`bg-nm-ivory border-nm-ink-soft/45 size-12 shrink-0 border ${r.cls}`}
                  />
                  <div className="min-w-0">
                    <code className="font-mono text-nm-blue text-[0.6875rem]">
                      {r.token}
                    </code>
                    <Caption>
                      {r.value} — {r.usage}
                    </Caption>
                  </div>
                </div>
              ))}
            </Surface>

            <Surface padding="lg" className="flex flex-col gap-5">
              <Caption className="nm-eyebrow">Élévation</Caption>
              {ELEVATION.map((e) => (
                <div key={e.token} className="flex items-center gap-4">
                  <div
                    className={`bg-nm-paper rounded-nm-md size-12 shrink-0 ${e.cls}`}
                  />
                  <div className="min-w-0">
                    <code className="font-mono text-nm-blue text-[0.6875rem]">
                      {e.token}
                    </code>
                    <Caption>{e.usage}</Caption>
                  </div>
                </div>
              ))}
              <Callout tone="neutral">
                Rappel charte § 10 : aucune ombre ne s&apos;applique <strong>jamais</strong>{" "} au
                logotype.
              </Callout>
            </Surface>
          </div>
        </Section>

        {/* ------------------------------------------------------ composants */}
        <Section
          id="composants"
          n={6}
          eyebrow="Système"
          title="Composants"
          intro="Les pièces assemblables. Chacune applique la règle typographique et les contrastes du système sans qu'il faille y penser."
        >
          <div className="flex flex-col gap-6">
            {/* boutons */}
            <Surface padding="lg" className="flex flex-col gap-6">
              <Caption className="nm-eyebrow">Boutons</Caption>
              <div className="flex flex-wrap items-center gap-3">
                <Button variant="primary">Demander une démo</Button>
                <Button variant="secondary">Enregistrer</Button>
                <Button variant="outline">Annuler</Button>
                <Button variant="gold">Attestation</Button>
                <Button variant="ghost">Plus tard</Button>
                <Button variant="danger">Supprimer</Button>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <Button size="sm">Petit</Button>
                <Button size="md">Moyen</Button>
                <Button size="lg">Grand</Button>
                <Button disabled>Indisponible</Button>
              </div>
              <Surface tone="ink" border="inverse" padding="md">
                <Button variant="inverse">Sur fond encre</Button>
              </Surface>
              <Callout tone="info">
                Un seul bouton <code>primary</code>{" "} par écran : au-delà, plus rien ne prime.
                L&apos;or ne sert qu&apos;en filet (<code>gold</code>), jamais en aplat —
                charte § 13.
              </Callout>
            </Surface>

            {/* badges */}
            <Surface padding="lg" className="flex flex-col gap-5">
              <Caption className="nm-eyebrow">Badges & étiquettes</Caption>
              <div className="flex flex-wrap gap-2">
                <Badge tone="neutral">Brouillon</Badge>
                <Badge tone="blue">En cours</Badge>
                <Badge tone="gold">Certifié HDS</Badge>
                <Badge tone="success">Validé</Badge>
                <Badge tone="warning">À relire</Badge>
                <Badge tone="danger">Non conforme</Badge>
                <Badge tone="ink" variant="solid">
                  Souverain
                </Badge>
              </div>
              <Caption>
                Un badge ne porte jamais seul une information critique : ni la couleur ni la
                forme ne se voient sous daltonisme ou en monochrome. Le libellé fait foi.
              </Caption>
            </Surface>

            {/* cartes */}
            <div className="grid gap-4 sm:grid-cols-2">
              <Card>
                <CardHeader>
                  <Badge tone="blue">Compte rendu</Badge>
                  <Title size="sm">Consultation du 12 mars</Title>
                </CardHeader>
                <CardBody>
                  <Body size="sm">
                    Rédigé automatiquement à partir de l&apos;écoute de la consultation.
                    Relu et validé par le praticien avant envoi.
                  </Body>
                </CardBody>
                <CardFooter>
                  <Button size="sm" variant="outline">
                    Ouvrir
                  </Button>
                  <Caption>Modifié il y a 4 min</Caption>
                </CardFooter>
              </Card>
              <Card tone="ivory" border="gold" interactive>
                <CardHeader>
                  <Caption className="nm-eyebrow text-nm-ink">Carte interactive</Caption>
                  <Title size="sm">Souveraineté des données</Title>
                </CardHeader>
                <CardBody>
                  <Body size="sm">
                    Une IA française, hébergée en France, dans des datacenters français.
                  </Body>
                </CardBody>
              </Card>
            </div>

            {/* chiffres */}
            <Surface padding="lg" className="flex flex-col gap-6">
              <Caption className="nm-eyebrow">Chiffres-clés</Caption>
              <div className="grid gap-8 sm:grid-cols-3">
                <Stat
                  value="2"
                  unit="h/jour"
                  label="Temps administratif rendu"
                  footnote="Moyenne observée, cohorte bêta, n = 42"
                />
                <Stat
                  value="100"
                  unit="%"
                  label="Hébergement en France"
                  footnote="Datacenters certifiés HDS"
                />
                <Stat
                  value="< 8"
                  unit="s"
                  label="Génération d'un compte rendu"
                  footnote="Consultation de 15 min, p95"
                />
              </div>
              <Callout tone="neutral">
                Ton mesuré, charte § 05 : un chiffre-clé porte toujours sa source ou sa
                période. Un chiffre sans provenance est une promesse.
              </Callout>
            </Surface>

            {/* formulaire */}
            <Surface padding="lg" className="flex flex-col gap-6">
              <Caption className="nm-eyebrow">Champs de saisie</Caption>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Nom du praticien" required hint="Tel qu'il figure à l'Ordre.">
                  <TextInput placeholder="Dr Camille Lefèvre" />
                </Field>
                <Field label="Numéro RPPS" error="Le numéro RPPS compte 11 chiffres.">
                  <TextInput defaultValue="1023" />
                </Field>
                <Field label="Spécialité">
                  <Select defaultValue="Médecine générale">
                    <option>Médecine générale</option>
                    <option>Cardiologie</option>
                    <option>Dermatologie</option>
                  </Select>
                </Field>
                <Field label="Motif de consultation" className="sm:col-span-2">
                  <TextArea placeholder="Dicté ou saisi — NAPOLEON complète le reste." />
                </Field>
              </div>
              <Checkbox label="J'accepte que mes données soient hébergées en France, chez un hébergeur certifié HDS." />
            </Surface>

            {/* encarts */}
            <Surface padding="lg" className="flex flex-col gap-4">
              <Caption className="nm-eyebrow">Encarts</Caption>
              <Callout tone="info" title="Information">
                Le compte rendu reste un brouillon tant que le praticien ne l&apos;a pas
                validé.
              </Callout>
              <Callout tone="success" title="Validé">
                Document signé et transmis au patient.
              </Callout>
              <Callout tone="warning" title="Vigilance">
                Une posologie n&apos;a pas pu être reconnue avec certitude. À vérifier.
              </Callout>
              <Callout tone="danger" title="Non conforme">
                L&apos;ordonnance ne peut pas être émise : le numéro RPPS est invalide.
              </Callout>
            </Surface>

            {/* tableau */}
            <Table caption="Consultations du 12 mars 2026 — 4 entrées">
              <THead>
                <TR>
                  <TH>Patient</TH>
                  <TH>Type</TH>
                  <TH>État</TH>
                  <TH numeric>Durée</TH>
                </TR>
              </THead>
              <TBody>
                {[
                  ["M. Renaud B.", "Suivi", "success", "Validé", "12 min"],
                  ["Mme Aïcha K.", "Première visite", "blue", "En relecture", "24 min"],
                  ["M. Paul V.", "Renouvellement", "warning", "À relire", "8 min"],
                  ["Mme Sonia T.", "Suivi", "neutral", "Brouillon", "17 min"],
                ].map(([who, kind, tone, state, dur]) => (
                  <TR key={who}>
                    <TD className="text-nm-ink font-semibold">{who}</TD>
                    <TD>{kind}</TD>
                    <TD>
                      <Badge tone={tone as "success"} size="sm">
                        {state}
                      </Badge>
                    </TD>
                    <TD numeric>{dur}</TD>
                  </TR>
                ))}
              </TBody>
            </Table>

            {/* citation */}
            <Surface padding="lg">
              <Quote attribution="Charte 2026 · Valeurs fondatrices">
                L&apos;exigence du soin, l&apos;humanité du lien.
              </Quote>
            </Surface>
          </div>
        </Section>

        {/* ------------------------------------------------------- divergences */}
        <Section
          id="ecarts"
          n={7}
          eyebrow="Traçabilité"
          title="Écarts entre la charte et le tracé"
          intro="Trois points où le document écrit et la marque réelle ne disent pas la même chose. Le système suit le tracé ; c'est à la marque de trancher si elle veut l'inverse."
        >
          <Table caption="Divergences relevées entre la charte 2026 et le logotype de référence">
            <THead>
              <TR>
                <TH>Point</TH>
                <TH>La charte dit</TH>
                <TH>Le tracé mesure</TH>
                <TH>Choix retenu</TH>
              </TR>
            </THead>
            <TBody>
              <TR>
                <TD className="text-nm-ink font-semibold">Diagonale</TD>
                <TD>70° (§ 09)</TD>
                <TD className="nm-nums">66,16°</TD>
                <TD>Le tracé</TD>
              </TR>
              <TR>
                <TD className="text-nm-ink font-semibold">Piliers</TD>
                <TD>Rayon = ⅛ du diamètre (§ 09)</TD>
                <TD className="nm-nums">Largeur = 0,111 × Ø</TD>
                <TD>Le tracé</TD>
              </TR>
              <TR>
                <TD className="text-nm-ink font-semibold">Typographie</TD>
                <TD>Newsreader + Manrope (§ 12-13)</TD>
                <TD>—</TD>
                <TD>Georgia + Open Sans</TD>
              </TR>
            </TBody>
          </Table>

          <div className="mt-6">
            <Callout tone="neutral" title="Un quatrième point, non tranché">
              La diagonale n&apos;est pas un trait unique : ce sont{" "}
              <strong>deux traits parallèles décalés</strong>, interrompus par la tête, de
              sorte que le regard lit un seul geste que le volume de l&apos;emblème déplace.
              Le décalage est reproduit tel quel — mais rien dans la charte ne le documente.
              À inscrire au § 09 si c&apos;est intentionnel.
            </Callout>
          </div>
        </Section>

        <LabelledDivider>Fin du document</LabelledDivider>
      </main>

      <footer className="bg-nm-ink">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-14">
          <GoldRule />
          <div className="flex flex-wrap items-center justify-between gap-6">
            <Logotype variant="secondary" tone="gold-on-ink" size="sm" />
            <Caption className="text-nm-paper/50">
              Design system · Volume II · Édition 2026 — dérivé de la charte graphique
              NAPOLEON Médical Volume I
            </Caption>
          </div>
        </div>
      </footer>
    </div>
  );
}
