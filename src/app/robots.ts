import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Robots d'IA explicitement autorisés : recherche/citation (OAI-SearchBot,
// PerplexityBot, Claude-SearchBot…), navigation à la demande d'un utilisateur
// (ChatGPT-User, Claude-User…) et entraînement (GPTBot, ClaudeBot, Google-Extended…).
const AI_BOTS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "anthropic-ai",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "MistralAI-User",
  "meta-externalagent",
  "Amazonbot",
  "DuckAssistBot",
  "CCBot",
  "Bytespider",
  "cohere-ai",
];

const PRIVATE = ["/api/", "/showcase"];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: PRIVATE },
      { userAgent: AI_BOTS, allow: "/", disallow: PRIVATE },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
