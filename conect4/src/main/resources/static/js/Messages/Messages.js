class Message {

    idioma = "Español";

    constructor() {
        this.actualizarIdioma();
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
}