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

export default ListMenus;