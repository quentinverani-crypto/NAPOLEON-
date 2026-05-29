import { NextResponse } from "next/server";

const NOTION_API_URL = "https://api.notion.com/v1/pages";
const NOTION_VERSION = "2022-06-28";

const PROFESSION_LABELS: Record<string, string> = {
  liberal: "Médecin libéral",
  hospitalier: "Médecin hospitalier",
  mixte: "Exercice mixte",
  "docteur-junior": "Docteur Junior",
  interne: "Interne",
};

type SignupBody = {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  profession?: string;
};

/** Diagnostic endpoint: GET /api/signup → indique l'état de la config sans exposer les secrets */
export async function GET() {
  return NextResponse.json({
    notionTokenPresent: Boolean(process.env.NOTION_TOKEN),
    notionDatabaseIdPresent: Boolean(process.env.NOTION_DATABASE_ID),
    notionDatabaseIdPreview: process.env.NOTION_DATABASE_ID
      ? `${process.env.NOTION_DATABASE_ID.slice(0, 8)}…${process.env.NOTION_DATABASE_ID.slice(-4)}`
      : null,
    runtime: "nodejs",
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupBody;
    const { firstName, lastName, email, phone, profession } = body;

    if (!firstName || !lastName || !email || !profession) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

    if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
      console.warn(
        "[signup] Variables Notion absentes",
        JSON.stringify({
          hasToken: Boolean(NOTION_TOKEN),
          hasDbId: Boolean(NOTION_DATABASE_ID),
        })
      );
      console.log("[signup] payload reçu:", {
        firstName,
        lastName,
        email,
        phone,
        profession,
      });
      return NextResponse.json({ success: true, persisted: false });
    }

    const professionLabel = PROFESSION_LABELS[profession] ?? profession;

    const properties: Record<string, unknown> = {
      // TITLE column = Prénom dans la nouvelle base
      Prénom: { title: [{ text: { content: firstName } }] },
      "Nom de famille": {
        rich_text: [{ text: { content: lastName } }],
      },
      Email: { email },
      Profession: { select: { name: professionLabel } },
      Statut: { select: { name: "Nouveau" } },
      Source: { select: { name: "Site web" } },
    };

    if (phone && phone.trim()) {
      properties["Téléphone"] = { phone_number: phone.trim() };
    }

    const res = await fetch(NOTION_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${NOTION_TOKEN}`,
        "Content-Type": "application/json",
        "Notion-Version": NOTION_VERSION,
      },
      body: JSON.stringify({
        parent: { database_id: NOTION_DATABASE_ID },
        properties,
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("[signup] Notion API error:", res.status, errText);
      return NextResponse.json(
        { error: "Impossible d'enregistrer l'inscription pour le moment." },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true, persisted: true });
  } catch (err) {
    console.error("[signup] Unexpected error:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
