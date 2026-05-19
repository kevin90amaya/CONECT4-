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
        
        this.soundEngine.toggleMute();
        const isMuted = this.soundEngine.getIsMuted();
        
        this.updateButtonState(isMuted);
        
        if (isMuted === false) {
            this.soundEngine.playSelect();
        }
    }
}
export default SoundView;