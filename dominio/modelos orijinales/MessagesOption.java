package servicebackmenu2;

abstract class MessagesOption extends Option{
    protected Messages messages;
    
    public MessagesOption(String title) {
        super(title);
        this.messages = new Messages();
    }
    
}
