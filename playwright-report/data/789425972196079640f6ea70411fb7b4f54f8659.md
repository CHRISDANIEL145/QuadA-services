# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public.spec.ts >> Public Pages >> homepage should load correctly
- Location: tests\e2e\public.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Every service, coordinated for you/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Every service, coordinated for you/i })

```

```yaml
- main:
  - img "Next.js logo"
  - heading "To get started, edit the page.tsx file." [level=1]:
    - text: To get started, edit the
    - code: page.tsx
    - text: file.
  - paragraph:
    - text: Looking for a starting point or more instructions? Head over to
    - link "Templates":
      - /url: https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app
    - text: or the
    - link "Learning":
      - /url: https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app
    - text: center.
  - link "Vercel logomark Deploy Now":
    - /url: https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app
    - img "Vercel logomark"
    - text: Deploy Now
  - link "Documentation":
    - /url: https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Public Pages', () => {
  4  |   test('homepage should load correctly', async ({ page }) => {
  5  |     await page.goto('/');
  6  |     
  7  |     // Check main heading
> 8  |     await expect(page.getByRole('heading', { name: /Every service, coordinated for you/i })).toBeVisible();
     |                                                                                              ^ Error: expect(locator).toBeVisible() failed
  9  |     
  10 |     // Check CTAs
  11 |     await expect(page.locator('#hero-explore-services')).toBeVisible();
  12 |     await expect(page.locator('#hero-send-enquiry')).toBeVisible();
  13 |   });
  14 | 
  15 |   test('services page should list categories and services', async ({ page }) => {
  16 |     await page.goto('/services');
  17 |     
  18 |     // Check heading
  19 |     await expect(page.getByRole('heading', { name: /Our Services/i })).toBeVisible();
  20 |   });
  21 | 
  22 |   test('contact form should validate required fields', async ({ page }) => {
  23 |     await page.goto('/contact');
  24 |     
  25 |     // Try to submit without filling
  26 |     await page.getByRole('button', { name: /Send Message/i }).click();
  27 |     
  28 |     // Should show validation errors
  29 |     await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
  30 |     await expect(page.getByText('Valid email address is required')).toBeVisible();
  31 |   });
  32 | });
  33 | 
```