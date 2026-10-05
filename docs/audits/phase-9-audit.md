# Phase 9 audit — Factory view

## Scope

Implemented the `/factory-view` 3D placeholder and data-driven 2D production
floor plan. Stage zones and machine tiles are generated from `factory.stages`;
the real 3D scene remains a clearly marked teammate integration point.

## Acceptance criteria

| Requirement | Result | Evidence |
| --- | --- | --- |
| “Factory view” header and 2D / 3D view-type toggle | Pass | Browser verified both toggle states and selected styling |
| 3D disabled without a factory model; view resets on factory selection | Pass | Verified Chocolate Factory starts in 3D; other seeded factories use 2D with 3D disabled |
| Summary tiles show stages, machines, running count, and calculated solar share | Pass | Browser values matched all four seeded factories |
| 3D slot uses a dark 560px-minimum panel, 72px cube mark, guidance text, and a 2D fallback button | Pass | Browser verified rendered slot dimensions, background, copy, icon, and fallback interaction |
| 2D floor plan derives numbered, ordered stage zones and machine tiles from factory data | Pass | Verified five stages and each factory’s first-running-machine default |
| Running, Idle, Maintenance, and solar indicators; solar and grid energy bars | Pass | Browser inspected floor-plan legend, tile states, and energy summaries |
| Selecting a machine updates the details panel, including stage, status, power, source, next slot, utilization, and schedule link | Pass | Verified Running, Idle, and Maintenance machine details; schedule link navigated to `/schedule` |
| Responsive floor plan scrolls internally without document overflow | Pass | Floor scroll width exceeded its viewport as intended; document had no overflow at 390px |
| Factory selection resets the default selected machine; view selection preserves machine selection | Pass | Browser checked default selection and selection persistence across view toggles |

## Validation

- `npm run lint` — passed.
- `npx tsc --noEmit -p tsconfig.app.json --pretty false` — passed.
- `npm run build` — passed.
- Browser checks — passed for 3D/2D states, all four seeded factories, machine
  selection and details, the schedule link, 560px slot height, and mobile
  overflow.
- `git diff --check` — passed.

## Findings

No Phase 9 acceptance gaps remain. During implementation, visual review caught
that the first 3D placeholder treatment was too light and the solar bar used
solar share instead of installed solar capacity. Both were corrected to the
specified dark 3D slot and capacity-relative solar bar.

The real Three.js scene is intentionally excluded from this phase and is
identified in the component as a TODO integration point.
