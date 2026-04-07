import Message from "../../Messages/Message.js";


class GameView {

    #game;

    constructor() {
        this.#game = null;
    }

    setGame(game) {
        this.#game = game;
    }
    
}

export default GameView;