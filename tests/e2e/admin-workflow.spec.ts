import { test, expect } from '@playwright/test';

test.describe('Admin Workflow', () => {
  // Use a slightly longer timeout for login + dashboard load
  test.setTimeout(60000);

  test('Admin lead management workflow', async ({ page }) => {
    // 1. Admin login
    await page.goto('/admin/login');
    
    // Only run this test if we have credentials, otherwise skip
    const email = process.env.TEST_ADMIN_EMAIL;
    const password = process.env.TEST_ADMIN_PASSWORD;
    
    if (!email || !password) {
      test.skip(true, 'No TEST_ADMIN_EMAIL or TEST_ADMIN_PASSWORD provided in environment');
      return;
    }

    await page.getByLabel(/Email/i).fill(email);
    await page.getByLabel(/Password/i).fill(password);
    await page.getByRole('button', { name: /Sign In/i }).click();
    
    await page.waitForURL('**/admin');
    
    // 2. Verify dashboard shows leads summary
    await expect(page.getByText('Total Leads')).toBeVisible();
    
    // 3. Navigate to leads
    const leadsLink = page.getByRole('link', { name: /Leads/i });
    await expect(leadsLink).toBeVisible();
    await leadsLink.click();
    
    await expect(page).toHaveURL(/.*\/admin\/leads/);
    await expect(page.getByRole('heading', { name: /Leads/i })).toBeVisible();
    
    // Check if there are leads in the table
    const tableBody = page.locator('tbody');
    await expect(tableBody).toBeVisible();
    
    const rows = tableBody.locator('tr');
    const rowCount = await rows.count();
    
    if (rowCount > 0 && !(await page.getByText('No leads found').isVisible())) {
      // 4. Open lead
      const firstRow = rows.first();
      await firstRow.click();
      
      await expect(page).toHaveURL(/.*\/admin\/leads\/.+/);
      await expect(page.getByText(/Customer Information/i)).toBeVisible();
      
      // 5. Add note (safest operation to test without messing up statuses too much)
      const noteInput = page.getByPlaceholder(/Add a note/i);
      if (await noteInput.count() > 0) {
        await noteInput.fill('Playwright test note - checking CRM functionality');
        await page.getByRole('button', { name: 'Add Note' }).click();
        
        // Wait for the note to appear in the list (or a success toast)
        await expect(page.getByText('Playwright test note - checking CRM functionality')).toBeVisible();
      }
    }
  });
});
