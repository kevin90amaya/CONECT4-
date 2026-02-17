package com.conect4maxmax.conect4.models;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class BoadTest {
 
    
    Board board;

    @BeforeEach
    public void setUp() {
        board = new Board();
    }


    @Test
    public void testCreateBoard() {
        //arrange
        
        //act
        board.createBoard();
        //assert
        
    }



}