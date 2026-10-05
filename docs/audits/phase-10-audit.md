# Phase 10 audit — Data pages, polish, and API integration

## Scope

Completed the Phase 10 data pages for processes/machines, energy analysis, and
baseline-versus-optimized comparison; connected the existing dashboard and
schedule actions to factory state; added API loading, retry, and optimization
states; and applied the specified responsive and accessibility polish.

## Acceptance criteria

| Requirement | Result | Evidence |
| --- | --- | --- |
| `/processes` uses the Phase 9 floor plan in 2D and provides the All machines table | Pass | Reused `FactoryFloorPlan`; table includes machine, stage, type, rated power, status, and utilization |
| `/energy` provides four energy/cost stats, hourly chart, and tariff-band rows | Pass | Shared `EnergyChart` at 260px, four `StatTile`s, and three band-colored progress rows |
| `/compare` provides shared comparison metrics, baseline/optimized timelines, and shifted-process table | Pass | Shared `CompareCard`, `GanttRow` timelines with overlap-free lanes, semantic shifted-process table |
| Dashboard reuses the shared chart/comparison components and runs optimization | Pass | Run action has loading state; success refreshes selected factory; request failure shows retry card |
| Empty schedule has the specified message and primary optimizer action | Pass | Verified with an API fixture containing no schedule blocks; the action showed loading and completed |
| API requests use the configured API base and mock data only when `VITE_USE_MOCK === "true"` | Pass | Implemented in `src/data/api.ts`; API factory payloads are runtime-validated against Phase 5 types |
| Factory-data and optimizer failures are recoverable and visible | Pass | Intercepted API failures showed `Try again`; retry reissued the request; optimizer error appeared inline |
| `/kit` demo route is removed | Pass | `/kit` renders the app's not-found page rather than the demo |
| Required responsive widths and internal scrolling | Pass | Dashboard, Processes, Schedule, Energy, and Compare checked at 1440px, 1024px, and 390px; no document-level horizontal overflow; tables and charts scroll inside their own containers |
| Phone layout stacks the sidebar and content | Pass | At 390px the sidebar ends above the main content |
| Keyboard focus, toggle state, and selected navigation are accessible | Pass | Keyboard focus ring is visible (3px solar-yellow outline); schedule/view toggles expose `aria-pressed`; active route exposes `aria-current="page"` |
| Text contrast | Pass | Measured representative text/surface pairs: body 14.30:1, secondary text on card 8.67:1, sidebar secondary 8.71:1, primary button 6.50:1, error text 7.26:1, and solar status 7.01:1 |
| Favicon uses the existing ByteMe mark | Pass | `public/favicon.svg` returned HTTP 200 and is linked from `index.html` |
| Factory switching remains consistent across pages | Pass | All four seeded factories checked on Dashboard, Processes, Schedule, Energy, Compare, and Factory View |

## Validation

- `npm run lint` — passed without warnings.
- `npx tsc --noEmit -p tsconfig.app.json --pretty false` — passed.
- `npm run build` — passed (`tsc -b` and Vite production build).
- Browser checks — passed for the affected routes at all required widths,
  selected-factory consistency, empty schedule behavior, optimization success
  and failure, API retry, navigation state, keyboard focus, internal scrolling,
  favicon, and the removed `/kit` route.
- `git diff --check` — passed.

## Findings fixed

- Comparison schedules initially overlapped because distinct machines can run
  at the same time. Added optional time-based lanes to `GanttRow` for the two
  aggregate comparison timelines.
- The Schedule page had page-local Chocolate Factory shift data and a fixed
  shifted-process count, which would not update when API factory data refreshed.
  It now reads both from the selected factory.
- The async factory-load effect triggered a lint warning; state updates now
  occur in promise handlers.
- Unknown routes previously displayed React Router's developer error screen;
  they now show a simple not-found page. The `/kit` demo remains removed.

## Remaining integration notes

- No backend or endpoint contract was present in the workspace or specified by
  the Phase 10 PDF. The API client therefore uses the conventional endpoints
  `GET /factories`, `GET /factories/{id}`, and `POST /factories/{id}/optimize`.
  These flows were browser-tested with intercepted fixture responses, not a
  live backend; confirm the routes and payload schema against the deployed API.
- The factory model contains hourly energy, tariff-band labels, and total
  optimized energy cost, but no tariff-specific rates or cost totals. The
  tariff-row cost is therefore an explicitly disclosed proportional estimate,
  not an authoritative bill calculation. Provide tariff rates/cost data in the
  API before treating those band costs as actual charges.
