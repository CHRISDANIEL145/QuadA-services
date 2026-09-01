# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public.spec.ts >> Public Pages >> contact form should validate required fields
- Location: tests\e2e\public.spec.ts:22:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByText('Valid email address is required')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByText('Valid email address is required')

```

```yaml
- banner:
  - navigation "Main navigation":
    - link "QuadA Services — Home":
      - /url: /
      - text: Q QuadA Services
    - link "Home":
      - /url: /
    - link "Services":
      - /url: /services
    - link "Service Areas":
      - /url: /service-areas
    - link "About":
      - /url: /about
    - link "Contact":
      - /url: /contact
    - link "Call us":
      - /url: tel:+919999999999
      - img
      - text: +91 99999 99999
    - link "Explore Services":
      - /url: /services
      - text: Explore Services
      - img
- main:
  - heading "Get in touch." [level=1]
  - paragraph: Have a question or a specific requirement? Reach out and our team will respond promptly.
  - img
  - text: Phone
  - link "+91 99999 99999":
    - /url: tel:+919999999999
  - img
  - text: Email
  - link "hello@quadaservices.com":
    - /url: mailto:hello@quadaservices.com
  - img
  - text: Coverage Tamil Nadu, India
  - heading "Looking for a specific service?" [level=2]
  - paragraph: For service-specific enquiries, use our dedicated enquiry system for faster processing.
  - link "Browse all services":
    - /url: /services
    - text: Browse all services
    - img
  - heading "Send us a message" [level=2]
  - form "Contact form":
    - text: Name *
    - textbox "Name *":
      - /placeholder: Your full name
    - text: Name must be at least 2 characters Mobile Number
    - textbox "Mobile Number":
      - /placeholder: 10-digit mobile
    - text: Email Address *
    - textbox "Email Address *":
      - /placeholder: your@email.com
    - text: Please enter a valid email address Message *
    - textbox "Message *":
      - /placeholder: Tell us how we can help you…
    - text: Message must be at least 10 characters
    - button "Send Message":
      - text: Send Message
      - img
- contentinfo "Site footer":
  - text: Q QuadA Services
  - paragraph: Connecting you with trusted professionals for every home, office, and personal service need across Tamil Nadu.
  - link "+91 99999 99999":
    - /url: tel:+919999999999
    - img
    - text: +91 99999 99999
  - link "hello@quadaservices.com":
    - /url: mailto:hello@quadaservices.com
    - img
    - text: hello@quadaservices.com
  - img
  - text: Tamil Nadu, India
  - heading "Services" [level=3]
  - list:
    - listitem:
      - link "Home & Maintenance":
        - /url: /services/home-maintenance
        - img
        - text: Home & Maintenance
    - listitem:
      - link "Cleaning Services":
        - /url: /services/cleaning-housekeeping
        - img
        - text: Cleaning Services
    - listitem:
      - link "Senior Care":
        - /url: /services/senior-citizen-assistance
        - img
        - text: Senior Care
    - listitem:
      - link "Interior & Renovation":
        - /url: /services/interior-renovation
        - img
        - text: Interior & Renovation
    - listitem:
      - link "Real Estate":
        - /url: /services/real-estate-property
        - img
        - text: Real Estate
    - listitem:
      - link "Events & Travel":
        - /url: /services/event-travel-services
        - img
        - text: Events & Travel
  - heading "Company" [level=3]
  - list:
    - listitem:
      - link "About Us":
        - /url: /about
    - listitem:
      - link "Service Areas":
        - /url: /service-areas
    - listitem:
      - link "Contact":
        - /url: /contact
    - listitem:
      - link "Privacy Policy":
        - /url: /privacy
    - listitem:
      - link "Terms of Service":
        - /url: /terms
  - heading "Need a Service?" [level=3]
  - paragraph: Tell us what you need. Our team reviews every enquiry and responds promptly.
  - link "Send Enquiry":
    - /url: /contact
    - text: Send Enquiry
    - img
  - paragraph: © 2026 QuadA Services. All rights reserved.
  - link "Privacy":
    - /url: /privacy
  - link "Terms":
    - /url: /terms
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
  8  |     await expect(page.getByRole('heading', { name: /Every service, coordinated for you/i })).toBeVisible();
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
> 30 |     await expect(page.getByText('Valid email address is required')).toBeVisible();
     |                                                                     ^ Error: expect(locator).toBeVisible() failed
  31 |   });
  32 | });
  33 | 
```