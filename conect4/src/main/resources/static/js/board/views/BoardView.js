
class BoardView {

    #board;
    
    constructor() {
    
    }

    setBoard(board) {
        this.#board = board;
    }

    getNumberToWin() {
        return this.#board.numberToWin;
    }
}
export default BoardView;