

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
        
    }

    showEditColumns(board){
        
    }


    showEditConectToWin(board) {
        this.cleanMenu();
        
        const min = 3;
        const max = Math.max(board.numberColumns, board.numberRows);
     
        this.#menuElement.innerHTML = `
            <div class="edit-container">
                <label>Conecta para ganar: <span id="rangeValue">${board.numberToWin}</span></label>
                <input type="range" id="conectToWinRange" 
                       min="${min}" 
                       max="${max}" 
                       value="${board.numberToWin}">
                <button id="saveConectToWin">Guardar</button>
            </div>
        `;

        const range = document.getElementById('conectToWinRange');
        const display = document.getElementById('rangeValue');
        const saveButton = document.getElementById('saveConectToWin');

        range.addEventListener('input', () => {
            display.textContent = range.value;
        });

        saveButton.addEventListener('click', () => {
            document.dispatchEvent(new CustomEvent('save-conect-to-win', { 
                detail: { value: parseInt(range.value) } 
            }));
        });
    }
    
}

export default ViewMenu;
