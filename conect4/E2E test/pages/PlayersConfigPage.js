class PlayersConfigPage {
  constructor(page) {
    this.page = page;
    this.modal = page.locator('.modal-overlay');
    this.saveButton = page.locator('#savePlayers');
    this.cancelButton = page.locator('#cancelEdit');
    this.addPlayerButton = page.locator('#addPlayer');
  }

  async waitForModal() {
    await this.modal.waitFor({ state: 'visible' });
  }

  async isModalVisible() {
    return await this.modal.isVisible();
  }

  async save() {
    await this.saveButton.click();
  }

  async cancel() {
    await this.cancelButton.click();
  }

  async addPlayer() {
    await this.addPlayerButton.click();
  }

  getPlayerItem(index) {
    return this.modal.locator('.player-item').nth(index);
  }

  getPlayerNameInput(index) {
    return this.getPlayerItem(index).locator('.player-name');
  }

  getPlayerColorSelect(index) {
    return this.getPlayerItem(index).locator('.player-color');
  }

  getPlayerTypeSelect(index) {
    return this.getPlayerItem(index).locator('.player-type');
  }

  getRemovePlayerButton(index) {
    return this.getPlayerItem(index).locator('.remove-player');
  }

  async setPlayerName(index, name) {
    await this.getPlayerNameInput(index).fill(name);
  }

  async setPlayerColor(index, color) {
    await this.getPlayerColorSelect(index).selectOption(color);
  }

  async setPlayerType(index, type) {
    await this.getPlayerTypeSelect(index).selectOption(type);
  }

  async removePlayer(index) {
    await this.getRemovePlayerButton(index).click();
  }

  async getPlayerCount() {
    return await this.modal.locator('.player-item').count();
  }
}

export default PlayersConfigPage;
