import GameView from "../views/GameView.js";
import ControllerBoard from "../../board/controllers/ControllerBoard.js";
import ControllerPlayers from "../../players/controllers/ControllerPlayers.js";

class ControllerGame {

    constructor() {
        this.controllerBoard = new ControllerBoard();
        this.controllerPlayers = new ControllerPlayers();
        this.gameView = new GameView();
    }
    
   async initialize() {
        await this.controllerBoard.initialize();
        await this.controllerPlayers.initialize();
        this.gameView.setBoardView(this.controllerBoard.boardView);
        this.gameView.setPlayerView(this.controllerPlayers.playerView);
        await this.gameView.playGames();
    }
    
    
}
export default ControllerGame;