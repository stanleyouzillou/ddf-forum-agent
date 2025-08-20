# Minimal CI for the scaffold

- Use GitHub Actions.
- Steps:
  1. checkout
  2. setup node + pnpm
  3. install
  4. run unit tests
  5. build (if applicable)
  6. run e2e (start server then run Playwright)

Notes for agent:
- In CI, start the app with `pnpm dev -- --port 3001` and run Playwright with `--project=chromium`.
- Cache node modules between runs.
