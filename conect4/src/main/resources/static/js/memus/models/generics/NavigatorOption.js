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

export default NavigatorOption;