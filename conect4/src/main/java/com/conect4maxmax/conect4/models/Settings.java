package com.conect4maxmax.conect4.models;

public class Settings {


    static public Settings instance;

    private int numberColumns;
    private int numberRows;
    private int numberToWin;
    private int turn;
	private int mode;
	private int number_players;
    private Object players;
    private Object [][] Properti_Players;
    
    
     Settings() {
		this.numberColumns = 7;
		this.numberRows = 6;
		this.numberToWin = 4;
		this.mode = 2;
		this.number_players = 2;
		this.turn = 0;
		this.players = new Object[number_players];
		this.Properti_Players = new Object[][]{{"RED", "R", 1, 0}, {"YELLOW", "Y", 2, 1}};
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

    public void setNumberPlayers() {
       
    }
    
    public Object[][]getPropertiPlayers() {
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

