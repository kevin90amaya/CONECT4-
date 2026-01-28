



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
    
}




class Menu {
    
    title;
    options;
    
    constructor() {
        this.options = [];
    }
    
    updateTitle() {}
    
    addOptions(){}
    
    add(option) {
        this.options.push(option);
    }

    addLast() {}
    
    getOptions() {
        return this.options;
    }

    removeOption() {
        this.options = [];
    }
    
    hasOption(option) {
        return this.options.includes(option);
    }

    getTitle() {
        return this.title;
    }
    
    getMenu() {
        return this;
    }
    
}

class Option {
    
    title;
    
    getTitle() {
        return this.title;
    }
    
    execute() {}
    
    updateTitle() {}
    
}





class NavigatorMenu extends Menu {
    
    nameActualMenu;
    actualMenu;
    listMenus;
    navigatorOption;
    
    constructor() {
        super();
        this.updateTitle();
        this.nameActualMenu = this.getTitle();
        this.actualMenu = this.getMenu();
        this.listMenus = ListMenus.getInstance();
        this.listMenus.addMenu(this.nameActualMenu, this.actualMenu);
        this.navigatorOption = new NavigatorOption();
    }

    addOptions() {
        this.add(this.navigatorOption);
    }
    
}

class ListMenus {

    listMenus;
    instance;

    constructor() {
        this.listMenus = new Map();
    }
    
    static getInstance() {
        if (ListMenus.instance == null) {
            ListMenus.instance = new ListMenus();
        }
        return ListMenus.instance;
    }

    addMenu(name, menu) {
        this.listMenus.set(name, menu);
    }

    getMenu(name) {
        return this.listMenus.get(name);
    }

    getMenuNames() {
        return this.listMenus.keys();
    }
  

}

class NavigatorOption extends Option {

    title;
    
    constructor() {
        super();
    }

    updateTitle() {
        this.title = new MessageOption().getNavigatorOptionTitle();
    }

    execute() {
        return new MenuOfMenus();
    }
    
}

class MenuOfMenus extends Menu {

    listMenus;
    
    constructor() {
        super();
        this.listMenus = ListMenus.getInstance();
    }
    updateTitle() {
        this.title = new MessagemainMenu().getTitleMenuOfMenus();
    }
    addOptions() {
        for (let name of this.listMenus.getMenuNames()) {
            this.add(new GoMenuOption(name));
        }
    }
}

class GoMenuOption extends Option {

    constructor(title) {
        super();
        this.title = title;
        this.listMenus = ListMenus.getInstance();
    }
    
    updateTitle() {
        this.title = this.title;
    }
    
    execute() {
        return this.listMenus.getMenu(this.title);
    }
    
}






class BackMenu extends NavigatorMenu {

    previousMenu;
    backOption;
    
    constructor(previousMenu) {
        super();
        this.previousMenu = previousMenu;
        this.backOption = new BackOption(this.previousMenu);
    }

    addOptions() {
        super.addOptions();
        //this.addLast(this.backOption);
    }
    
    addLast() {
        this.options.push(this.backOption);
    }
}

class BackOption extends Option {
    
    title;
    previousMenu;

    constructor(namePreviousMenu) {
        super();
        this.namePreviousMenu = namePreviousMenu;
        this.previousMenu = ListMenus.getInstance().getMenu(namePreviousMenu);
    }

    updateTitle() {
        this.title = new MessageOption().getBackOptionTitle();
    }


    execute(){
        return this.previousMenu;
    }

}





class QuitMenu extends NavigatorMenu {
    
    #quitOption;

    constructor() {
        super();
        this.quitOption = new QuitOption();
    }

    addOptions() {
        super.addOptions();
       // this.addLast(this.quitOption);
    }

    addLast() {
        this.options.push(this.quitOption);
    }

    
}

class QuitOption extends Option {

    title;
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = new MessageOption().getQuitOptionTitle();
    }
    
    execute() {
        console.log("Adios");
    }
    
}






class MessagemainMenu {
    
    #titlemainmenu = "mainmenu";
    #titlesubmenu = "submenu";
    #titlemenuofmenus = "menuofmenus";
    getTitle(){
        return this.#titlemainmenu;
    }
    
    getTitleSub(){
        return this.#titlesubmenu;
    }  
    
    getTitleMenuOfMenus(){
        return this.#titlemenuofmenus;
    }
}

class MessageOption {

    #titlequitoption = "Salir";
    #titlebackoption = "volver";
    #titlenavigatoroption = "navegar"
    #titleopcion1 = "SUBMENU";
    #titleopcion2 = "opcion2";
    #titleopcion3 = "opcion3";
    
    getTitle1(){
        return this.#titleopcion1;
    }
    
    getTitle2(){
        return this.#titleopcion2;
    }
    
    getTitle3(){
        return this.#titleopcion3;
    }
    
    getNavigatorOptionTitle(){
        return this.#titlenavigatoroption;
    }
    
    getBackOptionTitle(){
        return this.#titlebackoption;
    }
    
    getQuitOptionTitle(){
        return this.#titlequitoption;
    }
    
}





class MainMenu extends QuitMenu{
    
    constructor(){
        super();
    }
    
    updateTitle() {
        this.title = new MessagemainMenu().getTitle();
    }
    
    addOptions(){
        super.addOptions();
        this.add(new Option1());
        this.add(new Option2());
    }
    
}

class Option1 extends Option{
    
    updateTitle(){
        this.title = new MessageOption().getTitle1();
    }
    
    execute(){
        return new SubMenu();
    }
}

class Option2 extends Option{
    
    updateTitle(){
        this.title = new MessageOption().getTitle2();
    }
    
    execute(){
        
    }
    
}

class SubMenu extends BackMenu{
    
    constructor(){
        super(new MessagemainMenu().getTitle());
    }
    
    updateTitle(){
        this.title = new MessagemainMenu().getTitleSub();
    }
    
    addOptions(){
        super.addOptions();
        this.add(new Option3());
    }
}

class Option3 extends Option{
    updateTitle(){
        this.title = new MessageOption().getTitle3();
    }
    
    execute(){
    }
    
}


class ControllerMenu {

    #menu;
    #viewMenu;

    constructor() {
     this.#menu = new MainMenu();
     this.#viewMenu = new ViewMenu();
     this.#viewMenu.setMenu(this.#menu);
    }

     initialize() {
        this.loadMenu();
        this.setupMenuEventHandlers();
    }



    loadMenu() {
        this.#menu.removeOption();
        this.#menu.addOptions();
        this.#menu.addLast();
        this.#viewMenu.showMenu();
    }
    setupMenuEventHandlers() {
        document.addEventListener('menuOptionSelected', async (event) => {
            const { option } = event.detail;
            await this.handleMenuOption(option);
        });
    }


    
     async handleMenuOption(option) {
        try {
            const result = await option.execute();
            
            if (result instanceof Menu) {
                await this.handleNavigation(result);
            } else if (typeof result === 'string') {
                await this.handleCommand(result);
            }
            // Puedes añadir más condiciones según los tipos de resultado
        } catch (error) {
            console.error('Error al procesar la opción:', error);
        }
    }
    async handleNavigation(menu) {
        this.setMenu(menu);
        this.#viewMenu.setMenu(menu);
        this.loadMenu();
    }
    async handleCommand(command) {
        // Aquí manejas comandos específicos
        console.log('Ejecutando comando:', command);
        // Ejemplo: this[command]?.();
    }

    setMenu(menu) {
        this.#menu = menu;
    }
    

}


export default ControllerMenu;

