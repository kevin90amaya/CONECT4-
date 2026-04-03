
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

    async getPlayers() {
        const players = await fetch(ENDPOINTS.PLAYERS);
        const data = await players.json();
        this.playerView.setPlayer(data);
    }

    async initialize() {
        await this.getGameModes();
        await this.getPlayers();
        this.playerView.initialize();
    }


}
export default ControllerPlayers;