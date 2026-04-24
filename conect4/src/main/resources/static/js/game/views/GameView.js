
import YesNoDialog from "../../utils/YesNoDialog.js";

class GameView {

    boardView;
    playerView;


    constructor() {
      
    }

    setBoardView(boardView) {
        this.boardView = boardView;
    }

    setPlayerView(playerView) {
        this.playerView = playerView;
    }

    async playGames() {
        const continueDialog = new YesNoDialog();
        do {
            
            this.boardView.showTitle();
            this.boardView.showBoard();
            await this.playerView.showSelectMode();

            do{
                await this.playerView.interact();
                this.boardView.showBoard();
            } while (this.boardView.isFinished());

            this.playerView.showResult();
           await continueDialog.read("¿Desea jugar otra partida?");

        } while (continueDialog.isAffirmative());
    }
    
}

export default GameView;