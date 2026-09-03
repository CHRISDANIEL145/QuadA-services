import { test, expect } from '@playwright/test';

test.describe('Enquiry Form Flow', () => {
  test('multi-step enquiry form validates and allows submission', async ({ page }) => {
    // 1. Start from the services page
    await page.goto('/services');
    
    // We expect the services page to load.
    await expect(page.getByRole('heading', { name: /All Services/i })).toBeVisible();

    // 2. Click on the first "Request This Service" link
    const requestLink = page.getByRole('link', { name: /Request/i }).first();
    await expect(requestLink).toBeVisible();
    await requestLink.click();
    
    // 3. We should now be on the enquiry page for that service
    await expect(page).toHaveURL(/.*\/enquiry/);
    
    // Since we came from a specific service, we start at Step 2 (Your Details)
    await expect(page.getByText('Your Details')).toBeVisible();

    // Try to go next without filling required fields
    await page.getByRole('button', { name: /Continue/i }).click();
    
    // Validation messages should appear
    await expect(page.getByText(/Name must be at least 2 characters/i).first()).toBeVisible();
    await expect(page.getByText(/10-digit Indian mobile number/i)).toBeVisible();

    // Fill Step 2 correctly
    await page.getByLabel(/Full Name/i).fill('Playwright Tester');
    await page.getByLabel(/Mobile Number/i).fill('9876543210');
    await page.getByLabel(/City \/ Area/i).fill('Tirunelveli');
    await page.getByLabel(/Email Address/i).fill('tester@example.com');
    await page.getByLabel(/Full Address/i).fill('123 Test Street');

    // Proceed to Step 3 (Service Details)
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText('Service Details')).toBeVisible();

    // Step 3 dynamic fields
    const selects = await page.locator('select.form-input').all();
    for (const select of selects) {
      const options = await select.locator('option').allInnerTexts();
      if (options.length > 1) {
        await select.selectOption({ label: options[1] });
      }
    }

    // Proceed to Step 4 (Schedule & Budget)
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText('Schedule & Budget')).toBeVisible();

    // Proceed to Step 5 (Requirement & Attachments)
    await page.getByRole('button', { name: /Continue/i }).click();
    await expect(page.getByText('Your Requirement & Attachments')).toBeVisible();

    // Fill the required requirement text
    await page.getByLabel(/Describe Your Requirement/i).fill('This is an automated test requirement description. It should be long enough to pass validation.');

    // Since we don't want to actually spam the DB, we just ensure the submit button is enabled
    const submitBtn = page.getByRole('button', { name: /Submit Enquiry/i });
    await expect(submitBtn).toBeEnabled();
  });
  
  test('file upload validation', async ({ page }) => {
    // Go to the services page and click the first service to enter the flow
    await page.goto('/services');
    const requestLink = page.getByRole('link', { name: /Request/i }).first();
    await expect(requestLink).toBeVisible();
    await requestLink.click();
    
    // Step 2
    await expect(page.getByText('Your Details')).toBeVisible();
    await page.getByLabel(/Full Name/i).fill('Test Upload');
    await page.getByLabel(/Mobile Number/i).fill('9999999999');
    await page.getByLabel(/City \/ Area/i).fill('Tuticorin');
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
    
    // Step 5: Attachments
    await expect(page.getByText('Your Requirement & Attachments')).toBeVisible();
    
    // Wait for the file input to be attached
    const fileInput = page.locator('input[type="file"]');
    
    // Create a dummy file that exceeds 5MB
    const largeBuffer = Buffer.alloc(6 * 1024 * 1024, 'a');
    await fileInput.setInputFiles({
      name: 'large-file.pdf',
      mimeType: 'application/pdf',
      buffer: largeBuffer
    });
    
    // Should show error message for exceeding 5MB
    await expect(page.getByText(/exceeds 5MB/i)).toBeVisible();
    
    // Create a dummy file with unsupported type
    await fileInput.setInputFiles({
      name: 'script.exe',
      mimeType: 'application/x-msdownload',
      buffer: Buffer.from('dummy exe content')
    });
    
    // Should show error message for not allowed type
    await expect(page.getByText(/type not allowed/i)).toBeVisible();
  });
});