package com.conect4maxmax.conect4.models;

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
}

public Cell[][] getBoard() {
    return this.columns;  
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

public void resetState() {
    this.actualColumn = 0;
    this.positionInRowLastColor = 0;
    this.colorActual = Color.EMPTY;
}

public void dropColor(Color color) {
    this.columns[this.actualColumn][this.isOcupiedRow() ].setColor(color);
    this.asigColorActual(color);
    this.colorsQuantityOnCells++;
}

private boolean completeColumn(int proposedColumn) {
    if(this.columns[proposedColumn][this.numberRows - 1].getColor() != Color.EMPTY) {
        return true;
    }
    return false;
}

private int isOcupiedRow() {
     for(int row = 1; row <= this.numberRows; row++) {
        if(this.columns[this.actualColumn][row].getColor() == Color.EMPTY) {
            this.positionInRowLastColor = row;
            return row;
        }
    }
    return 0;
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
    return this.checkHorizontal(col, row) || 
    this.checkVertical(col, row) || 
    this.checkDiagonalUp(col, row) || 
    this.checkDiagonalDown(col, row);
}

public boolean checkHorizontal(int col, int row) {
    if(col + this.numberToWin -1 > this.numberColumns) {
        return false;
    }
    for(int i = 0; i < this.numberToWin; i++) {
        if(this.columns[col + i][row].getColor() != this.colorActual) {
            return false;
        }
    }
    return true;
}

public boolean checkVertical(int col, int row) {
    if(row + this.numberToWin -1 > this.numberRows){
        return false;
    }
    for(int i = 0; i < this.numberToWin; i++) {
        if(this.columns[col][row + i].getColor() != this.colorActual) {
            return false;
        }
    }
    return true;
}

public boolean checkDiagonalUp(int col, int row) {
    if(col + this.numberToWin -1 > this.numberColumns || row + this.numberToWin -1 > this.numberRows) {
        return false;
    }
    for(int i = 0; i < this.numberToWin; i++) {
        if(this.columns[col + i][row + i].getColor() != this.colorActual) {
            return false;
        }
    }
    return true;
}

public boolean checkDiagonalDown(int col, int row) {
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

