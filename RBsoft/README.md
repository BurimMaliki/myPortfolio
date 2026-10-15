# RBSoft — Website Redesign

A complete frontend redesign of [rbsoft.ch](https://www.rbsoft.ch/), implemented as a
dependency-free static site: semantic HTML, one stylesheet built on design tokens,
and a small vanilla-JS presentation layer.

**Core contract of this redesign**

- 100 % of the original copy is preserved verbatim (verified by `tools/content_audit.py`).
- The original header and logo are unchanged (`assets/img/rbsoft-logo.png`, original wordmark).
- Blue is the dominant surface color; orange `#ff6600` / red `#ff3300` — sampled from the
  original logo — are used as controlled accents.
- No frameworks, no build step, no runtime dependencies.

## Run locally

```bash
python3 -m http.server 8000 --bind 0.0.0.0
# → http://localhost:8000
```

Any static host works (GitHub Pages, nginx, S3 …): the site is plain HTML/CSS/JS.

## Structure

```
index.html               single-page site (all original content)
assets/css/main.css      design tokens + layout + components
assets/js/main.js        presentation layer (boot sequence, decode, scroll-spy, …)
assets/fonts/            self-hosted IBM Plex Sans / Mono (latin, woff2)
assets/img/              original logo + original service photos (optimized)
docs/original-content.txt  verbatim capture of the live site (source of truth)
docs/content-audit.md      content-preservation audit + design decisions
tools/content_audit.py     automated verbatim-content check (exit 0 = pass)
```

## Design system

- **Type:** IBM Plex Sans (body/headings) + IBM Plex Mono (technical accents, labels,
  boot sequence). Self-hosted, `font-display: swap`.
- **Color tokens:** deep-blue surface scale (`--blue-950 … --blue-200`), brand accents
  (`--orange-*`, `--red-*`), light/dark text pairs with verified contrast ratios.
- **Motion:** one signature set — initialization sequence (~0.9 s, skipped for returning
  visitors and `prefers-reduced-motion`), character-decode reveals on headings,
  clip-draw image reveals, terminal-style scroll-spy nav with blinking cursor,
  live hex stream + clock as real system state. Everything degrades gracefully:
  with JS disabled the full site remains readable and styled.

## Quality gates

```bash
python3 tools/content_audit.py   # 33/33 original strings preserved
node --check assets/js/main.js   # syntax
```

See `docs/content-audit.md` for the full audit table and decision log.
