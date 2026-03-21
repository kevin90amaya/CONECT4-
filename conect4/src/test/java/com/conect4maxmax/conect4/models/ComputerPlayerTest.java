package com.conect4maxmax.conect4.models;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

public class ComputerPlayerTest {

    ComputerPlayer computerPlayer;
    
    @BeforeEach
    public void setUp(){
         computerPlayer = new ComputerPlayer();
         computerPlayer.board = new Board();
    }

    @AfterEach
    public void tearDown(){

    }




    @Test
    public void testGetColumnsValuesDefautBoard() {
     assertThat(computerPlayer.getColumn(), allOf(greaterThanOrEqualTo(0), lessThanOrEqualTo(6)));
    }

    @Test
    public void testGetColumnsMaxValuesBoard() {
        computerPlayer.board.setNumberColumns(30);
        assertThat(computerPlayer.getColumn(), allOf(greaterThanOrEqualTo(0), lessThanOrEqualTo(29)));
    }

    @Test
    public void testGetColumnsMinValuesBoard() {
        computerPlayer.board.setNumberColumns(3);
        assertThat(computerPlayer.getColumn(), allOf(greaterThanOrEqualTo(0), lessThanOrEqualTo(2)));
    }

}
