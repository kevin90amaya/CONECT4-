import Idiomas from "./Idiomas.js";
import BoardView from "../board/views/BoardView.js";

class Ingles extends Idiomas {
     getMainMenuMessages() {
        return {
            title: "Main Menu",
            play: "Play",
            editSettings: "Edit Settings",
            exit: "Exit"
        };
    }

    getSettingsMenuMessages() {
        return {
            title: "Settings",
            language: "Language",
            gameMode: "Game Mode",
            numberOfPlayers: "Number of Players",
            editBoard: "Edit Board"
        };
    }

    getLanguageMenuMessages() {
        return {
            title: "Language",
            spanish: "Spanish",
            english: "English",
            changedTo: "Language changed to"
        };
    }

    getPlayersMenuMessages() {
        return {
            title: "Players",
            editNumberPlayers: "Edit Number of Players",
            getNumberPlayers: "Give me the number of players",
            editPlayers: "Edit Players",
            name: "Give me the Name of the player: ",
            token: "Give me the Token of the player ",
            optionToken:"(1: X, 2: O): ",
            tipe: "Give me the Tipe of the player ",
            optionTipe:"(1: Human, 2: computer): "
        };
    }


    getBoardMenuMessages() {
        return {
            title: "Board",
            rows: "Edit Rows",
            columns: "Edit Columns",
            conectToWin: "Edit Conecta to Win",
            editConectToWin: "give the number of tokens to win: ",
            editRows: "give the number of rows: ",
            editColumns: "give the number of columns: "
        };
    }

    getGameModeMenuMessages() {
        return {
            title: "Game Mode",
            demo: "Demo-Game",
            playerVsCPU: "Player Vs CPU",
            playerVsPlayer: "Player Vs Player",
            changedTo: "Game Mode changed to"
        };
    }

    getCommonMessages() {
        return {
            invalidOption: "Invalid Option",
            option: "Option",
            newName: "New name",
            nameChanged: "Name changed to",
            newToken: "New token",
            tokenChanged: "Token changed to",
            newType: "New type",
            typeChanged: "Type changed to",
            navigation: "Navigation",
            menuOfMenus: "Menu of Menus",
            back: "Back",
            exit: "Exit"
        };
    }

    getMensajesResumed() {
        return {
            yes: "yes",
            no: "no",
            question: "do you want to play another round? ",
            error: "please answer yes or no"
        };
    }

    getMensajesGame() {
        return {
            GION : "-",
            title: "CONECT",
            END_GAME: "TIED !!!",
            WIN: " WIN!!! : -)"
        };
    }

    getMensajesPlayers() {
        return {
            turn: "Turn: ",
            getColumn: "enter a column to drop a token: ",
            invalidColumn: `Invalid columnn!!! Values [1-${Settings.numberColumns}]`,
            formatError: "FORMAT ERROR!!! enter a number formatted value",
            completedColumn: "Invalid column!!! It's completed",
        };
    }

    dispatch(menuType, messagesMenu) {
        return messagesMenu.getMessagesForIngles(menuType);
    }
    
    getGameViewMessages() {
        return {
            title: "CONECT {numberToWin}"  // template con placeholder
        };
    }
}

export default Ingles;