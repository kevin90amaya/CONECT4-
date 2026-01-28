package servicebackmenu2;

class QuitOption extends MessagesOption {

    public QuitOption() {
        super("Salir");
    }

    public void interact() {
        Console.getInstance().writeln("Adiós");
        System.exit(0); 
    }

}
