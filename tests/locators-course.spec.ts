// Ex 1: Interacțiunea cu formularul de tip Block

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






// Ex 2: Exercițiul nou cu filtrare după elementul copil (textarea)
test('filtrare card dupa textarea', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/forms/layouts');
  
    // Aplicăm logica de filtrare din exercițiu
    const cardWithTextarea = page.locator('nb-card').filter({
      has: page.locator('textarea')
    });
  
    // Aserțiunile cerute în task
    await expect(cardWithTextarea).toHaveCount(1);
    await expect(cardWithTextarea.locator('nb-card-header')).toHaveText('Form without labels');
    
    // Opțional: Poți adăuga și o interacțiune mică pentru a confirma că e activ
    await cardWithTextarea.locator('textarea').fill('Test finalizat cu succes!');
  });




  // Ex 3: Lucrul cu liste de elemente (first, last, count)

  test('lucru cu multiple campuri de email', async ({ page }) => {
    await page.goto('http://localhost:4200/pages/forms/layouts');
  
    // 1. Definim locatorul generic pentru toate input-urile de tip email
    const emailFields = page.locator('input[type="email"]');
  
    // 2. Task (a): Verificăm că există exact 4 astfel de câmpuri
    await expect(emailFields).toHaveCount(4);
  
    // 3. Task (b): Completăm PRIMUL câmp
    const firstEmail = emailFields.first();
    await firstEmail.fill('first@email.com');
  
    // 4. Task (c): Completăm ULTIMUL câmp
    const lastEmail = emailFields.last();
    await lastEmail.fill('last@email.com');
  
    // 5. Task (d): Verificăm că ambele valori au fost setate corect
    await expect(firstEmail).toHaveValue('first@email.com');
    await expect(lastEmail).toHaveValue('last@email.com');
  });