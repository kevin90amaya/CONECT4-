package com.conect4maxmax.conect4.models;

public class PlayerProperties {
    public String name;
    public String token;
    public int tipe;
    public int turn;
    
    public PlayerProperties(String name, String token, int tipe, int turn) {
        this.name = name;
        this.token = token;
        this.tipe = tipe;
        this.turn = turn;
    }
    
    public String getName() {
        return name;
    }
    
    public String getToken() {
        return token;
    }
    
    public int getTipe() {
        return tipe;
    }
    
    public int getTurn() {
        return turn;
    }

    public void setName(String name) { 
        this.name = name; 
    }

    public void setToken(String token) { 
        this.token = token; 
    }

    public void setTipe(int tipe) { 
        this.tipe = tipe; 
    }
    
    public void setTurn(int turn) { 
        this.turn = turn; 
    }
}
