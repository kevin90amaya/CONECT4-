package servicebackmenu2;


abstract class NavigatorMenu extends MessagesMenu{
       
    private String nameActualMenu;
    private Menu actualMenu;
    private ListMenus listMenus;
    private NavigatorOption navigatorOption;
    
    public NavigatorMenu(String title) {
        super(title);
        this.nameActualMenu = this.title;
        this.actualMenu = this;
        this.listMenus = ListMenus.getInstance();
        this.listMenus.addMenu(this.nameActualMenu, this.actualMenu);
        this.navigatorOption = new NavigatorOption();
    }

    protected void showTitles() {
        this.add(this.navigatorOption);
        super.showTitles();
    }

}
