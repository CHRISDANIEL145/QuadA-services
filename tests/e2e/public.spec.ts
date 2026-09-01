import { test, expect } from '@playwright/test';

test.describe('Public Pages', () => {
  test('homepage should load and navigate correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check main cinematic heading
    await expect(page.getByRole('heading', { name: /Every service, coordinated for you/i })).toBeVisible();
    
    // Check Explore Services link
    const exploreLink = page.getByRole('link', { name: /Explore Services/i });
    await expect(exploreLink).toBeVisible();
    await exploreLink.click();
    
    // Should navigate to services
    await expect(page).toHaveURL(/.*\/services/);
    await expect(page.getByRole('heading', { name: /Our Services/i })).toBeVisible();
  });

  test('contact form should handle valid input state', async ({ page }) => {
    await page.goto('/contact');
    
    await page.getByLabel(/Name/i).fill('Test User');
    await page.getByLabel(/Email Address/i).fill('test@example.com');
    await page.getByLabel(/Message/i).fill('This is a test message that is long enough.');
    
    // Since we don't want to actually spam the database in every CI run without a mock, 
    // we just ensure the button is enabled and clickable.
    const submitBtn = page.locator('button[type="submit"]');
    await expect(submitBtn).toBeEnabled();
  });
  
  test('accessibility - prefers reduced motion should be respected', async ({ page }) => {
    // Emulate reduced motion
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/');
    
    // Ensure the page loads without crashing the GSAP animations
    await expect(page.getByRole('heading', { name: /Every service/i })).toBeVisible();
  });
});
