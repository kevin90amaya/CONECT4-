package com.conect4maxmax.conect4.models;

public class PlayerProperties {
    public String name;
    public Color color;
    public PlayerTipe tipe;
    public int turn;
    
    public PlayerProperties(String name, Color color, PlayerTipe tipe, int turn) {
        this.name = name;
        this.color = color;
        this.tipe = tipe;
        this.turn = turn;
    }
    
    public String getName() {
        return name;
    }
    
    public Color getColor() {
        return color;
    }
    
    public PlayerTipe getTipe() {
        return tipe;
    }
    
    public int getTurn() {
        return turn;
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public void setColor(Color color) { 
        this.color = color; 
    }

    public void setTipe(PlayerTipe tipe) { 
        this.tipe = tipe; 
    }
    
    public void setTurn(int turn) { 
        this.turn = turn; 
    }
}
