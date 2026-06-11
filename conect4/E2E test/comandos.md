xvfb-run npx playwright test --project=chromium --ui --ui-host 0.0.0.0 --ui-port 9322

xvfb-run npx playwright test "E2E test/BoardView.spec.js" --project=chromium --ui --ui-host 0.0.0.0 --ui-port 9322