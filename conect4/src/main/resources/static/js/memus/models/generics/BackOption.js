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

export default BackOption;