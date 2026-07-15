# automation-playground

A public, community-driven playground for practicing UI, API, and contract test automation with [Playwright](https://playwright.dev).

**How it works:** someone writes an issue describing a test scenario against one of the practice sites below, someone else automates it in a PR, GitHub Actions runs the suite automatically, and a review is required before it merges into `main`. See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full loop.

## Subprojects

| Site | Good for | Label |
|---|---|---|
| [automationintesting.online](https://automationintesting.online/) | Booking flow UI + REST API, admin auth | `site:automationintesting` |
| [testing.qaautomationlabs.com](https://testing.qaautomationlabs.com/) | Shadow DOM, iframes, file upload, drag & drop | `site:qaautomationlabs` |
| [saucedemo.com](https://www.saucedemo.com/) | Login variants, cart/checkout | `site:saucedemo` |
| [the-internet.herokuapp.com](https://the-internet.herokuapp.com/) | Dynamic loading, alerts, frames | `site:the-internet` |
| [demoqa.com](https://demoqa.com/) | Forms, widgets, modals | `site:demoqa` |
| [uitestingplayground.com](https://www.uitestingplayground.com/) | Deliberately adversarial DOM cases | `site:uitestingplayground` |
| Self-hosted mock service (`tests/pact-practice/`) | Consumer-driven contract testing with real provider verification via [Pact](https://docs.pact.io/) | `site:pact-practice` |

Candidates to add later: OrangeHRM, ParaBank, AutomationExercise, TodoMVC — open an issue if you want one added as a new subproject.

> Public practice sites can change or reset without notice — that's part of the exercise. If a passing test starts failing, check the site before assuming the test is wrong.

## Getting started

```bash
npm install
npx playwright install --with-deps
```

Run everything:

```bash
npx playwright test
```

Run one subproject:

```bash
npx playwright test --project=saucedemo
```

Run the Pact contract tests:

```bash
npm run test:pact
```

## Structure

```
tests/
  ui/<site>/          UI tests per practice site
  api/<site>/          API tests per practice site
  pact-practice/
    consumer/          Pact consumer contract test (Jest)
    provider/           Self-hosted Express provider + verification script
playwright.config.ts    One project per site; BROWSER env var picks the engine
```

## CI

- **PRs** (`pr-tests.yml`): runs only the subproject(s) whose folder changed, Chromium only, for fast feedback.
- **`main` + nightly** (`main-tests.yml`): full suite across Chromium, Firefox, and WebKit, to catch drift on the public sites.

`main` is protected: 1 required review and a passing status check before merge.

## License

[MIT](./LICENSE)
