import Message from "../../Messages/Message.js";

class PlayerView {
    gameMode;
    players;

    setPlayer(players){
        this.players = players;
    }

    setGameMode(modes){
        this.gameMode = modes;
    }

    async initialize(){
        this.showSelectMode();
    }

    showSelectMode(){
    const modeElement = document.querySelector('.mode');
    
    modeElement.innerHTML = `
        <form id="modeForm">
            <label for="modeSelect">${Message.getInstance().getMessages("GAME_MODES").selectMode}</label>
            <select id="modeSelect" name="mode">
                <option value="${this.gameMode[0]}">${Message.getInstance().getMessages("GAME_MODES").mode1}</option>
                <option value="${this.gameMode[1]}">${Message.getInstance().getMessages("GAME_MODES").mode2}</option>
                <option value="${this.gameMode[2]}">${Message.getInstance().getMessages("GAME_MODES").mode3}</option>
            </select>
            <input type="submit" value="${Message.getInstance().getMessages("GAME_MODES").save}">
        </form>
    `;
    
    document.getElementById('modeForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const modo = document.getElementById('modeSelect').value;
        document.dispatchEvent(new CustomEvent('selectMode', { 
            detail: { mode: modo } 
        }));
    });

    }

}
export default PlayerView;