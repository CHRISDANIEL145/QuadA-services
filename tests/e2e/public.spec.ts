import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {
  test('homepage should load correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check main heading (Playwright gets text content directly, bypassing span tags)
    await expect(page.getByRole('heading', { name: /Every service, coordinated for you./i })).toBeVisible();
    
    // Check CTAs
    await expect(page.locator('#hero-explore-services')).toBeVisible();
    await expect(page.locator('#hero-send-enquiry')).toBeVisible();
  });

  test('services page should list categories and services', async ({ page }) => {
    await page.goto('/services');
    
    // Check heading
    await expect(page.getByRole('heading', { name: /Our Services/i })).toBeVisible();
  });

  test('contact form should validate required fields', async ({ page }) => {
    await page.goto('/contact');
    
    // Try to submit without filling
    await page.getByRole('button', { name: /Send Message/i }).click();
    
    // Should show validation errors
    await expect(page.getByText('Name must be at least 2 characters')).toBeVisible();
    await expect(page.getByText('Please enter a valid email address')).toBeVisible();
  });
});
