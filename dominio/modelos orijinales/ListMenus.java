package servicebackmenu2;

import java.util.Map;
import java.util.HashMap;
import java.util.Set;

public class ListMenus {
    private Map<String, Menu> listMenus;
    
    private static ListMenus instance;
    
    public ListMenus() {
        this.listMenus = new HashMap<>();
    }

    public static ListMenus getInstance() {
        if (ListMenus.instance == null){
            ListMenus.instance = new ListMenus();
        }
        return ListMenus.instance;
    }

    public void addMenu(String name, Menu menu) {
        this.listMenus.put(name, menu);
    }

    public Menu getMenu(String name) {
        return this.listMenus.get(name);
    }
    
    public Set<String> getMenuNames() {
        return this.listMenus.keySet();
    }
}
