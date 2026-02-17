package com.conect4maxmax.conect4.models;

import java.util.Map;

public class Board {
    
    Object BOARD;
    int tokenQuantityOnBoard;
    
    public Board() {
        this.BOARD = new Object();
        this.tokenQuantityOnBoard = 0;
    }

    public void createBoard() {}

    private void createColumns(int columnNumber) {}

    private void createRow(int columnNumber, int rowNumber) {}
    public Map getBoard() {}
    public int getTokenQuantityOnBoard() {}




    private boolean completeColumn(int proposedColumn) {}
    private int isOcupiedRow() {}

    public void dropToken(String token) {}

    


    public boolean checkEndGame() {}
    public boolean isFullBoard() {}
    public boolean isConectToWin() {}
}

