class MessageResumed extends Message {
    getMessages(menuType) {
        switch (menuType) {
            case "Resumed":
                return this.idioma.getMessagesResumed();
        }
    }

    getMessagesForIngles(menuType) {
        return this.getMessages(menuType);
    }

    getMessagesForEspañol(menuType) {
        return this.getMessages(menuType);
    }
}