
import ColorView from './ColorView.js';

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

    showBoard() {
       const boardElement = document.querySelector('.board');
       this.clearBoard();

       const columnsContainer = document.createElement('div');
       columnsContainer.className = 'columns-container';

       for (let C = 0; C < this.#board.numberColumns; C++) {
           const column = document.createElement('div');
           column.className = 'column';

           for (let R = 0; R < this.#board.numberRows; R++) {
               const cell = document.createElement('div');
               cell.className = 'cell';

               const color = this.#board.columns[C][R].color;
               const cssColor = ColorView.toCSSColor(color);
               cell.style.backgroundColor = cssColor;   
               
               column.appendChild(cell);
           }

           columnsContainer.appendChild(column);
       }

       boardElement.appendChild(columnsContainer);
      
    }

    clearBoard() {
       const boardElement = document.querySelector('.board');
       boardElement.innerHTML = '';
    }
}
export default BoardView;