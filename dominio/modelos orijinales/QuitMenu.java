package servicebackmenu2;

abstract class QuitMenu extends NavigatorMenu {

    private QuitOption quitOption;

    public QuitMenu(String title) {
        super(title);
        this.quitOption = new QuitOption();
    }

    protected void showTitles() {
        this.add(this.quitOption);
        super.showTitles();
    }

}
