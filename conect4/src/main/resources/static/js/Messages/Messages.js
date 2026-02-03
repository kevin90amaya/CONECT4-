class Message {

    idioma = "Español";
    instance;

    constructor() {
        this.actualizarIdioma();
    }

    static getInstance(){
        if(!this.instance){
            this.instance = new Message();
        }
        return this.instance;
    }

    actualizarIdioma() {
        this.idioma = this.getIdioma() === "Ingles" ? new Ingles() : new Español();
    }
    
    static setIdioma(idioma) {
        this.idioma = idioma;
    }

    static getIdioma() {
        return this.idioma;
    }

    getMessages(menuType) {}
}