
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
        document.addEventListener('selectMode', async (e) => {
            const modoSeleccionado = e.detail.mode;
            
            await fetch(ENDPOINTS.MODE, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(modoSeleccionado)
            });

            this.playerView.showSelectedMode(modoSeleccionado);
    
        });
    }


}
export default ControllerPlayers;