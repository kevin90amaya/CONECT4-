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
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();

    const modal = page.locator('.modal-overlay');
    const addPlayerButton = modal.locator('#addPlayer');
    await addPlayerButton.click();

    const newPlayerItem = modal.locator('.player-item').last();
    await newPlayerItem.locator('.player-name').fill('PlayerToRemove');
    await newPlayerItem.locator('.player-color').selectOption('BLUE');

    await page.click('#savePlayers');

    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();
    await expect(modal.locator('.player-item')).toHaveCount(3);

    await modal.locator('.player-item').first().locator('.remove-player').click();

    await page.click('#savePlayers');

    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();
    await expect(modal.locator('.player-item')).toHaveCount(2);

    await page.click('#cancelEdit');
  });

  test('Debería mostrar un error si se intenta guardar un nombre duplicado y no aplicar los cambios', async ({ page }) => {
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();

    const modal = page.locator('.modal-overlay');
    const player1NameInput = modal.locator('.player-item').first().locator('.player-name');
    const player2NameInput = modal.locator('.player-item').last().locator('.player-name');

    const player1Name = await player1NameInput.inputValue();
    const player2NameOriginal = await player2NameInput.inputValue();

    await player2NameInput.fill(player1Name);

    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('ya está en uso');
      await dialog.dismiss();
    });

    await page.click('#savePlayers');

    await page.click('#cancelEdit');

    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();
    await expect(player2NameInput).toHaveValue(player2NameOriginal);

    await page.click('#cancelEdit');
  });

  test('Debería mostrar un error si se intenta guardar un color duplicado y no aplicar los cambios', async ({ page }) => {
    await page.goto('/');
    await page.locator('button.option', { hasText: 'Editar Configuracion' }).click();
    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();

    const modal = page.locator('.modal-overlay');
    const player1ColorSelect = modal.locator('.player-item').first().locator('.player-color');
    const player2ColorSelect = modal.locator('.player-item').last().locator('.player-color');

    const player1Color = await player1ColorSelect.inputValue();
    const player2ColorOriginal = await player2ColorSelect.inputValue();


    await player2ColorSelect.selectOption(player1Color);


    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('ya está en uso');
      await dialog.dismiss();
    });

    await page.click('#savePlayers');

    await page.click('#cancelEdit');

    await page.locator('button.option', { hasText: 'Editar Jugadores' }).click();
    await expect(player2ColorSelect).toHaveValue(player2ColorOriginal);

    await page.click('#cancelEdit');
  });

});
