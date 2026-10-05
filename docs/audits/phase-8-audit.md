# Phase 8 audit — Factory builder

## Scope

Implemented the Phase 8 factory-builder wizard. Added custom factories to
`FactoryContext` so saved factories appear in the selector and are selected
immediately. No Phase 9 work was started.

## Acceptance criteria

| Requirement | Result | Evidence |
| --- | --- | --- |
| Five-step wizard for factory details, machines, processes, energy & tariff, and review | Pass | Browser-tested each step and its content |
| Factory details and tariff inputs | Pass | Name, industry, hours, solar capacity, and both tariffs rendered and editable |
| Add and edit machines, including type, power, and availability | Pass | Added a packer machine, edited its name/type/power, and reviewed it |
| Editable process flow with add, remove, and reorder controls | Pass | Added a process, edited its name, reordered it with the accessible arrow controls |
| Energy preview and review summary | Pass | Browser verified tariff preview and review data for the configured factory |
| Save draft and restore it after a page reload | Pass | Saved the factory name and confirmed the draft restored after reload |
| Save factory builds stages, sets `has3dModel` false, adds it to the selector, and selects it | Pass | Saved Riverbend Foods; its selector option was selected and dashboard showed its generated stage |
| Back-to-dashboard link and affected route navigation | Pass | Navigated dashboard, processes, schedule, energy, compare, and factory view; selection persisted during in-app navigation |
| Mobile builder layout | Pass | Process-flow wizard opened at a 390 × 844 viewport |

## Validation

- `npm run lint` — passed.
- `npx tsc --noEmit -p tsconfig.app.json --pretty false` — passed.
- `npm run build` — passed.
- Browser checks — passed for all wizard steps, draft restore, machine/process
  interactions, saving a custom factory, and navigating all six affected routes.
- `git diff --check` — passed.

## Findings

Fixed the wizard's generic next-step label so it names the actual next step,
corrected the process-flow helper text to describe the arrow controls, added
the missing context type import, and removed lint issues from unused code and
draft restoration. No remaining Phase 8 acceptance gaps were found.
