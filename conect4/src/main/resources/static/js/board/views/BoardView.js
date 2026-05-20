
import ColorView from './ColorView.js';
import Message from '../../Messages/Message.js';

class BoardView {

    #board;
    #mountPoint;
    
    constructor() {
        this.#initMountPoint();
    }
    
    setBoard(board) {
        this.#board = board;
    }
    
    getNumberToWin() {
        return this.#board.numberToWin;
    }
    
    showBoard() {
        this.cleanBoard();

       const boardContainer = document.createElement('div');
       boardContainer.className = 'board-container';

       const columnsContainer = document.createElement('div');
       columnsContainer.className = 'columns-container';

       for (let C = 0; C < this.#board.numberColumns; C++) {
           const column = document.createElement('div');
           column.className = 'column';

           column.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('board-column-selected', { detail: {value: C} }));
           });

           for (let R = this.#board.numberRows - 1; R >= 0; R--) {
               const cell = document.createElement('div');
               cell.className = 'cell';

               const color = this.#board.columns[C][R].color;
               const cssColor = ColorView.toCSSColor(color);
               cell.style.backgroundColor = cssColor;   
               
               column.appendChild(cell);
           }

           columnsContainer.appendChild(column);
       }

       boardContainer.appendChild(columnsContainer);
       this.#mountPoint.appendChild(boardContainer);
      
    }

    showTitle() {
        const gameElement = document.querySelector('.game-container');

        const template = Message.getInstance().getMessages("GameView").title;
        const title = template.replace("{numberToWin}", this.getNumberToWin());
        gameElement.querySelector('.game-title h1').textContent = title;
    }

    cleanBoard() {
       this.#mountPoint.innerHTML = '';
    }

    #initMountPoint() {
        const gameFrame = document.querySelector('.game-frame');
        this.#mountPoint = document.createElement('div');
        this.#mountPoint.id = 'board-mount-point';
        const statusElement = gameFrame.querySelector('.status');
        
        gameFrame.insertBefore(this.#mountPoint, statusElement);
    }
    
}

export default BoardView;