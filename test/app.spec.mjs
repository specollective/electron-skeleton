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
  const title = await window.title()
  expect(title).toBe('Electron Skeleton')
})

test.afterAll(async () => {
  // Exit app.
  await electronApp.close();
});

// test('App launches and quits', async () => {
//   test.setTimeout(0)

//   const app = await _electron.launch({
//     args: [
//       '.webpack/main/index.js'
//     ],
//     recordVideo: {
//       dir: 'test-videos',
//     },
//   });
//   const page = await app.firstWindow();
  
//   await page.waitForSelector('h1#title', {
//     timeout: 90000,
//   });
  
//   const title = await page.$eval('h1#title', (el) => el.textContent);

//   expect(title).toBe('Electron Skeleton');

//   await app.close();
// });