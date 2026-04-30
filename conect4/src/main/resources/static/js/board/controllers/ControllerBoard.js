import BoardView from "../views/BoardView.js";
import { ENDPOINTS } from "../../api/endpoints.js";


class ControllerBoard {
    
    boardView;
    board;
    
    constructor() {
        this.boardView = new BoardView();
        this.board = null;
    }

    getboardView() {
        return this.boardView;
    }

    async getboard() {
        const response = await fetch(ENDPOINTS.BOARD);
        const data = await response.json();
        return data;
    }
    
    setBoard() {
        this.boardView.setBoard(this.board);
    }
    
    async initialize() {
        this.board = await this.getboard();
        this.setBoard();
    }
    
}
export default ControllerBoard;