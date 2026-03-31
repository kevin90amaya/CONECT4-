import BoardView from "../views/BoardView.js";

class ControllerBoard {
    
    boardView;
    board;
    
    constructor() {
        this.boardView = new BoardView();
        this.board = null;
    }

    getboard() {
        return ;
    }
    
    setBoard(board) {
        this.boardView.setBoard(board);
    }
    
    initialize() {
        this.boardView.initialize();
        
    }
}
export default ControllerBoard;