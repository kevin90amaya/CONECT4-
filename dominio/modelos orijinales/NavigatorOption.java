package servicebackmenu2;

public class NavigatorOption extends MessagesOption {
    
    public NavigatorOption() {
        super("Navegar");
    }
    
    public void interact() {
        new MenusMenu().interact();
    }
}
