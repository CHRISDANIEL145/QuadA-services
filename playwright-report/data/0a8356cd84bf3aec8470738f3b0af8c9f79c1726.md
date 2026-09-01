# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> Admin Authentication & Routing >> admin dashboard should redirect to login if unauthenticated
- Location: tests\e2e\admin.spec.ts:4:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: /Admin Login/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: /Admin Login/i })

```

```yaml
- text: Q
- heading "QuadA Services" [level=1]
- paragraph: Admin Portal
- heading "Sign in to continue" [level=2]
- form "Admin login form":
  - text: Email Address
  - textbox "Email Address":
    - /placeholder: admin@quadaservices.com
  - text: Password
  - textbox "Password":
    - /placeholder: ••••••••
  - button "Show password":
    - img
  - button "Sign In"
- paragraph: Admin access only. Customer registration is not available.
- alert
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Admin Authentication & Routing', () => {
  4  |   test('admin dashboard should redirect to login if unauthenticated', async ({ page }) => {
  5  |     await page.goto('/admin');
  6  |     
  7  |     // Should be redirected to login page
  8  |     await expect(page).toHaveURL(/.*\/admin\/login/);
> 9  |     await expect(page.getByRole('heading', { name: /Admin Login/i })).toBeVisible();
     |                                                                       ^ Error: expect(locator).toBeVisible() failed
  10 |   });
  11 | });
  12 | 
```