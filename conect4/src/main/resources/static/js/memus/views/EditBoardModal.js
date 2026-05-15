import Message from "../../Messages/Message.js";

class EditBoardModal {
    constructor(board, type) {
        this.board = board;
        this.type = type;
        this.modalOverlay = null;
    }

    getConfig() {
        const msgs = Message.getInstance().getMessages("BoardMenu");
        const configs = {
            'rows': {
                title: msgs.rows,
                label: msgs.editRows,
                min: 3,
                max: 30,
                value: this.board.numberRows,
                inputId: 'rows',
                saveBtnId: 'saveRows',
                eventName: 'save-rows'
            },
            'columns': {
                title: msgs.columns,
                label: msgs.editColumns,
                min: 3,
                max: 30,
                value: this.board.numberColumns,
                inputId: 'columns',
                saveBtnId: 'saveColumns',
                eventName: 'save-columns'
            },
            'conectToWin': {
                title: msgs.conectToWin,
                label: msgs.editConectToWin,
                min: 3,
                max: Math.max(this.board.numberColumns, this.board.numberRows),
                value: this.board.numberToWin,
                inputId: 'conectToWinRange',
                saveBtnId: 'saveConectToWin',
                eventName: 'save-conect-to-win'
            }
        };
        return configs[this.type];
    }

    show() {
        const config = this.getConfig();
        this.modalOverlay = document.createElement('div');
        this.modalOverlay.className = 'modal-overlay';

        this.modalOverlay.innerHTML = `
            <div class="modal-content">
                <h3>${config.title}</h3>
                <div class="edit-container">
                    <label>${config.label} <span id="rangeValue">${config.value}</span></label>
                    <input type="range" id="${config.inputId}" min="${config.min}" max="${config.max}" value="${config.value}">
                </div>
                <div class="modal-buttons">
                    <button id="${config.saveBtnId}">${Message.getInstance().getMessages("Common").save}</button>
                    <button id="cancelEdit">${Message.getInstance().getMessages("Common").cancel}</button>
                </div>
            </div>
        `;

        document.body.appendChild(this.modalOverlay);

        const range = this.modalOverlay.querySelector(`#${config.inputId}`);
        const display = this.modalOverlay.querySelector('#rangeValue');

        range.addEventListener('input', () => display.textContent = range.value);
        this.modalOverlay.querySelector(`#${config.saveBtnId}`).onclick = () => this.closeAndDispatch(config.eventName, parseInt(range.value));
        this.modalOverlay.querySelector('#cancelEdit').onclick = () => this.closeAndDispatch(config.eventName, config.value);
    }

    closeAndDispatch(eventName, value) {
        this.modalOverlay.remove();
        document.dispatchEvent(new CustomEvent(eventName, { detail: { value: value } }));
    }
}
export default EditBoardModal;