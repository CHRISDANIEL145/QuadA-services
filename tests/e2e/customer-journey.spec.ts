import { test, expect } from '@playwright/test';

test('Complete customer lead journey', async ({ page }) => {
  // 1. Homepage loads
  await page.goto('/');
  await expect(page.getByRole('heading', { name: /Elevating/i }).first()).toBeVisible();
  
  // 2. Browse services
  const browseLink = page.getByRole('link', { name: /Become a Member/i }).first();
  await browseLink.click();
  
  // We expect the services page to load.
  await expect(page.getByRole('heading', { name: /All Services/i })).toBeVisible();
  
  // 3. Open service detail
  const requestLink = page.getByRole('link', { name: /Request/i }).first();
  await requestLink.click();
  
  await expect(page).toHaveURL(/.*\/enquiry/);
  
  // 4. Fill enquiry form
  // Step 2
  await expect(page.getByText('Your Details')).toBeVisible();
  await page.getByLabel(/Full Name/i).fill('Test Journey Customer');
  await page.getByLabel(/Mobile Number/i).fill('9876543210');
  await page.getByLabel(/City \/ Area/i).fill('Tirunelveli');
  await page.getByRole('button', { name: /Continue/i }).click();

  // Step 3
  await expect(page.getByText('Service Details')).toBeVisible();
  const selects = await page.locator('select.form-input').all();
  for (const select of selects) {
    const opts = await select.locator('option').allInnerTexts();
    if (opts.length > 1) {
      await select.selectOption({ label: opts[1] });
    }
  }
  await page.getByRole('button', { name: /Continue/i }).click();

  // Step 4
  await expect(page.getByText('Schedule & Budget')).toBeVisible();
  await page.getByRole('button', { name: /Continue/i }).click();

  // Step 5
  await expect(page.getByText('Your Requirement & Attachments')).toBeVisible();
  await page.getByLabel(/Describe Your Requirement/i).fill('Need this test requirement fulfilled in Tirunelveli.');
  
  // 5. Submit form
  const submitBtn = page.getByRole('button', { name: /Submit Enquiry/i });
  await expect(submitBtn).toBeEnabled();
  await submitBtn.click();
  
  // 6. Verify success (lead number appears)
  await page.waitForTimeout(2000);
  await page.screenshot({ path: 'test-failure.png' });
  await expect(page.getByText(/LEAD-\d{6}/).first()).toBeVisible({ timeout: 10000 });
});