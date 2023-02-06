import { _electron as electron } from 'playwright';
import { test, expect } from '@playwright/test';

let window, electronApp;

test.beforeAll(async () => {
  // Launch Electron app.
  electronApp = await electron.launch({ args: ['.webpack/main/index.js'] });

  // Evaluation expression in the Electron context.
  const appPath = await electronApp.evaluate(async ({ app }) => {
    // This runs in the main Electron process, parameter here is always
    // the result of the require('electron') in the main app script.
    return app.getAppPath();
  });
  console.log(appPath);

  // Get the first window that the app opens, wait if necessary.
  window = await electronApp.firstWindow();
  // Print the title.
  console.log(await window.title());
  // Capture a screenshot.
  await window.screenshot({ path: 'tests/screenshots/out.png' });
  // Direct Electron console to Node terminal.
  window.on('console', console.log);

});

test('window has correct title', async () => {
  const windowTitle = await window.title()
  expect(windowTitle).toBe('Electron Skeleton')
  
  await window.waitForSelector('h1#title', {
    timeout: 30000,
  });

  const pageTitle = await window.$eval('h1#title', (el) => el.textContent);

  expect(pageTitle).toBe('Electron Skeleton');

  await window.waitForSelector('p#message', {
    timeout: 30000,
  });
});

test.afterAll(async () => {
  // Exit app.
  await electronApp.close();
});
