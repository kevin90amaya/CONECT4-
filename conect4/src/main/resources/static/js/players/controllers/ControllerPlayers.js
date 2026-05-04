
import PlayerView from "../views/PlayerView.js";
import { ENDPOINTS } from "../../api/endpoints.js";

class ControllerPlayers {
    playerView;

    constructor() {
        this.playerView = new PlayerView();
    }
    
    getPlayerView() {
        return this.playerView;
    }

    async getGameModes() {
        const modes = await fetch(ENDPOINTS.GAME_MODES);
        const data = await modes.json();
        this.playerView.setGameMode(data);
    }

    async postGameMode(mode) {
        await fetch(ENDPOINTS.MODE, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(mode)
        });
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

    async playTurnForCurrentPlayer() {
    await this.getCurrentPlayer();

    if (this.playerView.currentPlayer.tipe === "HUMAN") {
        return await this.playerView.userplayerview.playTurn();
    } else {
        return await this.playerView.machineplayerview.playTurn();
    }
}

    async initialize() {
        await this.getGameModes();
    }

    async selectAndProcessMode() {
    this.playerView.showSelectMode();
    const mode = await this.waitForModeSelection();
    await this.processModeSelection(mode);
}

    async waitForModeSelection() {
    return new Promise((resolve) => {
        const handler = (e) => {
            document.removeEventListener('selectMode', handler);
            resolve(e.detail.mode);
        };
        document.addEventListener('selectMode', handler);
    });
}

    async processModeSelection(mode) {
        await this.postGameMode(mode);
        await this.getCurrentPlayer();
        this.updateViewForModeSelect(mode);
    }

    updateViewForModeSelect(mode) {
        this.playerView.showSelectedMode(mode);
        this.playerView.showTurn();
    }
}
export default ControllerPlayers;