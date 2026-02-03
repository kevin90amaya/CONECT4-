class Español extends Idiomas {
    getMainMenuMessages() {
        return {
            title: "Menú Principal",
            play: "Jugar",
            editSettings: "Editar Configuración"
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
            back: "Volver",
            navigation: "Navegar",
            exit: "Salir"
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

    dispatch(menuType, messagesMenu) {
        return messagesMenu.getMessagesForEspañol(menuType);
    }
}