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

export default MenuOfMenus;