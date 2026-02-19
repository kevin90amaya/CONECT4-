package com.conect4maxmax.conect4.models;

import java.util.ArrayList;
import java.util.List;

public class Settings {


    static public Settings instance;
    
    private int minNumberPlayers;
    private int maxNumberPlayers;
    private int numberColumns;
    private int numberRows;
    private int numberToWin;
    private int turn;
	private int mode;
	private int number_players;
    private Object players;
    private List<Object[]> Properti_Players;
    
    
     Settings() {
		this.numberColumns = 7;
		this.numberRows = 6;
		this.numberToWin = 4;
		this.mode = 2;
		this.turn = 0;
        this.minNumberPlayers = 2;
        this.maxNumberPlayers = 10;
		this.number_players = 2;
		this.players = new Object[number_players];
		this.Properti_Players = new ArrayList<>();
		this.Properti_Players.add(new Object[]{"RED", "R", 1, 0});
		this.Properti_Players.add(new Object[]{"YELLOW", "Y", 2, 1});
	}



    static Settings getInstace() {
        if (instance == null) {
            instance = new Settings();
        }
        return instance;
    }

    public void createPlayers() {
        }

    public Players getTipe(int tipe) {
        if (tipe < 1 || tipe > 2) {
            throw new IllegalArgumentException("El tipo no puede ser mayor a 2 o menor a 1");
        }
        switch (tipe) {
            case 1:
                return new HumanPlayer();
            case 2:
                return new ComputerPlayer();
            default:
                throw new IllegalArgumentException("Unsupported type: " + tipe);
        }
    }


    public void incrementTurn() {
        }
        
    
    public void setNumberColumns() {
        }

    public void setNumberRows() {
        }
    
    
    public void setNumberToWin() {
    }
    
    public void setMode() {
    }
    
    public void changedMode() {
    }
    public void setPlayers() {
        
    }
    public int getTurn() {
        return this.turn;
        }

    public int getNumberPlayers() {
        return this.number_players;
        }

    public void setNumberPlayers(int number_players) {
        if (number_players < this.minNumberPlayers || number_players > this.maxNumberPlayers) {
            throw new IllegalArgumentException("El número de jugadores no puede ser menor a " + this.minNumberPlayers + " o mayor a " + this.maxNumberPlayers);
        }

        this.number_players = number_players;
    }
    
    public List<Object[]> getPropertiPlayers() {
        return this.Properti_Players;
        }
    
    public int getMode() {
        return this.mode;
        }

   
    public int getNumberColumns() {
        return this.numberColumns;
        }

    public int getNumberRows() {
        return this.numberRows;
        }

    public int getNumberToWin() {
        return this.numberToWin;
        }

    
    public Object getPlayers() {
        return this.players;
        }

}

