package com.conect4maxmax.conect4.models;

public class PlayerPropertiesBuilder {
    private String name = "";
    private Color color = null;
    private PlayerTipe tipe = null;
    private int turn = 0;
    
    public PlayerPropertiesBuilder name(String name) {
        this.name = name;
        return this;
    }
    
    public PlayerPropertiesBuilder color(Color color) {
        this.color = color;
        return this;
    }
    
    public PlayerPropertiesBuilder tipe(PlayerTipe tipe) {
        this.tipe = tipe;
        return this;
    }
    
    public PlayerPropertiesBuilder turn(int turn) {
        this.turn = turn;
        return this;
    }
    
    public PlayerProperties build() {
        return new PlayerProperties(name, color, tipe, turn);
    }
}