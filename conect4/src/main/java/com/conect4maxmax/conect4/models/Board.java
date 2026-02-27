package com.conect4maxmax.conect4.models;

import org.springframework.stereotype.Component;

@Component
public class Board {
    
    int actualColumn;
    int positionInRowLastColor;
    Color colorActual;
    int numberColumns;
    int numberRows;
    int numberToWin;
    Cell[][] columns;
    int colorsQuantityOnCells;
    
    public Board() {
        this.actualColumn = 0;
        this.positionInRowLastColor = 0;
        this.colorActual = Color.EMPTY;
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
    this.positionInRowLastColor = 0;
    this.colorActual = Color.EMPTY;
}

public Cell[][] getBoard() {
    return this.columns;  
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
    
    this.numberToWin = numberToWin;
}




public int getColorsQuantityOnBoard() {
    return this.colorsQuantityOnCells; 
}

public void asigColumn(int proposedColumn) {
    this.actualColumn = proposedColumn;
}

public void asigPositionInRowLastColor(int RowlastColor) {
    this.positionInRowLastColor = RowlastColor;
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
            this.positionInRowLastColor = row;
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
    for(int col = 0; col <= this.numberColumns-1; col++) {
        for(int row = 0; row <= this.numberRows-1; row++) {
            Color color = this.columns[col][row].getColor();
            if(color == this.colorActual && this.checkAllDirections(col, row))
                return true;
        }
    }
    return false;
}

public boolean checkAllDirections(int col, int row) {
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
        for (int col = this.dameLaColumnaMaximaYSuficienteParaVerificar(); haySuficientesFilasParaVerificar(row, consecutiveCount); col--) {
            
            for (int i = 0; sePuedeVerificarSiguientePosicion(row, col, i, consecutiveCount); i++) {
                if (laCeldaTieneElColorActual(col + i, row + i)) {
                    consecutiveCount++;
                    if (seAlcanzoNumeroParaGanar(consecutiveCount)) {
                        return true;
                    }
                } else {
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

// Métodos descriptivos para condiciones
public boolean haySuficientesFilasParaVerificar(int row, int consecutiveCount) {
    int filasNecesitadas = this.numberToWin - consecutiveCount;
    return row < this.numberRows - filasNecesitadas;
}

public boolean sePuedeVerificarSiguientePosicion(int row, int col, int i, int consecutiveCount) {
    int posicionesRestantesParaGanar = this.numberToWin - consecutiveCount;
    return i < posicionesRestantesParaGanar && 
           estaDentroDeLosLimitesDelTablero(row + i, col + i);
}

public boolean estaDentroDeLosLimitesDelTablero(int row, int col) {
    return row < this.numberRows && col < this.numberColumns;
}

public boolean laCeldaTieneElColorActual(int col, int row) {
    return this.columns[col][row].getColor() == this.colorActual;
}

public boolean seAlcanzoNumeroParaGanar(int consecutiveCount) {
    return consecutiveCount == this.numberToWin;
}

public boolean checkDiagonalDown() {
    if(col - this.numberToWin + 1 < 1 || row + this.numberToWin -1 > this.numberRows) {
        return false;
    }
    for(int i = 0; i < this.numberToWin; i++) {
        if(this.columns[col - i][row + i].getColor() != this.colorActual) {
            return false;
        }
    }
    return true;
}

}

