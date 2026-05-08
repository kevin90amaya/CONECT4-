import YesNoDialog from "../../utils/yesNoDialog.js";
import Message from "../../Messages/Message.js";
import ControllerBoard from "../../board/controllers/ControllerBoard.js";
import ControllerPlayers from "../../players/controllers/ControllerPlayers.js";
import { ENDPOINTS } from "../../api/endpoints.js";

class ControllerGame {

    constructor() {
        this.controllerBoard = new ControllerBoard();
        this.controllerPlayers = new ControllerPlayers();
        this.boardView = this.controllerBoard.getboardView();
        this.playerView = this.controllerPlayers.getPlayerView();
        this.resultStrategy = {
            "NEXT_TURN": () => this.resolveNextTurn(),
            "WIN": () => this.resolveWin(),
            "DRAW": () => this.resolveDraw(),
            "COLUMN_IS_COMPLETE": () => this.resolveColumnIsComplete()
        };
    }
    
   async initialize() {
        await this.controllerBoard.initialize();
        await this.controllerPlayers.initialize();
    }

    async getboard() {
        await this.controllerBoard.getboard();
        return this.controllerBoard.board;
    }
    
    async playGames() {
        const continueDialog = new YesNoDialog();
        do {
            this.boardView.showTitle();
           await this.resolveSelectionMode();
            this.boardView.showBoard();
            let result;
            do{
                result = await this.playTurn();
                await this.refreshBoard();
            } while (!this.isEndGame(result));
            
            await this.resetGame();
            await this.controllerBoard.initialize();

           await continueDialog.read(Message.getInstance().getMessages("CONTINUE_DIALOG").ask_question);
        } while (continueDialog.isAffirmative());
    }
    

    async resolveSelectionMode() {
        await this.controllerPlayers.selectAndProcessMode();
    }

    async playTurn() {
    const result = await this.controllerPlayers.playTurnForCurrentPlayer();
    await this.resolveResult(result);
    return result;
}

    isEndGame(result) {
        return result.status === "WIN" || result.status === "DRAW";
    }

    async resolveResult(result) {
        const strategy = this.resultStrategy[result.status];
        if(!strategy) {
            throw new Error(`Unsupported result status: ${result.status}`);
        }
        await strategy();
    }

    async resolveNextTurn(){
        await this.controllerPlayers.getCurrentPlayer();
        this.playerView.showTurn();
    }
    
    async resolveWin(){
        this.playerView.showWin();
    }
    
    async resolveDraw(){
        this.playerView.showDraw();
    }
    
    async resolveColumnIsComplete(){
        this.playerView.showColumnIsComplete();
    }

    async refreshBoard(){
        await this.controllerBoard.getboard();
        this.controllerBoard.setBoard();
        this.boardView.showBoard();
    }
    
    async resetGame() {
    const response = await fetch(ENDPOINTS.RESET, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
    });
    if (!response.ok) {
        throw new Error('Failed to reset game');
    }
    
}


    
}
export default ControllerGame;