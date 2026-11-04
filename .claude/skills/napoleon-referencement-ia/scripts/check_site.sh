#!/usr/bin/env bash
# Vérification rapide « référencement IA » du site live NAPOLEON Médical.
# Usage : bash check_site.sh [URL_racine] [dossier_sortie]
set -u
SITE="${1:-https://www.napoleonmedical.fr}"
OUT="${2:-${CLAUDE_SCRATCHPAD:-/tmp}/napoleon-geo-check-$(date +%Y%m%d-%H%M)}"
UA="Mozilla/5.0 (compatible; GPTBot/1.0; +https://openai.com/gptbot)"
mkdir -p "$OUT"
echo "== $SITE — $(date -u +%FT%TZ) — sortie : $OUT"
for f in robots.txt sitemap.xml llms.txt llms-full.txt feed.xml mentions-legales; do
  code=$(curl -sS -L -A "$UA" --max-time 30 -o "$OUT/$(echo "$f" | tr '/' '_')" -w '%{http_code}' "$SITE/$f" 2>/dev/null || echo 000)
  echo "[$code] /$f ($(stat -c%s "$OUT/$(echo "$f" | tr '/' '_')" 2>/dev/null || echo 0) o)"
done
echo "== Bots IA dans robots.txt :"; grep -i -E "^user-agent" "$OUT/robots.txt" 2>/dev/null | sort -u | tr '\n' ' '; echo
URLS=$(grep -o '<loc>[^<]*</loc>' "$OUT/sitemap.xml" 2>/dev/null | sed 's/<\/\?loc>//g')
echo "== $(echo "$URLS" | grep -c . ) URL dans le sitemap"
for u in $URLS; do
  f="$OUT/$(echo "$u" | sed 's#https\?://##; s#[^A-Za-z0-9._-]#_#g').html"
  code=$(curl -sS -A "$UA" --max-time 30 -o "$f" -w '%{http_code}' "$u" 2>/dev/null || echo 000)
  python3 -I - "$f" "$u" "$code" <<'PY'
import re, sys, html
p, u, code = sys.argv[1:4]
try: s = open(p, encoding="utf-8", errors="replace").read()
except Exception: s = ""
def first(rx, flags=re.S|re.I):
    m = re.search(rx, s, flags); return html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip() if m else "-"
title = first(r"<title[^>]*>(.*?)</title>")
canon = first(r'<link[^>]+rel="canonical"[^>]+href="([^"]+)"')
robots = first(r'<meta[^>]+name="robots"[^>]+content="([^"]+)"')
h1 = first(r"<h1[^>]*>(.*?)</h1>")
types = re.findall(r'"@type":\s*"([^"]+)"', " ".join(re.findall(r'<script[^>]+ld\+json[^>]*>(.*?)</script>', s, re.S|re.I)))
social = sorted(set(re.findall(r'https?://(?:www\.)?(?:linkedin|instagram|facebook|youtube|x|twitter|tiktok)\.com[^"\'\s<]*', s)))
body = re.sub(r"<script.*?</script>|<style.*?</style>", " ", s, flags=re.S|re.I)
words = len(set(html.unescape(re.sub(r"<[^>]+>", " ", body)).split()))
print(f"[{code}] {u}\n   title={title[:90]!r} | canonical={'ok' if canon==u or canon==u+'/' else canon} | robots={robots} | h1={h1[:70]!r}\n   jsonld={sorted(set(types))} | social={social or 'aucun'} | mots_uniques={words}")
PY
done
echo "== Pages légales (?page=) : identiques à l'accueil ?"
home=$(curl -sS -A "$UA" --max-time 30 "$SITE/" | md5sum | cut -d' ' -f1)
for q in mentions-legales politique-de-confidentialite conditions-generales; do
  m=$(curl -sS -A "$UA" --max-time 30 "$SITE/?page=$q" | md5sum | cut -d' ' -f1)
  [ "$m" = "$home" ] && echo "   ?page=$q → IDENTIQUE à l'accueil (non crawlable)" || echo "   ?page=$q → différent"
done
echo "== Terminé. Fichiers dans $OUT"
