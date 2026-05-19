// ZzFX - Zuper Zmall Zound Zynth - Micro Edition
// MIT License - Copyright 2019 Frank Force
class SoundEngine {
    constructor() {
        this.isMuted = false;
        this.audioUnlocked = false;
        this.masterVolume = 1.0;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        return this.isMuted;
    }

    unlockAudio() {
        this.audioUnlocked = true;
    }

    playHover() {}
    playSelect() {}
    playDrop() {}
    playError() {}
    playWin() {}
    playDraw() {}
}

export default SoundEngine;