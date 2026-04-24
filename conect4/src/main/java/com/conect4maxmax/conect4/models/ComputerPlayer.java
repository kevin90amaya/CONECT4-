package com.conect4maxmax.conect4.models;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ComputerPlayer {

@Autowired
private Board board;

public int getColumn() {
    if (this.board.isFullBoard()) {
        throw new IllegalStateException("Board is full");
    }

    int column = ThreadLocalRandom.current().nextInt(0, this.board.getNumberColumns());
    while (this.board.isCompleteColumn(column)) {
        column = ThreadLocalRandom.current().nextInt(0, this.board.getNumberColumns());
    }
    return column;
}

public Board getBoard() {
    return this.board;
}
    
}
