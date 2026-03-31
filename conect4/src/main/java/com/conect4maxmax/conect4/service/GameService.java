package com.conect4maxmax.conect4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conect4maxmax.conect4.models.Board;
import com.conect4maxmax.conect4.models.Players;

@Service
public class GameService {
    @Autowired
    private Players players;
    @Autowired
    private Board board;

    public void reset() {
        board.reset();
        players.resetTurn();
    }

    public void isComplete() {
  
    }

    public void isWinner() {

    }

    public void isFinished() {

    }

    public void getActivePlayer() {

    }

    public void getActiveColor() {

    }

    public void nextTurn() {
    
    }
}
