package servicebackmenu2;

abstract class BackMenu extends NavigatorMenu {
    private BackOption backOption;
    public String previousMenu;

    public BackMenu(String title, String previousMenu) {
        super(title);
        this.previousMenu = previousMenu;
        this.backOption = new BackOption(this.previousMenu);
    }

    protected void showTitles() {
        if (!this.hasOption(this.backOption)) {
            this.add(this.backOption);
        }
        super.showTitles();
    }

    protected boolean isExecutedBackOption() {
        boolean wasExecuted = this.backOption.isExecuted();
        if (wasExecuted) {
            this.backOption.reset();
        }
        return wasExecuted;
    }
}
    