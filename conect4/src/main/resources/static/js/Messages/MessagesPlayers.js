class MessagesPlayers extends Message {
    getMessages(menuType) {
        switch (menuType) {
            case "Players":
                return this.idioma.getMessagesPlayers();
        }
    }

    getMessagesForIngles(menuType) {
        return this.getMessages(menuType);
    }

    getMessagesForEspañol(menuType) {
        return this.getMessages(menuType);
    }
}