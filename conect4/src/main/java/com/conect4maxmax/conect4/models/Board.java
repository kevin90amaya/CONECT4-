package com.conect4maxmax.conect4.models;

import org.springframework.stereotype.Component;

@Component
public class Board {
    
    int actualColumn;
    Color colorActual;
    int numberColumns;
    int numberRows;
    int numberToWin;
    Cell[][] columns;
    int colorsQuantityOnCells;
    
    public Board() {
        this.actualColumn = 0;
        this.colorActual = null;
        this.numberColumns = 7;
        this.numberRows = 6;
        this.numberToWin = 4;
        this.colorsQuantityOnCells = 0;
    }


public void create() {
    this.columns = new Cell[this.numberColumns][this.numberRows];
    for (int column = 0; column < this.numberColumns; column++) {
        for (int row = 0; row < this.numberRows; row++) {
            this.columns[column][row] = new Cell(Color.EMPTY);
        }
    }
}

public void reset() {
    this.create();
    this.colorsQuantityOnCells = 0;
    this.actualColumn = 0;
    this.colorActual = null;
}

public Cell[][] getBoard() {
    return this.columns;  
}

public int getNumberColumns(){
    return this.numberColumns;
}

public Color geColor(int column, int row){
    return this.columns[column][row].getColor();
}

public int getNumberToWin(){
    return this.numberToWin;
}

public void setNumberColumns(int numberColumns) {
    int minColumns = 3;
    int maxColumns = 30;

    if(numberColumns < minColumns || numberColumns > maxColumns) {
        throw new IllegalArgumentException("Number of columns must be between " + minColumns + " and " + maxColumns);
    }

    this.numberColumns = numberColumns;
}

public void setNumberRows(int numberRows) {
    int minRows = 3;
    int maxRows = 30;

    if(numberRows < minRows || numberRows > maxRows) {
        throw new IllegalArgumentException("Number of rows must be between " + minRows + " and " + maxRows);
    }
    
    this.numberRows = numberRows;
}

public void setNumberToWin(int numberToWin) {
    int minToWin = 3;
    int maxToWin = 30;
    if(numberToWin < minToWin || numberToWin > maxToWin) {
        throw new IllegalArgumentException("Number of to win must be between " + minToWin + " and " + maxToWin);
    }

    if(numberToWin > this.numberColumns && numberToWin > this.numberRows) {
        throw new IllegalArgumentException("Number of to win must be less than or equal to the number of columns and rows");
    }
    
    this.numberToWin = numberToWin;
}




public int getColorsQuantityOnBoard() {
    return this.colorsQuantityOnCells; 
}

public void asigColumn(int proposedColumn) {
    this.actualColumn = proposedColumn;
}



public void asigColorActual(Color colorActual) {
    this.colorActual = colorActual;
}

public void incrementColorsQuantityOnCells() {
    this.colorsQuantityOnCells++;
}



public void dropColor(Color color) {
    this.columns[this.actualColumn][this.findEmptyRow() ].setColor(color);
    this.asigColorActual(color);
    this.incrementColorsQuantityOnCells();
}

public boolean isCompleteColumn(int proposedColumn) {
    if(this.columns[proposedColumn][this.numberRows - 1].getColor() != Color.EMPTY) {
        return true;
    }
    return false;
}

private int findEmptyRow() {
     for(int row = 0 ; row <= this.numberRows -1 ; row++) {
        if(this.columns[this.actualColumn][row].getColor() == Color.EMPTY) {
            return row;
        }
    }
    throw new IllegalStateException("Column is full");
}







public boolean checkEndGame() {
    return this.isConectToWin() || this.isFullBoard(); 
}

public boolean isFullBoard() {
    return this.colorsQuantityOnCells == this.numberColumns * this.numberRows;
}

public boolean isConectToWin() {
return this.checkAllDirections();
}

public boolean checkAllDirections() {
    return this.checkHorizontal() || 
    this.checkVertical() || 
    this.checkDiagonalUp() || 
    this.checkDiagonalDown();
}

public boolean checkHorizontal() {
    for(int row = 0; row < this.numberRows; row++) {
        int consecutiveCount = 0;
        
        for(int col = 0; col < this.numberColumns; col++) {
            if(this.columns[col][row].getColor() == this.colorActual) {
                consecutiveCount++;
                if(consecutiveCount == this.numberToWin) {
                    return true;
                }
            } else {
                consecutiveCount = 0;
            }
        }
    }
    return false;
}

public boolean checkVertical() {
    for(int col = 0; col < this.numberColumns; col++) {
        int consecutiveCount = 0;
        
        for(int row = 0; row < this.numberRows; row++) {
            if(this.columns[col][row].getColor() == this.colorActual) {
                consecutiveCount++;
                if(consecutiveCount == this.numberToWin) {
                    return true;
                }
            } else {
                consecutiveCount = 0;
            }
        }
    }
    return false;
}

public boolean checkDiagonalUp() {
    int consecutiveCount = 0;
    
    for (int row = 0; haySuficientesFilasParaVerificar(row, consecutiveCount); row++) {

        for (int col = this.dameLaColumnaMaximaYSuficienteParaVerificar(); col >= 0; col--) {

            for (int i = 0; i < this.numberToWin; i++) {

                if (this.columns[col + i][row + i].getColor() == this.colorActual){
                    consecutiveCount++;
                    if(consecutiveCount == this.numberToWin) {
                        return true;
                    }
                }else{
                    consecutiveCount = 0;
                }
            }
        }
    }
    return false;
}

public int dameLaColumnaMaximaYSuficienteParaVerificar() {
    return this.numberColumns - this.numberToWin;
}

public boolean haySuficientesFilasParaVerificar(int row, int consecutiveCount) {
    int filasNecesitadas = this.numberToWin - consecutiveCount;
    return row <= this.numberRows - filasNecesitadas;
}
 
public boolean checkDiagonalDown() {
        int consecutiveCount = 0;
    
    for (int row = 0; haySuficientesFilasParaVerificar(row, consecutiveCount); row++) {

        for (int col = this.numberToWin - 1; col <= this.numberColumns - 1; col++) {

            for (int i = 0; i < this.numberToWin; i++) {

                if (this.columns[col - i][row + i].getColor() == this.colorActual){
                    consecutiveCount++;
                    if(consecutiveCount == this.numberToWin) {
                        return true;
                    }
                }else{
                    consecutiveCount = 0;
                }
            }
        }
    }
    return false;
}


}

