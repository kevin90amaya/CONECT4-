package com.conect4maxmax.conect4.models;

import java.util.concurrent.ThreadLocalRandom;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ComputerPlayer {

@Autowired
private Board board;

public int getColumn() {
    return ThreadLocalRandom.current().nextInt(0, this.board.getNumberColumns());
}

public Board getBoard() {
    return this.board;
}
    
}
