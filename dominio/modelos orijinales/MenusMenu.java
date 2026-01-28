package servicebackmenu2;

public class MenusMenu extends MessagesMenu{
    private ListMenus listMenus;    
    public MenusMenu() {
        super("Menus");
        this.listMenus = ListMenus.getInstance();
    }
    
    protected void addOptions() {
        for (String name : this.listMenus.getMenuNames()) {
            this.add(new GoMenuOption(name));
        }
    }
}
