import { NextResponse } from "next/server";

type DemoBody = {
  name?: string;
  email?: string;
  profile?: string;
  message?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Diagnostic : indique l'état de la config d'envoi sans exposer de secret. */
export async function GET() {
  return NextResponse.json({
    emailServiceConfigured: Boolean(
      process.env.RESEND_API_KEY &&
        process.env.DEMO_EMAIL_TO &&
        process.env.DEMO_EMAIL_FROM,
    ),
    runtime: "nodejs",
  });
}

export async function POST(request: Request) {
  let body: DemoBody;
  try {
    body = (await request.json()) as DemoBody;
  } catch {
    return NextResponse.json({ error: "Requête invalide" }, { status: 400 });
  }

  const name = body.name?.trim();
  const email = body.email?.trim();
  const profile = body.profile?.trim() || "Non précisé";
  const message = body.message?.trim() || "";

  if (!name || !email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Champs requis manquants ou invalides" },
      { status: 400 },
    );
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const DEMO_EMAIL_TO = process.env.DEMO_EMAIL_TO;
  const DEMO_EMAIL_FROM = process.env.DEMO_EMAIL_FROM;

  // Repli : tant que le service d'e-mail n'est pas configuré, on journalise
  // la demande et on renvoie un succès (le client peut basculer en mailto).
  if (!RESEND_API_KEY || !DEMO_EMAIL_TO || !DEMO_EMAIL_FROM) {
    console.log("[demo] Demande reçue (service e-mail non configuré):", {
      name,
      email,
      profile,
      message,
    });
    return NextResponse.json({ success: true, persisted: false });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: DEMO_EMAIL_FROM,
        to: [DEMO_EMAIL_TO],
        reply_to: email,
        subject: `Demande de démo — ${name} (${profile})`,
        text: `Nom : ${name}\nE-mail : ${email}\nProfil : ${profile}\n\nMessage :\n${message || "—"}`,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[demo] Erreur service e-mail:", res.status, detail);
      return NextResponse.json(
        { error: "Impossible d'envoyer la demande pour le moment." },
        { status: 502 },
      );
    }

    return NextResponse.json({ success: true, persisted: true });
  } catch (err) {
    console.error("[demo] Erreur inattendue:", err);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}
