import Español from "./Español.js";
import Ingles from "./Ingles.js";

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

export default Message;