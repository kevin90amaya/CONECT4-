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

export default Menu;