package servicebackmenu2;

import servicebackmenu2.ListMenus;

public class BackOption extends servicebackmenu2.MessagesOption {
    
    private boolean executed;
    public String previousMenu;

    public BackOption(String previousMenu) {
        super("Atras");
        this.executed = false;
        this.previousMenu = previousMenu;
    }

    public void interact() {
        this.executed = true;
        ListMenus.getInstance().getMenu(this.previousMenu).interact();
    }

    protected boolean isExecuted() {
        return this.executed;
    }
    
    protected void reset() {
        this.executed = false;
    }
}
