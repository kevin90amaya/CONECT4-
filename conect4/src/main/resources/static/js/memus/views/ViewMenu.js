import Message from "../../Messages/Message.js";

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
        // Precondiciones
        if (!listPlayers || numberPlayers === null || numberPlayers === undefined) {
            throw new Error("Precondición fallida: los argumentos no pueden ser null o undefined");
        }
        if (!Array.isArray(listPlayers) || !Number.isInteger(numberPlayers)) {
            throw new Error("Precondición fallida: listPlayers debe ser un array y numberPlayers un entero");
        }
        if (listPlayers.length !== numberPlayers) {
            throw new Error("Precondición fallida: la longitud del array debe ser igual a numberPlayers");
        }
        const hasAllFields = listPlayers.every(p => p.name !== undefined && p.tipe !== undefined && p.color !== undefined);
        if (!hasAllFields) {
            throw new Error("Precondición fallida: todos los campos del array (name, tipe, color) deben tener todos los valores");
        }

        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';
        
        const availableColors = ["RED", "YELLOW", "BLUE", "GREEN", "PURPLE", "ORANGE", "PINK", "BROWN", "BLACK", "WHITE"];

        const getPlayerHTML = (name, type, color, index) => {
            const colorOptions = availableColors.map(c => 
                `<option value="${c}" ${c === color ? 'selected' : ''}>${c}</option>`
            ).join('');

            return `
                <div class="player-item" data-index="${index}">
                    <input type="text" class="player-name" value="${name}" placeholder="Nombre">
                    <select class="player-color">
                        <option value="" disabled ${!color ? 'selected' : ''}>Color</option>
                        ${colorOptions}
                    </select>
                    <select class="player-type">
                        <option value="HUMAN" ${type === 'HUMAN' ? 'selected' : ''}>Humano</option>
                        <option value="COMPUTER" ${type === 'COMPUTER' ? 'selected' : ''}>IA</option>
                    </select>
                    <button class="remove-player" data-index="${index}">Eliminar</button>
                </div>
            `;
        };

        const playersHTML = listPlayers.map((player, index) => 
            getPlayerHTML(player.name, player.tipe, player.color, index)
        ).join('');

        modalOverlay.innerHTML = `
            <div class="modal-content">
                <h3>Editar Jugadores</h3>
                <div class="players-container">
                    <div class="players-list">
                        ${playersHTML}
                    </div>
                    <button id="addPlayer" class="add-player-btn">Añadir Jugador</button>
                </div>
                <div class="modal-buttons">
                    <button id="savePlayers">Guardar</button>
                    <button id="cancelEdit">Cancelar</button>
                </div>
            </div>
        `;

        document.body.appendChild(modalOverlay);

        const playersList = modalOverlay.querySelector('.players-list');

        // Event listeners
        modalOverlay.querySelector('#addPlayer').onclick = () => {
            if (playersList.children.length >= 10) {
                alert("Invariante fallida: La cantidad de jugadores no puede ser mayor que 10.");
                return;
            }
            const newIndex = playersList.children.length;
            playersList.insertAdjacentHTML('beforeend', getPlayerHTML('', 'HUMAN', '', newIndex));
        };

        playersList.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-player')) {
                if (playersList.children.length <= 2) {
                    alert("Invariante fallida: La cantidad de jugadores nunca puede ser menor que 2.");
                    return;
                }
                e.target.closest('.player-item').remove();
            }
        });

        const closeAndDispatch = (players, count) => {
            modalOverlay.remove();
            document.dispatchEvent(new CustomEvent('save-players', { 
                detail: { value: { numberOfPlayers: count, playersList: players } } 
            }));
        };

        modalOverlay.querySelector('#savePlayers').onclick = () => {
            const playerElements = Array.from(modalOverlay.querySelectorAll('.player-item'));
            
            if (playerElements.length < 2) {
                alert("Invariante fallida: Deben existir al menos 2 jugadores.");
                return;
            }
            if (playerElements.length > 10) {
                alert("Invariante fallida: La cantidad de jugadores no puede ser mayor que 10.");
                return;
            }

            const updatedPlayers = [];
            const namesSet = new Set();
            const colorsSet = new Set();

            for (let i = 0; i < playerElements.length; i++) {
                const item = playerElements[i];
                const name = item.querySelector('.player-name').value.trim();
                const type = item.querySelector('.player-type').value;
                const color = item.querySelector('.player-color').value;

                if (!name || !type || !color) {
                    alert("Requisito fallido: Ningún jugador se puede guardar sin nombre, tipo o color.");
                    return;
                }

                const normalizedName = name.toLowerCase();
                if (namesSet.has(normalizedName)) {
                    alert(`Requisito fallido: El nombre "${name}" ya está en uso.`);
                    return;
                }
                if (colorsSet.has(color)) {
                    alert(`Requisito fallido: El color "${color}" ya está en uso.`);
                    return;
                }

                namesSet.add(normalizedName);
                colorsSet.add(color);

                updatedPlayers.push({
                    name: name,
                    tipe: type,
                    color: color,
                    turn: i // El turno se establece automáticamente basado en la posición
                });
            }

            closeAndDispatch(updatedPlayers, updatedPlayers.length);
        };

        modalOverlay.querySelector('#cancelEdit').onclick = () => {
            closeAndDispatch(listPlayers, numberPlayers);
        };
    }
}
export default ViewMenu;
