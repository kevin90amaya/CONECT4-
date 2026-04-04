import Message from "../../Messages/Message.js";

class PlayerView {
    gameMode;
    listPlayers;
    currentPlayer;

    setListPlayer(listPlayers){
        this.listPlayers = listPlayers;
    }

    setCurrentPlayer(currentPlayer){
        this.currentPlayer = currentPlayer;
    }

    setGameMode(modes){
        this.gameMode = modes;
    }

    async initialize(){
        this.showSelectMode();
//        this.showTurn();
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

    showSelectedMode(modo){
        const modeElement = document.querySelector('.mode');
        modeElement.innerHTML = `
            <h4>${Message.getInstance().getMessages("GAME_MODES").selectedMode} ${Message.getInstance().getGameModeName(modo)}</h4>
        `;
    }

    showTurn(){
        const statusElement = document.querySelector('.status');
        statusElement.innerHTML = `
            <h4>${Message.getInstance().getMessages("GAME_STATUS").turn} ${this.currentPlayer.getName()}</h4>
            <p>${Message.getInstance().getMessages("GAME_STATUS").enterColumn}</p>
        `;

    }

}
export default PlayerView;