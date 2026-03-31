import Message from "../../Messages/Message.js";
import GameState from "../../models/GameState.js";

class GameView {

    #game;
    #gameElement;

    constructor() {
        this.#game = null;
        this.#gameElement = document.querySelector('.game-container');
    }

    setGame(game) {
        this.#game = game;
    }
    
    initialize() {
        this.showTitle();
    }

    showTitle() {
        const template = Message.getInstance().getMessages("GameView").title;
        const title = template.replace("{numberToWin}", this.getNumberToWin());
        this.#gameElement.querySelector('.game-title h1').textContent = title;
    }

    getNumberToWin() {
        return GameState.getNumberToWin();
    }
}



export default GameView;