# Phase 6 audit — Factory dashboard

## Scope

Implemented the dashboard route (`/`) from the Phase 6 specification using the
Phase 4 shared components and the selected factory from Phase 5 context. No
other phase was implemented.

## Acceptance criteria

| Requirement | Result | Evidence |
| --- | --- | --- |
| Factory-specific `PageHeader`, title, Export report button, and Run optimization button with play icon | Pass | Browser inspection at `/` |
| Four factory KPI cards with specified color tokens | Pass | Four KPI cards verified for each factory |
| Energy use and comparison cards in a responsive two-column row | Pass | Desktop browser inspection |
| 24 hourly stacked energy columns, 24 tariff bars, 3-hour labels, tooltip data, and explanatory footer | Pass | 24 chart columns and 24 tariff bars verified for every factory |
| Baseline and optimized comparisons with values, change labels, and progress bars | Pass | Four metrics and eight progress bars verified |
| Optimized schedule preview, machine labels, positioned blocks, and timeline link | Pass | Six schedule blocks and `/schedule` navigation verified |
| Machine list shows power, status, utilization, and progress | Pass | All machines and progress bars verified for all factories |
| Factory-view slot shows Chocolate 3D copy and a 2D fallback for other factories | Pass | Content and `/factory-view` navigation verified |
| Responsive behavior avoids horizontal page overflow | Pass | Checked at desktop and 768px viewport widths |
| Runtime and browser console errors | Pass | None observed |

## Data coverage

The dashboard was checked with Chocolate Factory, Cosmetics Plant, Textile
Mill, and Bottling Plant selected. Each selection rendered four KPI cards, 24
energy columns, 24 tariff bars, six schedule blocks, and the correct machine
count. Only Chocolate Factory displayed the 3D-view copy.

Chocolate Factory's displayed comparison values match the Phase 5 sample data:
Energy cost ₹ 83,600 → ₹ 65,200, Grid energy 1,240 → 880 kWh, Peak demand 64
→ 48 kW, and Makespan 21 → 19.5 h.

## Validation

- `npm run lint` — passed.
- `npx tsc --noEmit -p tsconfig.app.json --pretty false` — passed.
- `npm run build` — passed.
- Browser smoke checks — passed; dashboard cards, counts, links, factory-view
  variants, and browser console were verified.
- `git diff --check` — passed.

## Findings

No Phase 6 implementation bugs or remaining issues were found. An initial
browser audit query used uncompiled CSS Module class names and produced false
zero counts; the audit was rerun with accessible roles and rendered attributes,
and all expected counts passed.
