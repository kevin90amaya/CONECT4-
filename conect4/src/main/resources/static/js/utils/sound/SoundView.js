class SoundView {
    
    constructor() {
        this.muteButton = null;
        this.soundEngine = null;
    }

    setModel(engine) {
        this.soundEngine = engine;
    }

    renderMuteButton() {
        this.muteButton = document.createElement('button');
        this.muteButton.id = 'mute-toggle';
        this.muteButton.innerHTML = '🔊 ON';
        this.muteButton.style.position = 'fixed';
        this.muteButton.style.top = '15px';
        this.muteButton.style.right = '15px';
        this.muteButton.style.zIndex = '9999';
        this.muteButton.style.backgroundColor = '#111'; // Fondo retro opcional
        
        this.muteButton.addEventListener('click', (e) => this.handleMuteClick(e));
        document.body.appendChild(this.muteButton);
    }

    updateButtonState(isMuted) {
        if (isMuted === null || isMuted === undefined) {
            throw new Error("Precondición fallida: isMuted no puede ser null o undefined");
        }
        if (!this.muteButton) {
            throw new Error("Precondición fallida: El botón de mute no ha sido renderizado en el DOM");
        }
        this.muteButton.innerHTML = isMuted ? '🔇 OFF' : '🔊 ON';
    }

    handleMuteClick(e) {
        if (e) e.stopPropagation();
        
        this.soundEngine.toggleMute(); // Comando: cambia el estado
        const isMuted = this.soundEngine.getIsMuted(); // Consulta: obtiene el nuevo estado
        
        this.updateButtonState(isMuted);
        
        if (isMuted === false) {
            this.soundEngine.playSelect();
        }
    }
}
export default SoundView;