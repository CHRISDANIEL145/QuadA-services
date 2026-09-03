const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  await page.setViewportSize({ width: 2560, height: 1305 });
  
  try {
    await page.goto('http://localhost:3000/service-areas');
    await page.waitForTimeout(2000);
    
    const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
    const bodyHeight = await page.evaluate(() => document.body.scrollHeight);
    const mainHeight = await page.evaluate(() => document.querySelector('main').scrollHeight);
    
    // get positions of children of main
    const sections = await page.evaluate(() => {
      const els = Array.from(document.querySelector('main').children);
      return els.map(el => {
        const rect = el.getBoundingClientRect();
        return { tag: el.tagName, className: el.className, y: rect.y, height: rect.height, bottom: rect.bottom };
      });
    });

    const metrics = { scrollHeight, bodyHeight, mainHeight, sections };
    console.log(JSON.stringify(metrics, null, 2));

  } catch (err) {
    console.error(err);
  } finally {
    await browser.close();
  }
})();
