

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
    
}

export default ViewMenu;
