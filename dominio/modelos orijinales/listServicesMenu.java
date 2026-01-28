package servicebackmenu2;

import java.util.ArrayList;

abstract public class listServicesMenu extends BackMenu{
    public ArrayList<ServicesContract> listServices;
    
    public listServicesMenu(String title ,String previousMenu, ArrayList<ServicesContract> listServices) {
        super(title ,previousMenu);
        this.listServices = listServices;
    }

  public void interact() {
    this.removeOptions();
    this.addOptions();
    do {
      this.interact_();
    } while (!this.isExecutedBackOption());
  }

}