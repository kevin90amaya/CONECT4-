import YesNoDialog from "../../utils/YesNoDialog.js";
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
            this.clean();
            this.controllerBoard.controllerToggleButton.render();
            document.dispatchEvent(new CustomEvent('juego-comenzo'));
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
        this.clean();
        this.cleanGame();
    }
    
    clean(){
        this.boardView.cleanBoard();
        this.playerView.cleanStatus();
    }

    cleanGame() {
        // Vaciamos el texto y contenido sin destruir los contenedores
        const gameTitle = document.querySelector('.game-title h1');
        if (gameTitle) gameTitle.textContent = '';

        const mode = document.querySelector('.mode');
        if (mode) mode.innerHTML = '';

        const status = document.querySelector('.status');
        if (status) status.innerHTML = `<h4></h4><p></p>`;

        const toggleContainer = document.querySelector('.toggle-container');
        if (toggleContainer) toggleContainer.remove(); // Lo quitamos para que no se vea en el menú principal
        
        this.boardView.cleanBoard();
    }
    
    async getNumberOfPlayers() {
        return await this.controllerPlayers.getNumberOfPlayers();
    }
    
    async resolveSelectionMode() {
        await this.controllerPlayers.selectAndProcessMode();
        document.dispatchEvent(new CustomEvent('resolvemode'));
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
        document.dispatchEvent(new CustomEvent('game-drop'));
        await this.controllerPlayers.getCurrentPlayer();
        this.playerView.showTurn();
    }
    
    async resolveWin(){
        document.dispatchEvent(new CustomEvent('game-win'));
        this.playerView.showWin();
    }
    
    async resolveDraw(){
        document.dispatchEvent(new CustomEvent('game-draw'));
        this.playerView.showDraw();
    }
    
    async resolveColumnIsComplete(){
        document.dispatchEvent(new CustomEvent('game-error'));
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