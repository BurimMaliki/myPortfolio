# Content-preservation audit — RBSoft redesign

Baseline: `docs/original-content.txt`, captured 2026-10-15 from the live site
(https://www.rbsoft.ch/). Automated check: `tools/content_audit.py`
(currently **33/33 strings preserved, 0 missing/changed**).

## Verbatim mapping (original → redesign)

| Original element | Location in redesign | Status |
| --- | --- | --- |
| H1 `Software - die passt!` | `#start` hero title | verbatim |
| Hero paragraph (`Ob individuelle Anwendungen …`) | `#start` hero lead + `<meta description>` | verbatim |
| `Dienstleistungen` | section heading `#dienstleistungen` + nav label | verbatim |
| `Erfolgreiche Umsetzung von kundenindividuellen Software-Anwendungen als oberstes Ziel.` | section lead | verbatim |
| `Konzeption` + paragraph | card 01 | verbatim |
| `Entwicklung` + 2 paragraphs | card 02 | verbatim |
| `App Übernahme` + 2 paragraphs | card 03 | verbatim |
| `Betrieb & Support` + 2 paragraphs | card 04 | verbatim |
| `Adresse` block (RBSoft / Reto Bergamin / Walderstrasse 43d / CH-8340 Hinwil / Switzerland) | contact panel 1 | verbatim, line breaks kept |
| `Kontakt` block (`info@rbsoft.ch`, `+41 76 388 43 00`) | contact panel 2, as `mailto:` / `tel:` links | verbatim |
| `Technologien` list (.Net Core, Angular, DevExpress, PostgreSql, MS-SQL-Server) | contact panel 3 | verbatim, order kept |
| `© Copyright 2025 RBSoft - Alle Rechte vorbehalten` | footer | verbatim |
| Logo wordmark + tagline `Business Software for you` | original logo file in header (unchanged) + alt text | preserved |
| 4 service photos | local optimized copies, same order | preserved |

## Decision log (non-verbatim deltas, all intentional)

1. **Mobirise builder badge removed.** The live site embeds a third-party
   "Mobirise Website Builder" image linking to mobiri.se. This is builder
   watermark, not RBSoft content; it was removed. No RBSoft wording was touched.
2. **Image alt texts replaced.** Original alts were the builder default
   ("Mobirise Website Builder"). New German alt texts describe the actual
   images (accessibility requirement). Visible copy unchanged.
3. **`<title>` / meta description.** Original title was the template default
   `Home`. New title `RBSoft – Software - die passt!` and the meta description
   are composed exclusively from original wording.
4. **UI/accessibility strings added** (invisible or functional, no marketing
   content): skip link `Zum Hauptinhalt springen`, `aria-label`s
   (`Seitenbereiche`, `Weiter zu Dienstleistungen`, `Zum Seitenanfang`).
5. **Navigation labels** use only original section names (`Dienstleistungen`,
   `Kontakt`) plus the conventional `Start`; numeric prefixes (`01…05`) and all
   terminal/hex glyphs are decorative and `aria-hidden`.
6. **Whitespace normalization:** one double space inside
   `Gehostet im Rechenzentrum unseres  bewährten Hostingpartners …` collapses to a
   single space — identical rendering in HTML, wording untouched.
7. **Header/logo:** original wordmark PNG (transparent, 406×122, brand colors
   `#ff6600`/`#ff3300`) reused as-is on a white header bar; no redraw, no
   replacement, no recoloring.

## Readability fix (blue-on-blue)

The original theme placed mid-blue text on blue-tinted surfaces. The redesign
uses paired tokens with verified contrast: `--fog-100/300/500` on
`--blue-950/900/850` (≥ 4.5:1), `--ink-900/500` on `--paper/--white` (≥ 4.5:1),
and `--orange-600` for orange text on light surfaces. Decorative mono numerals
were lifted to `--blue-400` on dark surfaces for the same reason.

## Loading behaviour

All content is static; nothing loads asynchronously, so no skeleton loaders are
needed (adding them would be fake state). Layout shift is prevented with
`width`/`height` attributes and fixed `aspect-ratio` media boxes that show a
blue placeholder surface until the image paints. The initialization sequence is
pure presentation: ~0.9 s, skipped for returning visitors (`sessionStorage`) and
`prefers-reduced-motion`, hard failsafe at 1.6 s, and the site is complete
without JavaScript.
