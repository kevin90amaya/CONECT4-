class GameState {
    static #board = null;

    static setBoard(board) {
        this.#board = board;
    }

    static getBoard() {
        return this.#board;
    }

    static getNumberToWin() {
        return this.#board.numberToWin;
    }
}

export default GameState;