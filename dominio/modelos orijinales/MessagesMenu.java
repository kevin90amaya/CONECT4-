package servicebackmenu2;


abstract class MessagesMenu extends Menu{
    
    protected Messages messages;
    
    public MessagesMenu(String title) {
        super(title);
        this.messages = new Messages();
    }
}
