class SoundView {
    
    constructor() {
        this.muteButton = null;
        this.soundEngine = null;
    }

    setModel(engine) {
        // TODO: Implementar inyección del motor
    }

    renderMuteButton() {
        // TODO: Crear y agregar botón al DOM
    }

    updateButtonState(isMuted) {
        // TODO: Cambiar el texto/ícono del botón
    }

    handleMuteClick(e) {
        // TODO: Delegar muteo al motor y actualizar vista
    }
}
export default SoundView;