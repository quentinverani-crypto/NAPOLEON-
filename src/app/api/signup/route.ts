import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, profession } = body;

    if (!name || !email || !profession) {
      return NextResponse.json(
        { error: "Champs requis manquants" },
        { status: 400 }
      );
    }

    // TODO: Replace with your Google Apps Script webhook URL
    // const GOOGLE_SCRIPT_URL = process.env.GOOGLE_SCRIPT_URL;
    // if (GOOGLE_SCRIPT_URL) {
    //   await fetch(GOOGLE_SCRIPT_URL, {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ name, email, phone, profession, date: new Date().toISOString() }),
    //   });
    // }

    console.log("Beta signup:", { name, email, phone, profession });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Erreur interne" },
      { status: 500 }
    );
  }
}
