import { test, expect } from '@playwright/test';

test.describe('Admin Authentication & Routing', () => {
  test('admin dashboard should redirect to login if unauthenticated', async ({ page }) => {
    await page.goto('/admin');
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/.*\/admin\/login/);
    await expect(page.getByRole('heading', { name: /Sign in to continue/i })).toBeVisible();
  });
});
