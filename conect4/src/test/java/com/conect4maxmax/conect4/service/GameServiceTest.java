package com.conect4maxmax.conect4.service;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.conect4maxmax.conect4.models.Board;
import com.conect4maxmax.conect4.models.BoardBuilder;
import com.conect4maxmax.conect4.models.Color;
import com.conect4maxmax.conect4.service.dto.GameResult;
import com.conect4maxmax.conect4.service.dto.ProposedColumn;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.is;




@SpringBootTest
public class GameServiceTest {
    
    @Autowired
    GameService gameService;

    @Autowired
    BoardBuilder boardBuilder;

    @Autowired
    Board board;

    @BeforeEach
    public void setUp(){
        boardBuilder.build().reset();
    }

    @AfterEach
    public void tearDown(){}

    @Test
    public void testPlayColumnIsComplete() {
        
        board.asigColumn(0);
        board.dropColor(Color.RED);
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        board.dropColor(Color.YELLOW);

        ProposedColumn proposedColumn = new ProposedColumn();
        proposedColumn.setValue(0);
        GameResult result = gameService.play(proposedColumn);
        assertThat(result.getStatus(), is("COLUMN_IS_COMPLETE"));
    }

    @Test
    public void testPlayWin(){

        board.asigColumn(3);
        board.dropColor(Color.RED);
        board.dropColor(Color.RED);
        board.dropColor(Color.RED);

        ProposedColumn proposedColumn = new ProposedColumn();
        proposedColumn.setValue(3);
        GameResult result = gameService.play(proposedColumn);
        assertThat(result.getStatus(), is("WIN"));

    }
    
    @Test
    public void testPlayDraw() {
        boardBuilder.setNumberColumns(3).setNumberRows(10).setNumberToWin(10).build().reset();
 
        board.asigColumn(0);
        board.dropColor(Color.RED);
        board.asigColumn(0);
        board.dropColor(Color.YELLOW);
        board.asigColumn(0);
        board.dropColor(Color.RED);
        board.asigColumn(0);
        board.dropColor(Color.YELLOW);
        board.asigColumn(0);
        board.dropColor(Color.RED);
        board.asigColumn(0);
        board.dropColor(Color.YELLOW);
        board.asigColumn(0);
        board.dropColor(Color.RED);
        board.asigColumn(0);
        board.dropColor(Color.YELLOW);
        board.asigColumn(0);
        board.dropColor(Color.RED);
        board.asigColumn(0);
        board.dropColor(Color.YELLOW);

        board.asigColumn(1);
        board.dropColor(Color.RED);
        board.asigColumn(1);
        board.dropColor(Color.YELLOW);
        board.asigColumn(1);
        board.dropColor(Color.RED);
        board.asigColumn(1);
        board.dropColor(Color.YELLOW);
        board.asigColumn(1);
        board.dropColor(Color.RED);
        board.asigColumn(1);
        board.dropColor(Color.YELLOW);
        board.asigColumn(1);
        board.dropColor(Color.RED);
        board.asigColumn(1);
        board.dropColor(Color.YELLOW);
        board.asigColumn(1);
        board.dropColor(Color.RED);
        board.asigColumn(1);
        board.dropColor(Color.YELLOW);

        board.asigColumn(2);
        board.dropColor(Color.RED);
        board.asigColumn(2);
        board.dropColor(Color.YELLOW);
        board.asigColumn(2);
        board.dropColor(Color.RED);
        board.asigColumn(2);
        board.dropColor(Color.YELLOW);
        board.asigColumn(2);
        board.dropColor(Color.RED);
        board.asigColumn(2);
        board.dropColor(Color.YELLOW);
        board.asigColumn(2);
        board.dropColor(Color.RED);
        board.asigColumn(2);
        board.dropColor(Color.YELLOW);
        board.asigColumn(2);
        board.dropColor(Color.RED);
    
        ProposedColumn proposedColumn = new ProposedColumn();
        proposedColumn.setValue(2);
    
        GameResult result = gameService.play(proposedColumn);
    
        assertThat(result.getStatus(), is("DRAW"));
    }
    
    @Test
    public void testPlayNextTurn(){
        board.asigColumn(2);
        board.dropColor(Color.RED);
        board.asigColumn(2);
        board.dropColor(Color.YELLOW);
        
        ProposedColumn proposedColumn = new ProposedColumn();
        proposedColumn.setValue(2);
    
        GameResult result = gameService.play(proposedColumn);
    
        assertThat(result.getStatus(), is("NEXT_TURN"));
    }
}
