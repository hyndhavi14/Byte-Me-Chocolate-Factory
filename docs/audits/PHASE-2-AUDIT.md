# ByteMe Frontend — Phase 2 Audit Report

- **Date:** 2026-10-05
- **Phase:** 2 — Theme, fonts, global styles
- **Commit:** after `5c6d93d` on local `master` (push to team remote still cancelled; kept local)
- **Spec:** PDF Phase 2 — "Theme and global styles"

## Spec requirements vs. what was done

| Spec item | Status |
|---|---|
| Google Fonts link (Atkinson Hyperlegible 400/700 + Fraunces opsz 9..144, 600/700, display=swap) with preconnect to fonts.googleapis.com and fonts.gstatic.com | ✅ Both preconnects + stylesheet in `index.html`; fonts confirmed loaded in browser (`document.fonts`: "Atkinson Hyperlegible 400", "Fraunces 700") |
| `tokens.css`: every master-context colour on `:root` with exact names | ✅ All ~45 spec colours as `--espresso` … `--olive`; recurring one-off values from later phases tokenized (`--caramel-hover`, `--link-dark`, `--disabled`, `--side-hover`, `--side-input-border`, `--floor-*`, `--tariff-*`, `--focus-ring`) so no hex sits in component CSS later |
| Plus `--font-display`, `--font-body`, `--radius-card/tile/control/pill`, `--gap-section/grid`, `--pad-card`, `--control-h` | ✅ All present exactly as named (type-scale extras tokenized too) |
| `global.css` imported first in pair order, both imported in `main.tsx` | ✅ `import './styles/tokens.css'` then `'./styles/global.css'` before `App.tsx` |
| box-sizing: border-box on everything | ✅ `*, *::before, *::after` |
| body: margin 0, cream bg, espresso text, body font, 16px, lh 1.5 | ✅ |
| h1–h3: display font, 700, margin 0 | ✅ |
| Links: `--caramel`, hover `#5E3115` | ✅ (via `--link-dark`) |
| `a/button/select/input:focus-visible`: outline 3px `--sun`, offset 2px | ✅ Rule present in browser CSSOM, verbatim declarations |
| `button, input, select: font: inherit` | ✅ |
| `.visually-hidden` utility | ✅ Present |
| Font test on DashboardPage: h1 "Factory dashboard" + paragraph | ✅ |

## Checks run (final state of the code)

- `npm run lint` (oxlint) → 0 warnings / 0 errors
- `npx tsc -b --force` → exit 0
- `npm run build` → exit 0
- Browser computed styles on `/`: body bg `rgb(245,237,224)` (= #F5EDE0 ✓), body colour `rgb(42,27,18)` (= #2A1B12 ✓), body font `Atkinson Hyperlegible` 16px / lh 24px ✓, h1 font `Fraunces` 700 margin 0 ✓, h1 text "Factory dashboard" ✓
- Screenshot: visually confirmed cream background, Fraunces heading, Atkinson body ✓
- Console after reload: no errors (fonts fetched successfully)
- CSSOM: focus-visible rule and `.visually-hidden` rule with exact expected declarations ✓

## Bugs found & fixed during the phase

- **Hex typo in tokens.css**: `#dccb b3` (stray space) written while transcribing Phase 9's grid-bar track value; corrected to `#dccbB3` and verified in a Tokens.css re-read. (CSS would have silently dropped the invalid declaration, affecting Phase 9 later.)

## Limitations / notes

- Keyboard-focus ring could not be end-to-end demonstrated in this harness: synthetic `Tab`/`element.focus()` does not set `:focus-visible` modality in Chromium automation (probe returned `matchesFocusVisible: false` for any programmatic focus). The rule itself was verified present with correct declarations; real-keyboard Tab will show the 3px sun-coloured ring. Flagged for the Phase 10b manual keyboard check, which the PDF already requires.
- Google Fonts loads over the network; first paint may briefly use fallbacks (Georgia / Segoe UI) until fetched — `display=swap` handles this per spec.

## Standing rules applied

1. Tested everything (lint/json/tsc/build/browser computed styles + screenshot), fixed the bug found, re-verified ✅
2. Commit only Phase 2 (+ its audit doc); no remote push (user cancelled remote) ✅
3. No team files overwritten/deleted; no force-push ✅
4. Stopping after this phase until user confirms ✅
