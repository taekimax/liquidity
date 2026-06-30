# Liquidity Landing Page Review

## Mission

Update the Korean landing page so it explains "한국거래소 수급 해석론" from the provided source document, preserving source phrasing where practical while making the variable liquidity-field theory easy to understand.

## Constraints and Assumptions

- Source document: `/Users/tk/Downloads/한국거래소-수급-해석론.txt`.
- Keep the app static: `index.html`, `styles.css`, and `script.js`.
- Preserve original Korean phrasing as much as possible, with edits only for landing-page readability.
- No destructive deletions.
- No test/doc/config deletion; no pytest inventory applies to this static HTML repo.

## Success Criteria

- First viewport uses the approved document-based message:
  - H1: "가변적 유동장으로 보는 주가 변동 예측"
  - Lead explains that prediction is not target-price guessing, but judging direction, volatility conditions, and persistence.
  - Supporting copy explains KRX investor-flow data, 수급 Delta, repetition, price response, and price-movement hypotheses.
- Page includes clear explanations of 유동장 이론, 핵심 개념, 의미, 통상적 유동장 구조, and 유동장 전이 후 구조.
- Page includes an animation/interactive explanation for `통상적 유동장 -> 수급 Delta -> 민감도 상승 -> 전이 후 구조`.
- Verification runs without external dependencies.

## MVP Slices

| P# | title | priority | scope_in | scope_out | acceptance_check | risk | owner_candidate | status | handoff | handoff_payload |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| P1 | Source-based hero and narrative | must-ship | Replace first viewport and section flow with source-based copy | External data, new build system | `node --test tests/landing-page-content.test.mjs` checks approved hero text | Low | codex | done | none | none |
| P2 | Liquidity-field animation | must-ship | Add static HTML/CSS/JS interactive animation for normal field, Delta, sensitivity, transition | Canvas/Three.js/library dependency | `node --test tests/landing-page-content.test.mjs` checks animation hooks and stages | Medium | codex | done | none | none |
| P3 | Static-page verification | must-ship | Add dependency-free content checks and run local syntax checks | Browser automation unless needed | `node --check script.js` and `node --test tests/landing-page-content.test.mjs` pass | Low | codex | done | none | none |
| P4 | Advanced scroll-driven visual polish | defer | Scroll pinning and pixel-perfect animation choreography | Required MVP behavior | Deferred; buttons and CSS animation provide explanation first | Medium | codex | declined | none | none |

## Lead Work Ledger

| CP# | W# | owner | status | elapsed | delta_since_last | next_action |
| --- | --- | --- | --- | --- | --- | --- |
| CP1 | W1 | codex | in_progress | 0m | Plan created for static landing update | Add failing tests |
| CP2 | W1 | codex | done | 20m | Hero, concept cards, animation, CSS/JS, and tests implemented | Final verification complete |

## Implementation Ledger

| I# | source_ids | owner | status | changed_paths | verify_cmd | verify_result | handoff | handoff_payload |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| I1 | P1 | codex | done | `index.html`, `styles.css` | `node --test tests/landing-page-content.test.mjs` | pass: approved hero text and source concept checks pass | none | none |
| I2 | P2 | codex | done | `index.html`, `styles.css`, `script.js` | `node --test tests/landing-page-content.test.mjs` | pass: field animation hooks and stages pass | none | none |
| I3 | P3 | codex | done | `tests/landing-page-content.test.mjs`, `.gitignore` | `node --check script.js && node --test tests/landing-page-content.test.mjs` | pass: JS syntax and 4/4 content tests pass | none | none |

## Verification Log

- RED: `node --test tests/landing-page-content.test.mjs` failed before implementation with 3 failing tests and 1 passing test. Missing items were approved hero text, core concept coverage, and animation hooks.
- GREEN: `node --check script.js && node --test tests/landing-page-content.test.mjs` passed after implementation. Result: 4 tests, 4 pass, 0 fail.
- Patch hygiene: `git diff --check` passed.
- Doc consistency check: verified the source document path and local files referenced in this document exist; verified documented commands appear in this artifact and were run.

## Closure Matrix

| CM# | scenario | criteria | outcome | action |
| --- | --- | --- | --- | --- |
| CM1 | all-green | Planned W# terminal with passing gates | done | JS syntax, content tests, patch hygiene, and doc consistency checks passed |
| CM2 | env-blocked | Tool/env prevents verification | done | No environment blocker encountered |
| CM3 | decision-blocked | Product decision unresolved | done | Hero message was approved before implementation |
| CM4 | stuck-recycled | Worker recycled due to no-progress | done | No worker recycle needed |
| CM5 | no-findings | Audit yielded no critical/high findings | done | No critical/high issues found in final checks |
| CM6 | partial-delivery | Deferred backlog remains | done | P4 advanced scroll-pinning polish deferred; MVP uses button and automatic CSS/JS stage animation |
| CM7 | coverage-regressed | Test inventory dropped beyond guard | done | No tests removed; one dependency-free Node test file added |
