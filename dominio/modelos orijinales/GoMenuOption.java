package servicebackmenu2;

public class GoMenuOption extends MessagesOption{
    private ListMenus listMenus;    
    
    public GoMenuOption(String title) {
        super(title);
        this.listMenus = ListMenus.getInstance();
    }
    
    public void interact() {
        this.listMenus.getMenu(this.title).interact();
    }
}
