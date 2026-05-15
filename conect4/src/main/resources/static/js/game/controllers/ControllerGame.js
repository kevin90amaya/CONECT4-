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

    async getListPlayers() {
         const listPlayers = await this.controllerPlayers.getListPlayers();
         return listPlayers;
    }

    async getboard() {
        await this.controllerBoard.getboard();
        return this.controllerBoard.board;
    }

    async updateBoard() {
        await this.controllerBoard.getboard();
        this.controllerBoard.setBoard();
    }
    
    async playGames() {
        const continueDialog = new YesNoDialog();
        do {
            await this.updateBoard();
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

    cleanGame() {
        const gameContainer = document.querySelector('.game-container');
        gameContainer.innerHTML = `
        <div class="game-title">
            <h1></h1>
        </div>
        <div class="game-frame">
            <div class="mode"></div>
            <div class="board-container">
                <div class="board"></div>
            </div>
            <div class="status">
                <h4></h4>
                <p></p>
            </div>
        </div>`;
    }
    
    async getNumberOfPlayers() {
        return await this.controllerPlayers.getNumberOfPlayers();
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