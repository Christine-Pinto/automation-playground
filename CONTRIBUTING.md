# Contributing

This is a community project for practicing test automation. The loop is:

1. Someone writes an **issue** describing a test scenario (using the "New test scenario" template).
2. Someone else **claims** the issue by commenting "I'll take this" and assigning themselves.
3. They write the test, open a **PR**, and CI runs automatically.
4. Someone else **reviews** the PR (1 approval required before merge).

## Picking up an issue

- Look for `site:*` labels to find issues for a subproject you want to practice on.
- `good-first-issue` marks simpler scenarios.
- Comment on the issue and assign yourself before starting, so two people don't duplicate work.

## Branch naming

`<site>/<short-description>`, e.g. `saucedemo/checkout-flow`, `pact-practice/widget-not-found`.

## Writing the test

- Put UI tests in `tests/ui/<site>/`, API tests in `tests/api/<site>/`, contract tests in `tests/pact-practice/`.
- File names end in `.spec.ts` for Playwright tests (`.pact.test.ts` for the Jest-based Pact consumer test).
- Run just your subproject locally:
  ```
  npx playwright test --project=<site>
  ```
  or for Pact:
  ```
  npm run test:pact
  ```
- `npm run typecheck` should pass before you open a PR.

## Opening the PR

- Reference the issue you're closing (`Closes #123`).
- Fill in the PR template's "how to verify" section.
- CI (`pr-tests.yml`) runs automatically, scoped to whichever subproject folder(s) your PR touches.
- 1 approval is required on `main`; branch protection blocks merging without it.

## Labels

| Label | Meaning |
|---|---|
| `site:automationintesting` / `site:qaautomationlabs` / `site:saucedemo` / `site:the-internet` / `site:demoqa` / `site:uitestingplayground` / `site:pact-practice` | Which subproject the issue/PR belongs to |
| `good-first-issue` | Simple scenario, good starting point |
| `help-wanted` | Open and looking for someone to pick it up |
| `has-pr` | A PR already exists for this issue |
| `flaky` | Test is intermittently failing and needs investigation |

## A note on the public practice sites

These sites are run by other people/projects, reset periodically, and can change without notice. If a test that used to pass starts failing, check whether the site changed before assuming your test is wrong — and label the issue/PR `flaky` if it's intermittent rather than a real regression.
