package com.conect4maxmax.conect4.models;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class BoardBuilder {

    @Autowired
    private Board board;  
    


    public BoardBuilder setActualColumn(int actualColumn) {
        board.asigColumn(actualColumn);
        return this;
    }

    public BoardBuilder setPositionInRowLastColor(int positionInRowLastColor) {
        board.asigPositionInRowLastColor(positionInRowLastColor);
        return this;
    }

    public BoardBuilder setColorActual(Color colorActual) {
        board.asigColorActual(colorActual);
        return this;
    }

    public BoardBuilder setNumberColumns(int numberColumns) {
        board.setNumberColumns(numberColumns);
        return this;
    }

    public BoardBuilder setNumberRows(int numberRows) {
        board.setNumberRows(numberRows);
        return this;
    }

    public BoardBuilder setNumberToWin(int numberToWin) {
        board.setNumberToWin(numberToWin);
        return this;
    }

    public BoardBuilder incrementColorsQuantityOnCells() {
        board.incrementColorsQuantityOnCells();
        return this;
    }

    public Board build() {
        return board; 
    }
}



