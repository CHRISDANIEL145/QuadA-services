import { test, expect } from '@playwright/test';

test.describe('Admin Authentication & Routing', () => {
  test('admin dashboard should redirect to login if unauthenticated', async ({ page }) => {
    await page.goto('/admin');
    
    // Should be redirected to login page
    await expect(page).toHaveURL(/.*\/admin\/login/);
    await expect(page.getByRole('heading', { name: /Sign in to continue/i })).toBeVisible();
  });
  
  test('login page should validate empty inputs', async ({ page }) => {
    await page.goto('/admin/login');
    
    // Click submit without entering anything
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    // Zod validation should kick in
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
    await expect(page.getByText('Password must be at least 6 characters')).toBeVisible();
  });
});

test.describe('Admin Dashboard UI (Mocked/Unauthenticated view)', () => {
  test('unauthorized users cannot access CRM leads', async ({ page }) => {
    await page.goto('/admin/leads');
    await expect(page).toHaveURL(/.*\/admin\/login/);
  });
  
  test('unauthorized users cannot access CRM services', async ({ page }) => {
    await page.goto('/admin/services');
    await expect(page).toHaveURL(/.*\/admin\/login/);
  });
  
  test('unauthorized users cannot access CRM categories', async ({ page }) => {
    await page.goto('/admin/categories');
    await expect(page).toHaveURL(/.*\/admin\/login/);
  });
});
