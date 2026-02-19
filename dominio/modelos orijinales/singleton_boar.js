const { Console } = require("./console");
const console = new Console();




class Resumed {
    constructor() {
        this.msg = new MensajesResumed();
        this.proposAnswer = "";
        this.answer = "";
        this.error = false;
    }

    setProposAnswer(answer) {
        this.proposAnswer = answer;
    }

    setAnswer(answer) {
        this.answer = answer;
    }

    setError(errorState) {
        this.error = errorState;
    }

    getProposAnswer() {
        return this.proposAnswer;
    }

    getAnswer() {
        return this.answer;
    }

    hasError() {
        return this.error;
    }

    actualizarIdioma() {
        this.msg.actualizarIdioma();
    }

    getMessages() {
        return this.msg.getMessages("Resumed");
    }
}

class ViewResmed {
    resmed;
    constructor(resumed) {
        this.resumed = resumed;
    }
    askToContinue() {
        do {
            this.resumed.actualizarIdioma();
            const messages = this.resumed.getMessages();
            this.write(messages.question);
            this.read(this.resumed);
            if (this.isAnswerValid(this.resumed)) {
                this.resumed.setAnswer(this.resumed.getProposAnswer());
                this.resumed.setError(false);
            } else {
                this.resumed.setError(true);
                this.write(messages.error);
            }
        } while (this.resumed.hasError());
        return this.nextRound(this.resumed);
    }

    isAnswerValid(resumed) {
        const proposAnswer = resumed.getProposAnswer();
        const messages = resumed.getMessages();
        return proposAnswer === messages.yes || proposAnswer === messages.no;
    }

    nextRound(resumed) {
        const messages = resumed.getMessages();
        return resumed.getAnswer() === messages.yes;
    }

    write(text) {
        console.writeln(text);
    }

    read(resumed) {
        resumed.setProposAnswer(console.readString().toLowerCase());
    }
}



class Settings {

    static language = "espanol";
    static numberColumns = 7;
    static numberRows = 6;
    static ConectToWin = 4;
    static TOKEN_EMPTY = " ";
    static TURN = 0;
    static MODE = 2;
    static CELL_WIDTH = 3;
    static NUMBER_PLAYERS = 2;
    static PLAYERS = {};
    static PROPERTI_PLAYERS = [["RED", "R", 1, 0], ["YELLOW", "Y", 2, 1]];

    constructor() { 
 
    }
    static createPlayers() {

        for (let i = 0; i < this.NUMBER_PLAYERS; i++) {
            this.PLAYERS[`player${i + 1 }`] = {
                name: this.PROPERTI_PLAYERS[i][0],
                token: this.PROPERTI_PLAYERS[i][1],
                tipe: this.getTipe(this.PROPERTI_PLAYERS[i][2]),
                turn: this.PROPERTI_PLAYERS[i][3]
            };
        }

    }
    static getTipe(Tipe) {
        switch (Tipe) {
            case 1:
               
                let HumanPlayer = new humanPlayer();
               return  HumanPlayer;
            case 2:
                
                let computerPlayer = new ComputerPlayer();
                return computerPlayer;
        }
    }

    static incrementTurn() {
        this.TURN++;
        if (this.TURN >= this.NUMBER_PLAYERS) {
            this.TURN = 0;
        }
    }


    static setLanguage(lang) {
        this.language = lang;
        const messages = new MensajesMenu().getMessages("LanguageMenu");
        console.writeln(`${messages.changedTo} ${this.language}`);
    }

    static getLanguage() {
        return this.language;
    }
    static editNumberColumns(mensage) {
        this.numberColumns = console.readNumber(`${mensage}`);
      // Game.getBoard().createBoard(); //recrea el tablero despues de editar las columnas
    }

    static editNumberRows(mensage) {
        this.numberRows = console.readNumber(`${mensage}`);
        //Game.getBoard().createBoard();//recrea el tablero despues de editar las filas
       
    }

    static editConectToWin(mensage) {
        this.ConectToWin = console.readNumber(`${mensage}`);
    }

    static setMode(messagesmode, messageschangedTo, mode) {
        this.MODE = mode;
        const messages = new MensajesMenu().getMessages("GameModeMenu");
        console.writeln(`${messages.changedTo} ${messagesmode}`);
        Settings.changedMode()
    }
    static changedMode() {
        if(this.NUMBER_PLAYERS === 2){ 
            
            switch (this.MODE) {
                case 1:
                    this.PROPERTI_PLAYERS = [["RED", "R", 2, 0], ["YELLOW", "Y", 2, 1]];
                    break;
                    case 2:
                        this.PROPERTI_PLAYERS = [["RED", "R", 1, 0], ["YELLOW", "Y", 2, 1]];
                        break;
                        case 3:
                            this.PROPERTI_PLAYERS = [["RED", "R", 1, 0], ["YELLOW", "Y", 1, 1]];
                            break;
                }
          }
                    
        }
    static getTurn() {
        return this.TURN;
    }
    static getNumberPlayers() {
        return this.NUMBER_PLAYERS;
    }
    static getPlayers() {
        return this.PLAYERS;
    }
    static getPropertiPlayers() {
        return this.PROPERTI_PLAYERS;
    }
    static getMode() {
        return this.MODE;
    }

    static editNumberPlayers(mensage) {
        this.NUMBER_PLAYERS = console.readNumber(`${mensage}`);
    }

    static editPlayers(mensage) {
        this.PROPERTI_PLAYERS = [];
       for (let i = 0; i < this.NUMBER_PLAYERS; i++) {
        if (!this.PROPERTI_PLAYERS[i]) {
            this.PROPERTI_PLAYERS[i] = new Array(4);}
            
            this.PROPERTI_PLAYERS[i][0] = console.readString(`${mensage.name}${i + 1}`);
            this.PROPERTI_PLAYERS[i][1] = console.readString(`${mensage.token}${i + 1} ${mensage.optionToken}`);
            this.PROPERTI_PLAYERS[i][2] = console.readNumber(`${mensage.tipe}${i + 1} ${mensage.optionTipe}`);
            this.PROPERTI_PLAYERS[i][3] = i;
        }
    }   
}





class Idiomas {
    getMainMenuMessages() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }

    getSettingsMenuMessages() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }

    getLanguageMenuMessages() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }

    getPlayersMenuMessages() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }
    getGameModeMenuMessages() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }

    getCommonMessages() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }
    getBoardMenuMessages() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }

    getMensajesResumed() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }
    getMensajesGame() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }
    getMensajesPlayers() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }
    dispatch(menuType, mensajesMenu) {
        throw new Error("Este método debe ser implementado por la subclase.");
    }
}

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
            back: "Back"
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

    dispatch(menuType, mensajesMenu) {
        return mensajesMenu.getMessagesForIngles(menuType);
    }
}

class Espaniol extends Idiomas {
    getMainMenuMessages() {
        return {
            title: "Menú Principal",
            play: "Jugar",
            editSettings: "Editar Configuración",
            exit: "Salir"
        };
    }

    getSettingsMenuMessages() {
        return {
            title: "Configuración",
            language: "Idioma",
            gameMode: "Modo de Juego",
            numberOfPlayers: "Número de Jugadores",
            editBoard: "Editar Tablero"
        };
    }

    getLanguageMenuMessages() {
        return {
            title: "Idiomas",
            spanish: "Español",
            english: "Ingles",
            changedTo: "Idioma cambiado a"
        };
    }

    getPlayersMenuMessages() {
        return {
            title: "Jugadores",
            editNumberPlayers: "Editar Número de Jugadores",
            getNumberPlayers: "Dame el Número de Jugadores: ",
            editPlayers: "Editar Jugadores",
            name: "Dame el Nombre del Jugador: ",
            token: "Dame el Token del Jugador ",
            optionToken:"(1: X, 2: O): ",
            tipe: "Dame el Tipo del Jugador ",
            optionTipe:"(1: Humano, 2: Computadora): "
        };
    }
    getGameModeMenuMessages() {
        return {
            title: "Modo de Juego",
            demo: "Demo-Game",
            playerVsCPU: "Jugador Vs CPU",
            playerVsPlayer: "Jugador Vs Jugador",
            changedTo: "Modo de Juego cambiado a"
        };
    }

 
    getBoardMenuMessages() {
        return {
            title: "Tablero",
            rows: "Editar Filas",
            columns: "Editar Columnas",
            conectToWin: "Editar Conecta para Ganar",
            editConectToWin: "Dame el numero de fichas para ganar: ",
            editRows: "Dame el numero de filas: ",
            editColumns: "Dame el numero de columnas: "
        };
    }

    getCommonMessages() {
        return {
            invalidOption: "Opción inválida",
            option: "Opción",
            newName: "Nuevo nombre",
            nameChanged: "Nombre cambiado a",
            newToken: "Nuevo token",
            tokenChanged: "Token cambiado a",
            newType: "Nuevo tipo",
            typeChanged: "Tipo cambiado a",
            back: "Volver"
        };
    }

    getMensajesResumed() {
        return {
            yes: "si",
            no: "no",
            question: "¿quieres jugar de nuevo? ",
            error: "por favor responde si o no"
        };
    }
    getMensajesGame() {
        return {
            GION : "-",
            title: "CONECTA",
            END_GAME: "EMPATE !!!",
            WIN: " GANASTE!!!  : -)"
        };
    }

    getMensajesPlayers() {
        return {
            turn: "Turno: ",
            getColumn: "Ingresa una columna para colocar una ficha: ",
            invalidColumn: `Columna inválida!!! Valores [1-${Settings.numberColumns}]`,
            formatError: "ERROR DE FORMATO!!! ingresa un valor NUMERICO",
            completedColumn: "Columna inválida!!! Esta completada",
        };
    }

    dispatch(menuType, mensajesMenu) {
        return mensajesMenu.getMessagesForEspaniol(menuType);
    }
}

class Mensajes {
    constructor() {
        this.idioma = Settings.getLanguage() === "ingles" ? new Ingles() : new Espaniol();
    }

    actualizarIdioma() {
        this.idioma = Settings.getLanguage() === "ingles" ? new Ingles() : new Espaniol();
    }
}

class MensajesMenu extends Mensajes {
    getMessages(menuType) {
        switch (menuType) {
            case "MainMenu":
                return this.idioma.getMainMenuMessages();
            case "SettingsMenu":
                return this.idioma.getSettingsMenuMessages();
            case "GameModeMenu":
                return this.idioma.getGameModeMenuMessages();
            case "LanguageMenu":
                return this.idioma.getLanguageMenuMessages();
            case "PlayersMenu":
                return this.idioma.getPlayersMenuMessages();
            case "Common":
                return this.idioma.getCommonMessages();
            case "BoardMenu":
                return this.idioma.getBoardMenuMessages();
            default:
                return {};
        }
    }

    getMessagesForIngles(menuType) {
        return this.getMessages(menuType);
    }

    getMessagesForEspaniol(menuType) {
        return this.getMessages(menuType);
    }
}

class MensajesResumed extends Mensajes {
    getMessages(menuType) {
        switch (menuType) {
            case "Resumed":
                return this.idioma.getMensajesResumed();
        }
    }

    getMessagesForIngles(menuType) {
        return this.getMessages(menuType);
    }

    getMessagesForEspaniol(menuType) {
        return this.getMessages(menuType);
    }
}

class MensajesGame extends Mensajes {
    getMessages(menuType) {
        switch (menuType) {
            case "Game":
                return this.idioma.getMensajesGame();
        }
    }

    getMessagesForIngles(menuType) {
        return this.getMessages(menuType);
    }

    getMessagesForEspaniol(menuType) {
        return this.getMessages(menuType);
    }
}

class MensajesPlayers extends Mensajes {
    getMessages(menuType) {
        switch (menuType) {
            case "Players":
                return this.idioma.getMensajesPlayers();
        }
    }

    getMessagesForIngles(menuType) {
        return this.getMessages(menuType);
    }

    getMessagesForEspaniol(menuType) {
        return this.getMessages(menuType);
    }
}







class MenuView {
    viewGame;
    console;
    mensajesMenu;
    constructor(viewGame) {
        this.viewGame = viewGame;
        this.console = new Console();
        this.mensajesMenu = new MensajesMenu();
    }


    interact(menuController, level = 0) {
        let exitMenu = false;
        while (!exitMenu) {
        menuController.updateOptions();
        const messages = this.mensajesMenu.getMessages(menuController.constructor.name);
        this.showSubMenu(messages.title, level);
        this.showMenu(menuController.options, level);
        const choice = this.getValidChoice(menuController.options);
        menuController.options[choice].execute();

        // Check if the chosen option is to exit the menu
        if (menuController.options[choice].title === "Salir" || menuController.options[choice].title === "Back") {
            exitMenu = true;
            }
       }
    }

    showMenu(options, level = 0) {
        const indent = "  ".repeat(level);
        options.forEach((opt, index) => {
            this.console.writeln(`${indent}${index + 1}. ${opt.title}`);
        });
    }

    showSubMenu(title, level = 0) {
        const indent = "  ".repeat(level);
        this.console.writeln(`\n ${indent}${title}`);
        this.console.writeln(` ${indent}${"-".repeat(title.length)}`);
    }

    getInput(prompt) {
        return this.console.readString(prompt);
    }

    showMessage(message) {
        this.console.writeln(message);
    }

    showError(message) {
        this.console.writeln(`Error: ${message}`);
    }

    getValidChoice(options) {
        const commonMessages = this.mensajesMenu.getMessages("Common");
        while (true) {
            const input = this.getInput(`${commonMessages.option}: `);
            const choice = parseInt(input) - 1;
            if (choice >= 0 && choice < options.length) return choice;
            this.showError(commonMessages.invalidOption);
        }
    }

   

    

}

class MenuController   {
    constructor() {
        this.viewMenu = new MenuView();
       
        this.options = [];
    }

    updateOptions() {}
}

class MainMenu extends MenuController {
    
    constructor(viewGame) {
        super();
        this.viewGame = viewGame;
       
    }

    updateOptions() {
        const messages = new MensajesMenu().getMessages("MainMenu");
        this.title = messages.title;
        this.options = [
            { title: messages.play, execute: () => this.startGame() },
            { title: messages.editSettings, execute: () => this.viewMenu.interact(new SettingsMenu(this.viewGame), 1) },
            { title: messages.exit, execute: () => process.exit() }
        ];
    }

    startGame() {
        let playAgain;
        do {
            this.viewGame.game.reset();
            this.viewGame.play(); // Ejecutar partida
            playAgain = new ViewResmed(new Resumed()).askToContinue(); // Preguntar continuar
        } while (playAgain);
    }
}

class SettingsMenu extends MenuController {
    
    constructor(viewGame) {
        super();
        this.viewGame = viewGame;
    }

    updateOptions() {
        const messages = new MensajesMenu().getMessages("SettingsMenu");
        const commonMessages = new MensajesMenu().getMessages("Common");
        this.title = messages.title;
        this.options = [
            { title: messages.language, execute: () => this.viewMenu.interact(new LanguageMenu(this.viewGame), 2) },
            { title: messages.gameMode, execute: () => this.viewMenu.interact(new GameModeMenu(this.viewGame), 2) },
            { title: messages.numberOfPlayers, execute: () => this.viewMenu.interact(new PlayersMenu(this.viewGame), 2) },
            { title: messages.editBoard, execute: () => this.viewMenu.interact(new BoardMenu(this.viewGame), 2) },
            { title: commonMessages.back, execute: () => this.viewMenu.interact(new MainMenu(this.viewGame), 1) }
        ];
    }
}

class LanguageMenu extends MenuController {
    constructor(viewGame) {
        super();
        this.viewGame = viewGame;
    }

    updateOptions() {
        const messages = new MensajesMenu().getMessages("LanguageMenu");
        const commonMessages = new MensajesMenu().getMessages("Common");
        this.title = messages.title;
        this.options = [
            { title: messages.english, execute: () => this.setLanguage("ingles") },
            { title: messages.spanish, execute: () => this.setLanguage("espanol") },
            { title: commonMessages.back, execute: () => this.viewMenu.interact(new SettingsMenu(this.viewGame), 2) }
        ];
    }

    setLanguage(language) {
        Settings.setLanguage(language);
        this.viewMenu.mensajesMenu.actualizarIdioma();
        this.viewMenu.interact(this); // Return to the language menu with updated language
    }
}

class PlayersMenu extends MenuController {
    constructor(viewGame) {
        super();
        this.viewGame = viewGame;
    }

    updateOptions() {
        const messages = new MensajesMenu().getMessages("PlayersMenu");
        const commonMessages = new MensajesMenu().getMessages("Common");
        this.title = messages.title;
        this.options = [
            { title: messages.editNumberPlayers, execute: () => Settings.editNumberPlayers(messages.getNumberPlayers) },
            { title: messages.editPlayers, execute: () => Settings.editPlayers(messages) },
            { title: commonMessages.back, execute: () => this.viewMenu.interact(new SettingsMenu(this.viewGame), 2) }
        ];
    }




}

class GameModeMenu extends MenuController {
    constructor(viewGame) {
        super();
        this.viewGame = viewGame;
    }

    updateOptions() {
        const messages = new MensajesMenu().getMessages("GameModeMenu");
        const commonMessages = new MensajesMenu().getMessages("Common");
        this.title = messages.title;
        this.options = [
            { title: messages.demo, execute: () => this.setMode(messages.demo, messages.changedTo, 1) },
            { title: messages.playerVsCPU, execute: () => this.setMode(messages.playerVsCPU, messages.changedTo, 2) },
            { title: messages.playerVsPlayer, execute: () => this.setMode(messages.playerVsPlayer, messages.changedTo, 3) },
            { title: commonMessages.back, execute: () => this.viewMenu.interact(new SettingsMenu(this.viewGame), 2) }
        ];
    }

    setMode(messagesmode, messageschangedTo, mode) {
        Settings.setMode(messagesmode, messageschangedTo, mode);
        this.viewMenu.mensajesMenu.actualizarIdioma();
        this.viewMenu.interact(this);// Return to the language menu with updated language
    }

}

class BoardMenu extends MenuController {
    constructor(viewGame) {
        super();
        this.viewGame = viewGame;
    }

    updateOptions() {
        const messages = new MensajesMenu().getMessages("BoardMenu");
        const commonMessages = new MensajesMenu().getMessages("Common");
        this.title = messages.title;
        this.options = [
            { title: messages.conectToWin, execute: () => Settings.editConectToWin(messages.editConectToWin) },
            { title: messages.rows, execute: () => Settings.editNumberRows(messages.editRows) },
            { title: messages.columns, execute: () => Settings.editNumberColumns(messages.editColumns) },
            { title: commonMessages.back, execute: () => this.viewMenu.interact(new SettingsMenu(this.viewGame), 2) }
        ];
    }
}




class Game {
    board;
    players;
    mensajes;

    constructor() {
        this.board = Board.getInstance();
        this.players = new Players();
        this.mensajes = new MensajesGame();
    }
    getPlayers() {
         
        return this.players;
    }

    getMessages() {
        return this.mensajes.getMessages("Game");
    }
    actualizarIdioma() {
        this.mensajes.actualizarIdioma();
    }

    reset() {
       // this.board = new Board();
       // Coordinate.reset();
    }


    checkEndGame() {
        return this.isConecta4() || this.board.isFullBoard();
    }


    isConecta4() {
            for (let col = 1; col <= Settings.numberColumns; col++) {
                for (let row = 1; row <= Settings.numberRows; row++) {
                    const token = this.board.BOARD[`column${col}`][`row${row}`];
                    if ( token === Coordinate.tokenActual && this.checkAllDirections(col, row)) {
                        return true;
                    }
                }
            }
            return false;
    }
    
    checkAllDirections(col, row) {
            return this.checkHorizontal(col, row) ||
                   this.checkVertical(col, row) ||
                   this.checkDiagonalUp(col, row) ||
                   this.checkDiagonalDown(col, row);
    }

    checkHorizontal(col, row) {
            if (col + Settings.ConectToWin - 1 > Settings.numberColumns) return false;
            for (let i = 0; i < Settings.ConectToWin; i++) {
                if (this.board.BOARD[`column${col + i}`][`row${row}`] !== Coordinate.tokenActual) {
                    return false;
                }
            }
            return true;
    }
        
    checkVertical(col, row) {
            if (row + Settings.ConectToWin - 1 > Settings.numberRows) return false;
            for (let i = 0; i < Settings.ConectToWin; i++) {
                if (this.board.BOARD[`column${col}`][`row${row + i}`] !== Coordinate.tokenActual) {
                    return false;
                }
            }
            return true;
    }
        
    checkDiagonalUp(col, row) {
            if (col + Settings.ConectToWin - 1 > Settings.numberColumns || 
                row + Settings.ConectToWin - 1 > Settings.numberRows) return false;
            for (let i = 0; i < Settings.ConectToWin; i++) {
                if (this.board.BOARD[`column${col + i}`][`row${row + i}`] !== Coordinate.tokenActual) {
                    return false;
                }
            }
            return true;
    }
        
    checkDiagonalDown(col, row) {
            if (col - Settings.ConectToWin + 1 < 1 || 
                row + Settings.ConectToWin - 1 > Settings.numberRows) return false;
            for (let i = 0; i < Settings.ConectToWin; i++) {
                if (this.board.BOARD[`column${col - i}`][`row${row + i}`] !== Coordinate.tokenActual) {
                    return false;
                }
            }
            return true;
    }

    
}

class ViewGame {
    game;
    viewPlayers;
    viewBoard;
   constructor (game) {
       this.game = game;
       this.viewPlayers = new ViewPlayers(this.game.getPlayers());
       this.viewBoard = new ViewBoard();
   }
    play() {
    this.game.actualizarIdioma();    
    const mensajes = this.game.getMessages();
    this.showTitles(mensajes);
    let board = Board.getInstance();
    board.createBoard();
    this.viewBoard.showBoard();
    Settings.createPlayers();
    do {
        this.viewPlayers.iterac();
        Settings.incrementTurn();
        this.viewBoard.showBoard();
    } while (!this.game.checkEndGame());
    this.showEndGame(mensajes, board);
   }
   showTitles(mensajes) {
        this.centerTitle(mensajes);
    }
    
    centerTitle(mensajes) {
        const title = mensajes.title;
        const titleLength = title.length;
        const GION = mensajes.GION;
        const numberColumns = Settings.numberColumns;
        const CELL_WIDTH = Settings.CELL_WIDTH;
        const totalTextLength = titleLength + Settings.ConectToWin.toString().length + 1; // Add 1 for space
        const totalGions = numberColumns * CELL_WIDTH + (numberColumns - 1); // Adjust for vertical separators

        let leftGion = Math.floor((totalGions - totalTextLength) / 2);
        let rightGion = totalGions - totalTextLength - leftGion;

        console.writeln(`${GION.repeat(leftGion)} ${title} ${Settings.ConectToWin} ${GION.repeat(rightGion)}`); 
    }
    showEndGame(mensajes, board) {

        let players = this.game.getPlayers();

        let activePlayer = players.getActivePlayer();

        if (this.game.isConecta4()) {
            console.writeln(activePlayer.name + mensajes.WIN);
        } else if (board.isFullBoard()) {
            console.writeln(mensajes.END_GAME);
        }
    }

}

class Coordinate {
    static actualColumn = 0;
    static pocitionInRowLastToken = 0;
    static tokenActual = "";

    constructor(){
       
    }
    static asigColumn(proposedColumn) {
        this.actualColumn = proposedColumn;
    }
    static asigPocitionInRowLastToken(Row) {
        this.pocitionInRowLastToken = Row;
    }
    static asigTokenActual(token) {
        this.tokenActual = token;
    }
    static reset() {
        this.actualColumn = 0;
        this.pocitionInRowLastToken = 0;
        this.tokenActual = "";
    }
}





class Players {

    constructor() {
     this.NUMBER_PLAYERS = Settings.getNumberPlayers();
     this.PROPERTI_PLAYERS = Settings.getPropertiPlayers();
     this.PLAYERS = Settings.getPlayers();
     this.MODE = Settings.getMode();
     this.mensajes = new MensajesPlayers();
     this.activePlayer = null;
    }

    getActivePlayer() {
        return this.activePlayer;
    }
    getMessages() {
        return this.mensajes.getMessages("Players");
    }
    actualizarIdioma() {
        this.mensajes.actualizarIdioma();
    }

    interactTurn() {
        for (let i = 0; i < this.NUMBER_PLAYERS; i++) {
            const playerKey = `player${i + 1}`;
            const player = Settings.PLAYERS[playerKey];
            if (player.turn === Settings.TURN) {
              
            
               // console.writeln(` EN ITERACT TURN player.tipe.gettipe(): ${player.tipe.gettipe()}`);
                
                this.activePlayer = player;
               // console.writeln(` EN ITERACT ACTIVEPLAYER.TIPE: ${this.activePlayer.tipe.gettipe()}`);
 
                break; 
            }
        }

        if (!this.activePlayer) {
            console.writeln("Error: No se encontró un jugador activo para el turno actual.");
        }
    }
    
    accept(visitor) {} 

}
class ViewPlayers {
    
    constructor(players) {
        this.players = players;
        this.mensajes = this.players.getMessages();
        this.activePlayer ;
    }
    
    iterac() {
        this.players.interactTurn();
        this.activePlayer = this.players.getActivePlayer();
        this.activePlayer.tipe.accept(this); //paso 1 le envio a la clase base players aceptame y le envio el objeto viewPlayers
    }
    
    
    interactTurn() {
        this.players.interactTurn();
    }
    
    visitHumanPlayers(HumanPlayer) { // paso 4 recibo el objeto humanPlayer y lo mando a la subclase viewHumanPlayers
         new ViewHumanPlayers(HumanPlayer).play();
    }
    visitComputerPlayers(computerPlayer) {// paso 4 recibo el objeto computerPlayer y lo mando a la subclase viewComputerPlayers
        new ViewComputerPlayers(computerPlayer).play();
    }

    play() {}
    showTurn() {}
    validColumn() {}
    showMsgError() {}
    
}


class InterfazPlayers {
    accept(visitor , board) {} 
    constructor() {

    }
}
 
class humanPlayer extends Players{
    constructor(){
        super();
    }

    accept(visitor) { // paso 3 acepto el objeto viewPlayers y le digo visitor que me va a visitar y le paso this que es el objeto humanPlayer
      
        visitor.visitHumanPlayers(this);
        
    }
}
class ComputerPlayer extends Players{
    constructor(){
        super();
    }

    accept(visitor) { // paso 3 acepto el objeto viewPlayers y le digo visitor que me va a visitar y le paso this que es el objeto ComputerPlayer
         visitor.visitComputerPlayers(this);
    }
    getColumn() {
        return Math.floor(Math.random() * Settings.numberColumns) + 1;
    }
}

class ViewHumanPlayers extends ViewPlayers{
    constructor(player) {
       super(player); 
    }
    play() {
        let board = Board.getInstance();
      
        this.players.interactTurn();
        this.players.actualizarIdioma();
        this.activePlayer = this.players.getActivePlayer();
        this.showTurn();

        let banderaproposedColumn = true;
        do {
        let proposedColumn = this.getColumn();
        if (this.validColumn(proposedColumn, board)) {
            this.showMsgError(proposedColumn , board);
        }else {
            Coordinate.asigColumn(proposedColumn);
            board.dropToken(this.activePlayer.token);
            banderaproposedColumn = false;
        }
      } while (banderaproposedColumn);

      
    }


    showTurn() {
        console.writeln(`${this.mensajes.turn} ${this.activePlayer.name}`);
    }
    getColumn() {
        return console.readNumber(`${this.mensajes.getColumn}`);
    }
    validColumn(proposedColumn , board) {
        return this.erroFormat(proposedColumn) || this.invalidColumn(proposedColumn) || this.completeColumn(proposedColumn, board);
    }
    erroFormat(proposedColumn) {
        if(!Number.isInteger(proposedColumn)) {
            return true;
        }
        return false;
    }

    completeColumn(proposedColumn, board) {
       return board.completeColumn(proposedColumn);
    }
    invalidColumn(proposedColumn) {
        if (proposedColumn < 1 || proposedColumn > Settings.numberColumns) {
            return true;
        }
        return false;
    }
  
    showMsgError(proposedColumn , board) {
        if (this.erroFormat(proposedColumn)) {
            console.writeln(`showMsgError this.mensajes.erroFormat ${this.mensajes.formatError}`);

        }else if (this.invalidColumn(proposedColumn)) {
            console.writeln(`showMsgError this.mensajes.invalidColumn ${this.mensajes.invalidColumn}`);


        }else if (this.completeColumn(proposedColumn , board)) {
            console.writeln(` showMsgError this.mensajes.completeColumn ${this.mensajes.completedColumn}`);

        }
    }


}
class ViewComputerPlayers extends ViewPlayers{
    constructor(players) {
       super(players); 
    }
    play() {
        let board = Board.getInstance();
        this.players.interactTurn();
        this.activePlayer = this.players.getActivePlayer();
        this.players.actualizarIdioma();
     
        this.showTurn();
        let banderaproposedColumn = true;
        do {
            let proposedColumn = this.activePlayer.tipe.getColumn();
            
            if (proposedColumn === undefined) {
            
            }

        if (this.validColumn(proposedColumn, board)) {
            this.showMsgError(proposedColumn , board);
        }else {
            Coordinate.asigColumn(proposedColumn);
            board.dropToken(this.activePlayer.token);
            banderaproposedColumn = false;
        }
      } while (banderaproposedColumn);

     
    }
   
    showTurn() {
        console.writeln(`${this.mensajes.turn} ${this.activePlayer.name}`);
    }
    validColumn(proposedColumn , board) {
        return this.erroFormat(proposedColumn) ||  this.invalidColumn(proposedColumn) || this.completeColumn(proposedColumn , board);
    }

    erroFormat(proposedColumn) {
        if(!Number.isInteger(proposedColumn)) {
            return true;
        }
        return false;
    }

    completeColumn(proposedColumn , board) {
       return board.completeColumn(proposedColumn);
    }
    invalidColumn(proposedColumn) {
        if (proposedColumn < 1 || proposedColumn > Settings.numberColumns) {
            return true;
        }
        return false;
    }

    showMsgError(proposedColumn , board) {
        if (this.erroFormat(proposedColumn)) {
            console.writeln(`proposedColum :${proposedColumn}`);
            console.writeln(` showMsgError en viewComputerPlayers this.mensajes.erroFormat ${this.mensajes.formatError}`);

        }else if (this.invalidColumn(proposedColumn)) {
            console.writeln(this.mensajes.invalidColumn);


        }else if (this.completeColumn(proposedColumn , board)) {
            console.writeln(this.mensajes.compledteColumn);


        }
    }


} 



class Board {
    
    constructor() {
        if (Board.instance) {
            return Board.instance;
        }
        Board.instance = this;

        this.BOARD = {};
        this.tokenQuantityOnBoard = 0;
    }

    static getInstance() {
        if (!Board.instance) {
            Board.instance = new Board();
        }
        return Board.instance;
    }


    createBoard() {
        for (let i = 1; i <= Settings.numberColumns; i++) {
            this.createColumns(i);
        }
    }

    createColumns(columnNumber) {
        this.BOARD[`column${columnNumber}`] = {};
        for (let j = 1; j <= Settings.numberRows; j++) {
            this.createRow(columnNumber, j);
        }
    }

    createRow(columnNumber, rowNumber) {
        this.BOARD[`column${columnNumber}`][`row${rowNumber}`] = Settings.TOKEN_EMPTY;
    }



    completeColumn(proposedColumn) {
        if (this.BOARD[`column${proposedColumn}`][`row${Settings.numberRows}`] !== Settings.TOKEN_EMPTY) {
            return true;
        }
        return false;
    }


    dropToken(token) {
        this.BOARD[`column${Coordinate.actualColumn}`][`row${this.isOcupiedRow()}`] = token;
        Coordinate.asigTokenActual(token);
        this.tokenQuantityOnBoard++;
    } 
    isOcupiedRow() {
        for (let row = 1; row <= Settings.numberRows; row++) {
            if (this.BOARD[`column${Coordinate.actualColumn}`][`row${row}`] === Settings.TOKEN_EMPTY) {
                Coordinate.asigPocitionInRowLastToken(row);
                return row;
            }
        }
    }


    isFullBoard() {
        return this.tokenQuantityOnBoard === Settings.numberColumns * Settings.numberRows;
    }

}
class ViewBoard {
    board;
    constructor() {
        this.board = Board.getInstance();
        this.HORIZONTAL_LINE = "-";
        this.VERTICAL_LINE = "|";
        this.horizonatlLength = 0;
        this.horizontalLine = "";
    }
    showBoard() {
        this.calculateDimensions();
        console.writeln(this.horizontalLine);
        this.iterateRows();
        console.writeln(this.horizontalLine);
    }

    calculateDimensions() {
        this.horizonatlLength = (Settings.CELL_WIDTH + 1) * Settings.numberColumns + 1;
        this.horizontalLine = this.HORIZONTAL_LINE.repeat(this.horizonatlLength);
    }

    iterateRows() {
        for (let row = Settings.numberRows; row >= 1; row--) {
            let rowDisplay = this.VERTICAL_LINE;
            this.iterateColumns(row, rowDisplay);
        }
    }

    iterateColumns(row, rowDisplay) {
        for (let col = 1; col <= Settings.numberColumns; col++) {
            let token = this.board.BOARD[`column${col}`][`row${row}`];
            rowDisplay += this.formatCell(token) + this.VERTICAL_LINE;
        }
        console.writeln(rowDisplay);
    }

    formatCell(token) {
        if (token === Settings.TOKEN_EMPTY) {
            return Settings.TOKEN_EMPTY + Settings.TOKEN_EMPTY + Settings.TOKEN_EMPTY;
        } else {
            return Settings.TOKEN_EMPTY + token + Settings.TOKEN_EMPTY;
        }
    }

    
}





// Define la interfaz para la vista
class View {
    start() {
        throw new Error("Este método debe ser implementado por la subclase.");
    }

    accept(conecta4) {
        throw new Error("Este método debe ser implementado por la subclase.");
    }
}

// Implementación concreta de la vista de consola
class ViewConsole extends View {
    constructor(MainMenu , viewMenu) {
        super();
        this.MainMenu = MainMenu;
        this.viewMenu = viewMenu;
    }

    start() {
        this.viewMenu.interact(this.MainMenu);
    }

    accept(conecta4) {
        conecta4.visitViewConsole(this);
    }
}

// Implementación concreta de la vista HTML
class ViewHTML extends View {
    constructor(conecta4) {
        super();
        this.conecta4 = conecta4;
        // Aquí podrías inicializar componentes específicos para HTML
    }

    start() {
        // Implementar la lógica para iniciar la vista HTML
        console.log("Iniciando vista HTML...");
    }

    accept(conecta4) {
        conecta4.visitViewHTML(this);
    }
}

// Clase principal Conecta4 que ahora maneja Game y MainMenu
class Conecta4 {
    constructor(view, game) {
        this.game = game
        this.view = view;
    }

    static main(viewType) {
        let game = new Game();
        let view;
        
        switch (viewType) {
            case 'console':
                view = new ViewConsole(new MainMenu(new ViewGame(game)), new MenuView);
                break;
            case 'html':
                view = new ViewHTML(this);
                break;
            default:
                throw new Error("Tipo de vista no soportado");
        }

        new Conecta4(view, game).start();
    }

    start() {
        this.view.accept(this);
    }

    visitViewConsole(viewConsole) {
        viewConsole.start();
    }

    visitViewHTML(viewHTML) {
        viewHTML.start();
    }


    getGame() {
        return this.game;
    }
}

// Llamada al método main con la vista deseada
Conecta4.main('console'); // Para usar la vista de consola
// Conecta4.main('html'); // Para usar la vista HTML



