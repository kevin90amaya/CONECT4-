import { test, expect } from '@playwright/test';

test.describe('Configuración de Jugadores', { tag: ['@menu', '@e2e'] }, () => {

  test.afterEach(async ({ page }) => {
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Resetear Jugadores' }).click();
  });

  test('Debería abrir y cerrar correctamente el modal de configuración de jugadores', async ({ page }) => {
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();

    const modal = page.locator('.modal-overlay');
    await expect(modal).toBeVisible();

    await page.click('#cancelEdit');
    await expect(modal).not.toBeVisible();
  });

  test('Debería modificar los nombres de los jugadores y verificar que se guardan en el servidor backend', async ({ page }) => {
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();

    const modal = page.locator('.modal-overlay');
    const player1NameInput = modal.locator('.player-item').first().locator('.player-name');
    const newName = 'PlaywrightP1';

    await player1NameInput.fill(newName);
    await page.click('#savePlayers');

    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();
    await expect(player1NameInput).toHaveValue(newName);

    await page.click('#cancelEdit');
  });

  test('Debería cambiar el color de un jugador y verificar que se guarda', async ({ page }) => {
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();

    const modal = page.locator('.modal-overlay');
    const player1ColorSelect = modal.locator('.player-item').first().locator('.player-color');

    await player1ColorSelect.selectOption('BLUE');
    await page.click('#savePlayers');

    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();
    await expect(player1ColorSelect).toHaveValue('BLUE');

    await page.click('#cancelEdit');
  });

  test('Debería cambiar el tipo del jugador y verificar que se guarda', async ({ page }) => {
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();

    const modal = page.locator('.modal-overlay');
    const player1TypeSelect = modal.locator('.player-item').first().locator('.player-type');
    await player1TypeSelect.selectOption('COMPUTER');

    await page.click('#savePlayers');

    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();
    await expect(player1TypeSelect).toHaveValue('COMPUTER');

    await page.click('#cancelEdit');
  });

  test('Debería agregar un jugador y verificar que se guarda', async ({ page }) => {
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();

    const modal = page.locator('.modal-overlay');
    const addPlayerButton = modal.locator('#addPlayer');

    await addPlayerButton.click();

    const newPlayerNameInput = modal.locator('.player-item').last().locator('.player-name');
    await newPlayerNameInput.fill('NewPlayer');
    const colorNewPlayer = modal.locator('.player-item').last().locator('.player-color');
    await colorNewPlayer.selectOption('BLUE');
    await page.click('#savePlayers');

    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();
    await expect(modal.locator('.player-item').last().locator(".player-name")).toHaveValue('NewPlayer');

    await page.click('#cancelEdit');
  });

  test('Debería eliminar un jugador y verificar que se guarda', async ({ page }) => {

  });

  test('Debería mostrar un error si se intenta guardar un nombre duplicado y no aplicar los cambios', async ({ page }) => {
  });

  test('Debería mostrar un error si se intenta guardar un color duplicado y no aplicar los cambios', async ({ page }) => {
  });

});
