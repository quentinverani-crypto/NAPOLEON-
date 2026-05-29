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
  name?: string;
  email?: string;
  phone?: string;
  profession?: string;
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupBody;
    const { name, email, phone, profession } = body;

    if (!name || !email || !profession) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    const NOTION_TOKEN = process.env.NOTION_TOKEN;
    const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

    if (!NOTION_TOKEN || !NOTION_DATABASE_ID) {
      console.warn(
        "[signup] Variables Notion absentes — l'inscription est journalisée mais pas persistée."
      );
      console.log("[signup]", { name, email, phone, profession });
      return NextResponse.json({ success: true, persisted: false });
    }

    const professionLabel = PROFESSION_LABELS[profession] ?? profession;

    const properties: Record<string, unknown> = {
      Nom: { title: [{ text: { content: name } }] },
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
