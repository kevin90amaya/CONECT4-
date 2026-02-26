package com.conect4maxmax.conect4.models;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class BoadTest {
 
    
    @Autowired
    Board board;

    @Autowired
    BoardBuilder boardBuilder;

    @BeforeEach
    public void setUp() {
        boardBuilder.setNumberColumns(7).setNumberRows(6).setNumberToWin(4).build().reset();
    }

    @Test
    public void testCreateDefault() {
        assertThat(board.getBoard().length, is(equalTo(7)));
        assertThat(board.getBoard()[0].length, is(equalTo(6)));
        assertThat(board.getBoard()[0][0].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[0][5].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[6][0].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[6][5].getColor(), is(equalTo(Color.EMPTY)));
   }

   @Test
   public void testEditMinValuesBoard(){
        boardBuilder.setNumberColumns(3).setNumberRows(3).build().create();

        assertThat(board.getBoard().length, is(equalTo(3)));
        assertThat(board.getBoard()[0].length, is(equalTo(3)));
        assertThat(board.getBoard()[0][0].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[0][2].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[2][0].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[2][2].getColor(), is(equalTo(Color.EMPTY)));
   }

   @Test
   public void testEditMaxValuesBoard(){
        boardBuilder.setNumberColumns(30).setNumberRows(30).build().create();

        assertThat(board.getBoard().length, is(equalTo(30)));
        assertThat(board.getBoard()[0].length, is(equalTo(30)));
        assertThat(board.getBoard()[0][0].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[0][29].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[29][0].getColor(), is(equalTo(Color.EMPTY)));
        assertThat(board.getBoard()[29][29].getColor(), is(equalTo(Color.EMPTY)));
   }

   @Test
   public void testSetNumberColumnsMenorException(){
        assertThrows(IllegalArgumentException.class, () -> {
            boardBuilder.setNumberColumns(2).build();
        });
   }

   @Test
   public void testSetNumberColumnsMayorException(){
        assertThrows(IllegalArgumentException.class, () -> {
            boardBuilder.setNumberColumns(31).build();
        });
   }

   @Test
   public void testSetNumberRowsMenorException(){
        assertThrows(IllegalArgumentException.class, () -> {
            boardBuilder.setNumberRows(-3).build();
        });
   }

   @Test
   public void testSetNumberRowsMayorException(){
        assertThrows(IllegalArgumentException.class, () -> {
            boardBuilder.setNumberRows(300).build();
        });
   }



   

}
