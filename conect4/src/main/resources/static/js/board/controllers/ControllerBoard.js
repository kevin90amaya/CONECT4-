import BoardView from "../views/BoardView.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import GameState from "../../models/GameState.js";

class ControllerBoard {
    
    boardView;
    board;
    
    constructor() {
        this.boardView = new BoardView();
        this.board = null;
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
        GameState.setBoard(this.board);
        this.setBoard();
       // this.boardView.initialize();
    }
}
export default ControllerBoard;