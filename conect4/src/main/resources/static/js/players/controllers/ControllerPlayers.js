
import PlayerView from "../views/PlayerView.js";
import { ENDPOINTS } from "../../api/endpoints.js";

class ControllerPlayers {
    playerView;

    constructor() {
        this.playerView = new PlayerView();
    }

    async getGameModes() {
        const modes = await fetch(ENDPOINTS.GAME_MODES);
        const data = await modes.json();
        this.playerView.setGameMode(data);
    }

    async getListPlayers() {
        const players = await fetch(ENDPOINTS.LIST_PLAYERS);
        const data = await players.json();
        this.playerView.setListPlayer(data);
    }

    async getCurrentPlayer() {
        const player = await fetch(ENDPOINTS.CURRENT_PLAYER);
        const data = await player.json();
        this.playerView.setCurrentPlayer(data);
    }

    async initialize() {
        await this.getGameModes();
        await this.playerView.initialize();
        this.configEventSelectMode();
        await this.getListPlayers();
        await this.getCurrentPlayer();
    }

    configEventSelectMode() {
        document.addEventListener('selectMode', this.handleSelectMode.bind(this));
    }

    async handleSelectMode(e) {
        const mode = e.detail.mode;
        await this.postGameMode(mode);
        this.updateViewForModeSelect(mode);
    }

    async postGameMode(mode) {
        await fetch(ENDPOINTS.MODE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mode)
        });
    }

    updateViewForModeSelect(mode) {
        this.playerView.showSelectedMode(mode);
        this.playerView.showTurn();
    }
}
export default ControllerPlayers;