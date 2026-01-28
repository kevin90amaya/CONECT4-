package servicebackmenu2;

abstract class Option {

    protected String title;

    protected Option(String title) {
        this.title = title;
    }

    public abstract void interact();

    public void showTitle(int index) {
        Console.getInstance().writeln(index + ". " + this.title);
    }

}
