
import ColorView from './ColorView.js';
import Message from '../../Messages/Message.js';

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
       this.cleanBoard();

       const columnsContainer = document.createElement('div');
       columnsContainer.className = 'columns-container';

       for (let C = 0; C < this.#board.numberColumns; C++) {
           const column = document.createElement('div');
           column.className = 'column';

           column.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('board-column-selected', { detail: {value: C} }));
           });

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

    showTitle() {
        const gameElement = document.querySelector('.game-container');

        const template = Message.getInstance().getMessages("GameView").title;
        const title = template.replace("{numberToWin}", this.getNumberToWin());
        gameElement.querySelector('.game-title h1').textContent = title;
    }

    cleanBoard() {
       const boardElement = document.querySelector('.board');
       boardElement.innerHTML = '';
    }
    
}
export default BoardView;