import { test, expect } from '@playwright/test';
import MainMenuPage from '../pages/MainMenuPage.js';
import PlayersConfigPage from '../pages/PlayersConfigPage.js';

test.describe('Configuración de Jugadores', { tag: ['@menu', '@e2e'] }, () => {
  let mainMenu;
  let playersConfig;

  test.beforeEach(async ({ page }) => {
    mainMenu = new MainMenuPage(page);
    playersConfig = new PlayersConfigPage(page);
  });

  test.afterEach(async ({ page }) => {
    mainMenu = new MainMenuPage(page);
    await mainMenu.goto();
    await mainMenu.openEditConfig();
    await mainMenu.resetPlayers();
  });

  test('Debería abrir y cerrar correctamente el modal de configuración de jugadores', async ({ page }) => {
    await mainMenu.navigateToPlayersConfig();
    await expect(playersConfig.modal).toBeVisible();
    await playersConfig.cancel();
    await expect(playersConfig.modal).not.toBeVisible();
  });

  test('Debería modificar los nombres de los jugadores y verificar que se guardan en el servidor backend', async ({ page }) => {
    await mainMenu.navigateToPlayersConfig();
    const newName = 'PlaywrightP1';
    await playersConfig.setPlayerName(0, newName);
    await playersConfig.save();
    await mainMenu.openEditPlayers();
    await expect(playersConfig.getPlayerNameInput(0)).toHaveValue(newName);
    await playersConfig.cancel();
  });

  test('Debería cambiar el color de un jugador y verificar que se guarda', async ({ page }) => {
    await mainMenu.navigateToPlayersConfig();
    await playersConfig.setPlayerColor(0, 'BLUE');
    await playersConfig.save();
    await mainMenu.openEditPlayers();
    await expect(playersConfig.getPlayerColorSelect(0)).toHaveValue('BLUE');
    await playersConfig.cancel();
  });

  test('Debería cambiar el tipo del jugador y verificar que se guarda', async ({ page }) => {
    await mainMenu.navigateToPlayersConfig();
    await playersConfig.setPlayerType(0, 'COMPUTER');
    await playersConfig.save();
    await mainMenu.openEditPlayers();
    await expect(playersConfig.getPlayerTypeSelect(0)).toHaveValue('COMPUTER');
    await playersConfig.cancel();
  });

  test('Debería agregar un jugador y verificar que se guarda', async ({ page }) => {
    await mainMenu.navigateToPlayersConfig();
    await playersConfig.addPlayer();
    const playerCount = await playersConfig.getPlayerCount();
    await playersConfig.setPlayerName(playerCount - 1, 'NewPlayer');
    await playersConfig.setPlayerColor(playerCount - 1, 'BLUE');
    await playersConfig.save();
    await mainMenu.openEditPlayers();
    await expect(playersConfig.getPlayerNameInput(playerCount - 1)).toHaveValue('NewPlayer');
    await playersConfig.cancel();
  });

  test('Debería eliminar un jugador y verificar que se guarda', async ({ page }) => {
    await mainMenu.navigateToPlayersConfig();
    await playersConfig.addPlayer();
    const playerCount = await playersConfig.getPlayerCount();
    await playersConfig.setPlayerName(playerCount - 1, 'PlayerToRemove');
    await playersConfig.setPlayerColor(playerCount - 1, 'BLUE');
    await playersConfig.save();
    await mainMenu.openEditPlayers();
    await expect(playersConfig.modal.locator('.player-item')).toHaveCount(3);
    await playersConfig.removePlayer(0);
    await playersConfig.save();
    await mainMenu.openEditPlayers();
    await expect(playersConfig.modal.locator('.player-item')).toHaveCount(2);
    await playersConfig.cancel();
  });

  test('Debería mostrar un error si se intenta guardar un nombre duplicado y no aplicar los cambios', async ({ page }) => {
    await mainMenu.navigateToPlayersConfig();
    const player1Name = await playersConfig.getPlayerNameInput(0).inputValue();
    const player2NameOriginal = await playersConfig.getPlayerNameInput(1).inputValue();
    await playersConfig.setPlayerName(1, player1Name);
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('ya está en uso');
      await dialog.dismiss();
    });
    await playersConfig.save();
    await playersConfig.cancel();
    await mainMenu.openEditPlayers();
    await expect(playersConfig.getPlayerNameInput(1)).toHaveValue(player2NameOriginal);
    await playersConfig.cancel();
  });

  test('Debería mostrar un error si se intenta guardar un color duplicado y no aplicar los cambios', async ({ page }) => {
    await mainMenu.navigateToPlayersConfig();
    const player1Color = await playersConfig.getPlayerColorSelect(0).inputValue();
    const player2ColorOriginal = await playersConfig.getPlayerColorSelect(1).inputValue();
    await playersConfig.setPlayerColor(1, player1Color);
    page.once('dialog', async dialog => {
      expect(dialog.message()).toContain('ya está en uso');
      await dialog.dismiss();
    });
    await playersConfig.save();
    await playersConfig.cancel();
    await mainMenu.openEditPlayers();
    await expect(playersConfig.getPlayerColorSelect(1)).toHaveValue(player2ColorOriginal);
    await playersConfig.cancel();
  });

});
