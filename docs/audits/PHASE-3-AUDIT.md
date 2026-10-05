# ByteMe Frontend — Phase 3 Audit Report

- **Date:** 2026-10-05
- **Phase:** 3 — Bitten Bar logo and app shell
- **Commit:** after `5d6b18d` on local `master` (remote push stays cancelled per user)
- **Spec:** PDF Phase 3 — "Logo and app shell"

## Spec requirements vs. what was done

| Spec item | Status |
|---|---|
| `src/components/Logo/Logo.tsx` — exact SVG: mask with 3 cut circles, rounded bar, 9 squares (26×26, rx 4) at x/y 18/47/76, bottom-right sun | ✅ Squares generated from [18,47,76]×[18,47,76]; (76,76) gets `--sun`; `useId()` mask id avoids clashes |
| Props: `size` (default 40), `showWordmark` (default true), `tone` ('dark'\|'light', default 'dark') | ✅ Typed props with defaults |
| tone light: bar #F5EDE0, squares #E2D3BD, keep yellow | ✅ Verified in browser: bar rgb(245,237,224), squares rgb(226,211,189), sun rgb(227,167,47) |
| Wordmark gap 12px; "ByteMe" display font 700 24px lh 1; tagline 13px; dark/light colour pairs | ✅ Computed: wordmark rgb(245,237,224) Fraunces (light tone), tagline rgb(217,198,172) = #D9C6AC |
| Whole logo accessible name "ByteMe" | ✅ Wrapper `role="img" aria-label="ByteMe"`; a11y tree shows `image "ByteMe"` |
| AppShell wraps every route via layout route + `<Outlet/>` | ✅ `App.tsx` renders `<AppShell/>`; main.tsx router unchanged |
| Outer div min-height 100vh, flex, wrap; sidebar flex 1 1 240px max-w 100%; main flex 999 1 560px, min-width 0, padding 28px clamp(16px,3vw,40px) 48px, column, gap 24px | ✅ Computed: navFlex `1 1 240px`, mainFlex `999 1 560px`, mainPadding `28px 16px 48px` (16px = clamp lower bound at 390px), shell `flex wrap` |
| Sidebar: `<nav aria-label="Main">`, bg chocolate, padding 24px 16px, column gap 24px | ✅ |
| Logo light tone size 40, padding 0 8px | ✅ |
| Factory picker: eyebrow label FACTORY (side-muted), select min-h 44, radius 10, border #6B4A35, bg chocolate-2, milk text, bold, pad 0 12px; 4 hard-coded options | ✅ Computed: all verified; a11y tree shows combobox "FACTORY" with 4 options |
| 7 NavLinks in order with 24×24 rx-6 badges, 44px min-height, hover rgba(245,237,224,0.10) | ✅ |
| Active: bg sun, espresso text, bold; badge chocolate bg + sun text | ✅ Computed: activeBg rgb(227,167,47), activeColor rgb(42,27,18), weight 700, badgeBg rgb(59,36,22), badgeColor rgb(227,167,47) |
| Bottom card margin-top auto: "Optimizer ready" (milk) + "Last run: today, 09:40", 14px #EADCC6 | ✅ |

## Checks run (final state of the code)

- `npm run lint` → 0/0; `npx tsc -b --force` → 0; `npm run build` → 0 (4.55 kB CSS / 237.6 kB JS)
- Browser a11y tree: `navigation "Main"`, `image "ByteMe"`, combobox FACTORY (4 options), 7 links, optimizer card ✓
- `aria-current="page"` follows the active route (verified on `/` → Dashboard, then `/schedule` → Production Schedule) ✓
- Responsive at 390×844: sidebar stacks above main (nav.bottom ≤ main.top), full-width, **no horizontal page overflow** (scrollWidth 373 ≤ 390) ✓; screenshot visually matches the chocolate sidebar spec
- Console: clean (no errors/warnings) ✓

## Bugs found & fixed during the phase

- None in Phase 3 code. (During colour probing, one query mislabeled mask-rect indices; re-querying confirmed the logo fills were correct — no code change needed.)

## Notes / deviations

- Factory select is hard-coded per Phase 3; Phase 5's FactoryContext will replace the options and add state.
- Nav links are wrapped in `<li>` inside a `<ul>` (list-style removed) for semantic nav structure; spec's flex/gap applies to the list.
- Focus ring on nav links comes from the Phase 2 global rule; real-keyboard visibility still deferred to the Phase 10b manual check (harness cannot emulate `:focus-visible` modality).

## Standing rules applied

1. Tested everything (lint/tsc/build/a11y tree/computed styles/2 viewports/screenshot), no bugs found this round ✅
2. Only Phase 3 files committed; no push (remote cancelled by user) ✅
3. No team files touched; no force-push ✅
4. Stopping after this phase until user confirms ✅
