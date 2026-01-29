class QuitOption extends Option {

    title;
    
    constructor() {
        super();
    }
    
    updateTitle() {
        this.title = new MessageOption().getQuitOptionTitle();
    }
    
    execute() {
        console.log("Adios");
    }
    
}

export default QuitOption;