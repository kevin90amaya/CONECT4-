import GameView from "../views/GameView.js";
import ControllerBoard from "../../board/controllers/ControllerBoard.js";
import ControllerPlayers from "../../players/controllers/ControllerPlayers.js";

class ControllerGame {

    constructor() {
        this.gameView = new GameView();
        this.controllerBoard = new ControllerBoard();
        this.controllerPlayers = new ControllerPlayers();
    }
    
   async initialize() {
        await this.controllerBoard.initialize();
      //  this.controllerPlayers.initialize();
        this.gameView.initialize();
    }
    
    
}
export default ControllerGame;