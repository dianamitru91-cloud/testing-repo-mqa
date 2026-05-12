import { test, expect } from '@playwright/test';

test('interactiune cu Block form', async ({ page }) => {
  // 1. Navigăm către pagina de formulare
  await page.goto('http://localhost:4200/pages/forms/layouts');

  // 2. Localizăm cardul "Block form"
  // Folosim hasText pentru a identifica exact containerul corect
  const blockForm = page.locator('nb-card').filter({ hasText: "Block form" });

  // 3. Completăm câmpurile de text
  // Folosim placeholder-ele deoarece sunt unice în acest formular
  await blockForm.getByPlaceholder('First Name').fill('Ada');
  await blockForm.getByPlaceholder('Last Name').fill('Lovelace');
  await blockForm.getByPlaceholder('Website').fill('https://ada.dev');

  // NOTĂ: Am eliminat checkbox-ul deoarece acesta se află în "Basic form", nu aici.

  // 4. Apăsăm butonul de Submit
  // Căutăm butonul doar în interiorul acestui card
  await blockForm.getByRole('button', { name: "Submit" }).click();

  // 5. Verificare finală (Assertion)
  // Confirmăm că valorile au fost introduse corect
  await expect(blockForm.getByPlaceholder('First Name')).toHaveValue('Ada');
  await expect(blockForm.getByPlaceholder('Last Name')).toHaveValue('Lovelace');
});