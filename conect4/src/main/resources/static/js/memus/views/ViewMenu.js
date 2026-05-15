import Message from "../../Messages/Message.js";
import EditPlayersModal from "./EditPlayersModal.js";

class ViewMenu {

    #menu;
    #menuElement;
    
    constructor() {
        this.#menu = null;
        this.#menuElement = document.getElementById('menu');
    }
    
    showMenu(){
        this.cleanMenu();
        this.showTitleMenu();
        this.showTitleOptions();
    }

    cleanMenu(){
        this.#menuElement.innerHTML = '';
    }
    
    
    showTitleMenu() {

    // Crear el contenedor del título
    const titleContainer = document.createElement('div');
    titleContainer.id = 'titlemenu';
    titleContainer.innerHTML = '<h1></h1>';
    
    // Agregar el contenedor al menú
    this.#menuElement.appendChild(titleContainer);
    
    // Obtener la referencia al h1
    const titleElement = titleContainer.querySelector('h1');
    this.#menu.updateTitle();
    titleElement.textContent = this.#menu.getTitle();
    }
    
    showTitleOptions() {
    // Crear el contenedor de la lista
    const optionsContainer = document.createElement('ul');
    optionsContainer.id = 'options';

    // Obtener las opciones del menú actual
    const menuOptions = this.#menu.getOptions();

    // Recorrer las opciones y crear cada <li> con su botón
    menuOptions.forEach(option => {
        option.updateTitle();

        const li = document.createElement('li'); // cada opción va en un <li>
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option.getTitle();

        // Evento al hacer clic en el botón
        button.onclick = () => {
            document.dispatchEvent(new CustomEvent('menuOptionSelected', {
                detail: { option }
            }));
        };

        li.appendChild(button);          // botón dentro del <li>
        optionsContainer.appendChild(li); // <li> dentro del <ul>
    });

    // Agregar el <ul> al menú
    this.#menuElement.appendChild(optionsContainer);
    }

    
    setMenu(menu) {
        this.#menu = menu;
    }

    getMenuElement() {
        return this.#menuElement;
    }

    showEditRows(board){

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        const max = 30;
        const min = 3;

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <h3>${Message.getInstance().getMessages("BoardMenu").rows}</h3>
                <div class="edit-container">
                    <label>${Message.getInstance().getMessages("BoardMenu").editRows} <span id="rangeValue">${board.numberRows}</span></label>
                    <input type="range" id="rows" min="${min}" max="${max}" value="${board.numberRows}">
                </div>
                <div class="modal-buttons">
                    <button id="saveRows">${Message.getInstance().getMessages("Common").save}</button>
                    <button id="cancelEdit">${Message.getInstance().getMessages("Common").cancel}</button>
                </div>

            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        
        const range = modalOverlay.querySelector('#rows');
        const rangeValue = modalOverlay.querySelector('#rangeValue');
        
        range.addEventListener('input', () => rangeValue.textContent = range.value);

        modalOverlay.querySelector('#saveRows').onclick = () => {
            const val = parseInt(range.value);
            modalOverlay.remove();
            document.dispatchEvent(new CustomEvent('save-rows', { detail: { value: val } }));
        };

        modalOverlay.querySelector('#cancelEdit').onclick = () => {
            modalOverlay.remove();
            document.dispatchEvent(new CustomEvent('save-rows', { detail: { value: board.numberRows } }));
        };

    }

    showEditColumns(board){
        
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const max = 30;
        const min = 3;

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <h3>${Message.getInstance().getMessages("BoardMenu").columns}</h3>
                <div class="edit-container">
                    <label>${Message.getInstance().getMessages("BoardMenu").editColumns} <span id="rangeValue">${board.numberColumns}</span></label>
                    <input type="range" id="columns" min="${min}" max="${max}" value="${board.numberColumns}">
                </div>
                <div class="modal-buttons">
                    <button id="saveColumns">${Message.getInstance().getMessages("Common").save}</button>
                    <button id="cancelEdit">${Message.getInstance().getMessages("Common").cancel}</button>
                </div>

            </div>
        `;
        
        document.body.appendChild(modalOverlay);
        
        const range = modalOverlay.querySelector('#columns');
        const rangeValue = modalOverlay.querySelector('#rangeValue');
        
        range.addEventListener('input', () => rangeValue.textContent = range.value);

        modalOverlay.querySelector('#saveColumns').onclick = () => {
            const val = parseInt(range.value);
            modalOverlay.remove();
            document.dispatchEvent(new CustomEvent('save-columns', { detail: { value: val } }));
        };

        modalOverlay.querySelector('#cancelEdit').onclick = () => {
            modalOverlay.remove();
            document.dispatchEvent(new CustomEvent('save-columns', { detail: { value: board.numberColumns } }));
        };
    }

    showEditConectToWin(board) {

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const max = Math.max(board.numberColumns, board.numberRows);
        const min = 3;
     
        modalOverlay.innerHTML = `
            <div class="modal-content">
                <h3>${Message.getInstance().getMessages("BoardMenu").conectToWin}</h3>
                <div class="edit-container">
                    <label>${Message.getInstance().getMessages("BoardMenu").editConectToWin} <span id="rangeValue">${board.numberToWin}</span></label>
                    <input type="range" id="conectToWinRange" min="${min}" max="${max}" value="${board.numberToWin}">
                </div>
                <div class="modal-buttons">
                    <button id="saveConectToWin">${Message.getInstance().getMessages("Common").save}</button>
                    <button id="cancelEdit">${Message.getInstance().getMessages("Common").cancel}</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        const range = modalOverlay.querySelector('#conectToWinRange');
        const display = modalOverlay.querySelector('#rangeValue');

        range.addEventListener('input', () => display.textContent = range.value);

        modalOverlay.querySelector('#saveConectToWin').onclick = () => {
            const val = parseInt(range.value);
            modalOverlay.remove();
            document.dispatchEvent(new CustomEvent('save-conect-to-win', { detail: { value: val } }));
        };

        modalOverlay.querySelector('#cancelEdit').onclick = () => {
            modalOverlay.remove();
            document.dispatchEvent(new CustomEvent('save-conect-to-win', { detail: { value: board.numberToWin } }));
        };
    }
    
    showEditPlayers(listPlayers, numberPlayers) {
        const editPlayersModal = new EditPlayersModal(listPlayers, numberPlayers);
        editPlayersModal.show();
    }
}
export default ViewMenu;
