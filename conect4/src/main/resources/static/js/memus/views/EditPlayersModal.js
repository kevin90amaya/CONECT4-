import Message from "../../Messages/Message.js";

class EditPlayersModal {
    constructor(listPlayers, numberPlayers) {
        this.listPlayers = listPlayers;
        this.numberPlayers = numberPlayers;
        this.modalOverlay = null;
        this.availableColors = ["RED", "YELLOW", "BLUE", "GREEN", "PURPLE", "ORANGE", "PINK", "BROWN", "BLACK", "WHITE"];
    }

    show() {
        this.validatePreconditions();
        this.render();
        this.setupEventListeners();
    }

    validatePreconditions() {
        if (!this.listPlayers || this.numberPlayers === null || this.numberPlayers === undefined) {
            throw new Error("Precondición fallida: los argumentos no pueden ser null o undefined");
        }
        if (!Array.isArray(this.listPlayers) || !Number.isInteger(this.numberPlayers)) {
            throw new Error("Precondición fallida: listPlayers debe ser un array y numberPlayers un entero");
        }
        if (this.listPlayers.length !== this.numberPlayers) {
            throw new Error("Precondición fallida: la longitud del array debe ser igual a numberPlayers");
        }
        const hasAllFields = this.listPlayers.every(p => p.name !== undefined && p.tipe !== undefined && p.color !== undefined);
        if (!hasAllFields) {
            throw new Error("Precondición fallida: todos los campos del array (name, tipe, color) deben tener todos los valores");
        }
    }

    getPlayerHTML(name, type, color, index) {
        const colorOptions = this.availableColors.map(c => 
            `<option value="${c}" ${c === color ? 'selected' : ''}>${c}</option>`
        ).join('');

        return `
            <div class="player-item" data-index="${index}">
                <input type="text" class="player-name" value="${name}" placeholder="Nombre">
                <select class="player-color">
                    <option value="" disabled ${!color ? 'selected' : ''}>${Message.getInstance().getMessages("EDIT_PLAYERS").color}</option>
                    ${colorOptions}
                </select>
                <select class="player-type">
                    <option value="HUMAN" ${type === 'HUMAN' ? 'selected' : ''}>${Message.getInstance().getMessages("EDIT_PLAYERS").human}</option>
                    <option value="COMPUTER" ${type === 'COMPUTER' ? 'selected' : ''}>${Message.getInstance().getMessages("EDIT_PLAYERS").computer}</option>
                </select>
                <button class="remove-player" data-index="${index}">${Message.getInstance().getMessages("Common").remove}</button>
            </div>
        `;
    }

    render() {
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.className = 'modal-overlay';

        const playersHTML = this.listPlayers.map((player, index) => 
            this.getPlayerHTML(player.name, player.tipe, player.color, index)
        ).join('');

        this.modalOverlay.innerHTML = `
            <div class="modal-content">
                <h3>${Message.getInstance().getMessages("EDIT_PLAYERS").title}</h3>
                <div class="players-container">
                    <div class="players-list">
                        ${playersHTML}
                    </div>
                    <button id="addPlayer" class="add-player-btn">${Message.getInstance().getMessages("EDIT_PLAYERS").addPlayer}</button>
                </div>
                <div class="modal-buttons">
                    <button id="savePlayers">${Message.getInstance().getMessages("Common").save}</button>
                    <button id="cancelEdit">${Message.getInstance().getMessages("Common").cancel}</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.modalOverlay);
    }

    setupEventListeners() {
        const playersList = this.modalOverlay.querySelector('.players-list');

        this.modalOverlay.querySelector('#addPlayer').onclick = () => this.handleAddPlayer(playersList);
        playersList.addEventListener('click', (e) => this.handleRemovePlayer(e, playersList));
        this.modalOverlay.querySelector('#savePlayers').onclick = () => this.handleSave();
        this.modalOverlay.querySelector('#cancelEdit').onclick = () => this.handleCancel();
    }

    handleAddPlayer(playersList) {
        if (playersList.children.length >= 10) {
            alert("Invariante fallida: La cantidad de jugadores no puede ser mayor que 10.");
            return;
        }
        const newIndex = playersList.children.length;
        playersList.insertAdjacentHTML('beforeend', this.getPlayerHTML('', 'HUMAN', '', newIndex));
    }

    handleRemovePlayer(e, playersList) {
        if (e.target.classList.contains('remove-player')) {
            if (playersList.children.length <= 2) {
                alert("Invariante fallida: La cantidad de jugadores nunca puede ser menor que 2.");
                return;
            }
            e.target.closest('.player-item').remove();
        }
    }

    handleSave() {
        const playerElements = Array.from(this.modalOverlay.querySelectorAll('.player-item'));
        
        if (playerElements.length < 2) return alert("Invariante fallida: Deben existir al menos 2 jugadores.");
        if (playerElements.length > 10) return alert("Invariante fallida: La cantidad de jugadores no puede ser mayor que 10.");

        const updatedPlayers = [];
        const namesSet = new Set();
        const colorsSet = new Set();

        for (let i = 0; i < playerElements.length; i++) {
            const item = playerElements[i];
            const name = item.querySelector('.player-name').value.trim();
            const type = item.querySelector('.player-type').value;
            const color = item.querySelector('.player-color').value;

            if (!name || !type || !color) return alert("Requisito fallido: Ningún jugador se puede guardar sin nombre, tipo o color.");
            
            const normalizedName = name.toLowerCase();
            if (namesSet.has(normalizedName)) return alert(`Requisito fallido: El nombre "${name}" ya está en uso.`);
            if (colorsSet.has(color)) return alert(`Requisito fallido: El color "${color}" ya está en uso.`);

            namesSet.add(normalizedName);
            colorsSet.add(color);
            updatedPlayers.push({ name, tipe: type, color, turn: i });
        }
        this.closeAndDispatch(updatedPlayers, updatedPlayers.length);
    }

    handleCancel() {
        this.closeAndDispatch(this.listPlayers, this.numberPlayers);
    }

    closeAndDispatch(players, count) {
        this.modalOverlay.remove();
        document.dispatchEvent(new CustomEvent('save-players', { detail: { value: { numberOfPlayers: count, playersList: players } } }));
    }
}
export default EditPlayersModal;