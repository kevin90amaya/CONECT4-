package com.conect4maxmax.conect4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conect4maxmax.conect4.models.Board;

@Service
public class boardService {
    @Autowired
    private Board board;

    public void createBoard() {
        board.create();
    }
    
    public Board getBoard() {
        return board;
    }

    public void resetBoard() {
        board.reset();
    }


}
