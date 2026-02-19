
class Menu {
    
    title;
    options;
    maxOptions = 20
    
    constructor() {
        this.options = [];
    }
    
    updateTitle() {}
    
    addOptions(){}
    
add(option) {
    option === undefined && (() => { throw new Error("Option is undefined"); })();
    this.options.length >= this.maxOptions && (() => { throw new Error("Menu is full"); })();
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
       option === undefined && (() => { throw new Error("Option is undefined"); })();
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