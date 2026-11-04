import sys, os
src, outdir, prefix, chunk = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4])
text = open(src, encoding='utf-8', errors='replace').read()
pages = text.split('\f')
if pages and not pages[-1].strip():
    pages = pages[:-1]
n = len(pages)
print(f"{prefix}: {n} pages")
# per-page files with markers, plus chunk files
for start in range(0, n, chunk):
    end = min(n, start + chunk)
    fn = os.path.join(outdir, f"{prefix}_p{start+1:03d}-{end:03d}.txt")
    with open(fn, 'w', encoding='utf-8') as f:
        for i in range(start, end):
            f.write(f"\n\n======== PAGE {i+1} / {n} ========\n")
            f.write(pages[i])
    print(fn, sum(len(pages[i].split()) for i in range(start, end)), "words")
