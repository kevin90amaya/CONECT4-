class MainMenuPage {
  constructor(page) {
    this.page = page;
    this.editConfigButton = page.locator('button.option', { hasText: 'Editar Configuracion' });
    this.editPlayersButton = page.locator('button.option', { hasText: 'Editar Jugadores' });
    this.editBoardButton = page.locator('button.option', { hasText: 'Editar Tablero' });
    this.resetPlayersButton = page.locator('button.option', { hasText: 'Resetear Jugadores' });
  }

  async goto() {
    await this.page.goto('/');
  }

  async openEditConfig() {
    await this.editConfigButton.click();
  }

  async openEditPlayers() {
    await this.editPlayersButton.click();
  }

  async openEditBoard() {
    await this.editBoardButton.click();
  }

  async resetPlayers() {
    await this.resetPlayersButton.click();
  }

  async navigateToPlayersConfig() {
    await this.goto();
    await this.openEditConfig();
    await this.openEditPlayers();
  }

  async navigateToBoardConfig() {
    await this.goto();
    await this.openEditConfig();
    await this.openEditBoard();
  }
}

export default MainMenuPage;
