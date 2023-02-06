import { test, expect } from '@playwright/test';
import { _electron } from 'playwright';

test('App launches and quits', async () => {
  test.setTimeout(0)

  const app = await _electron.launch({
    args: [
      '.webpack/main/index.js'
    ],
    recordVideo: {
      dir: 'test-videos',
    },
  });
  const page = await app.firstWindow();
  
  await page.waitForSelector('h1#title', {
    timeout: 90000,
  });
  
  const title = await page.$eval('h1#title', (el) => el.textContent);

  expect(title).toBe('Electron Skeleton');

  await app.close();
});