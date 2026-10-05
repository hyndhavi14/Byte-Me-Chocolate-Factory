# Phase 7 audit — Production schedule

## Scope

Implemented the `/schedule` page to the Phase 7 specification. Added a reusable
`GanttRow` component and refactored the dashboard schedule preview to use it.
No later phase was started.

## Acceptance criteria

| Requirement | Result | Evidence |
| --- | --- | --- |
| PageHeader title and factory sample-data eyebrow | Pass | Browser checks across all four factories |
| Baseline / Optimized segmented toggle, Optimized default, updates timeline title and bars | Pass | Both states and switch-back verified for all factories |
| Four summary StatTiles change with the selected version | Pass | Chocolate baseline values verified; all factories render both states |
| Timeline title, legend, tariff row, 24 tariff bands, ruler, and one row per machine | Pass | 24 bands and 6–8 machine rows verified per factory |
| Hard-stop energy-zone background and time-positioned Gantt blocks | Pass | Browser rendering inspected; six blocks in each schedule state |
| Shifted optimized blocks have dashed outlines; baseline blocks do not | Pass | Computed outline styles checked in browser |
| Shifted processes use a semantic, horizontally scrollable table with reason StatusChips | Pass | Real table and required Chocolate Factory sample rows verified |
| Dashboard preview reuses GanttRow with compact height and label column | Pass | Dashboard route smoke check and visual inspection |
| Browser runtime/console errors and mobile document overflow | Pass | No errors; no horizontal document overflow at 390px |

## Chocolate Factory sample values

- Optimized: 19.5 h, ₹ 65,200, 41% solar share, 9 processes shifted.
- Baseline: 21 h, ₹ 83,600, 25% solar share, 0 processes shifted.
- Shift table includes Conche batch, Roast B, Temper 1, and Grind B with the
  specified machines, times, reasons, and savings.

## Validation

- `npm run lint` — passed.
- `npx tsc --noEmit -p tsconfig.app.json --pretty false` — passed.
- `npm run build` — passed.
- Browser tests — passed for Baseline and Optimized states on all four factory
  selections, including schedule counts, summary values, and toggling.
- Dashboard reuse and Phase 6 route behavior — smoke checked.
- `git diff --check` — passed.

## Findings

No implementation bugs or remaining Phase 7 issues were found. An initial
browser query used a tariff-title selector that did not match the spec's title
format (`18:00 · Peak`); the query was corrected, and all 24 tariff bars were
verified for every factory.
