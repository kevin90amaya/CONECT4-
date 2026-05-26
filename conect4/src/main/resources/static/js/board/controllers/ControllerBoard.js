import BoardView from "../views/BoardView.js";
import { ENDPOINTS } from "../../api/endpoints.js";
import ControllerToggleButton from "./ControllerToggleButton.js";

class ControllerBoard {
    
    boardView;
    board;
    controllerToggleButton;
    
    constructor() {
        this.boardView = new BoardView();
        this.board = null;
        this.controllerToggleButton = new ControllerToggleButton();
    }

    getcontrollerToggleButton() {
        return this.controllerToggleButton
    }

    getboardView() {
        return this.boardView;
    }

    async getboard() {
        const response = await fetch(ENDPOINTS.BOARD);
        const data = await response.json();
        this.board = data;
    }
    
    setBoard() {
        this.boardView.setBoard(this.board);
    }

    async createBoard() {
        await fetch(ENDPOINTS.BOARD_CREATE, {method: 'POST'});
    }
    
    async initialize() {
        this.controllerToggleButton.initialize();
        await this.createBoard();
        await this.getboard();
        this.setBoard();
    }

    async reset() {
        await fetch(ENDPOINTS.BOARD_RESET, {method: 'POST'});
    }
    
}
export default ControllerBoard;