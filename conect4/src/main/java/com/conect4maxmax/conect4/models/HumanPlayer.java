package com.conect4maxmax.conect4.models;

import org.springframework.beans.factory.annotation.Autowired;

public class HumanPlayer {

    @Autowired
    private Board board;
    
    public Board getBoard() {
        return board;
    }
}
