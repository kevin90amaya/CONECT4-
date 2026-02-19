package com.conect4maxmax.conect4.models;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;
import java.util.Map;
import static org.hamcrest.CoreMatchers.equalTo;
import static org.hamcrest.CoreMatchers.is;
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
    Board board = new Board(); // El constructor ya llama a createBoard()
    
    Map<String, Map<String, String>> result = board.getBoard();
    
    // result contiene:
    // {
    //   column1: {row1: " ", row2: " ", row3: " ", row4: " ", row5: " ", row6: " "},
    //   column2: {row1: " ", row2: " ", row3: " ", row4: " ", row5: " ", row6: " "},
    //   ...
    //   column7: {row1: " ", row2: " ", row3: " ", row4: " ", row5: " ", row6: " "}
    // }
    
    assertThat(result.size(), is(equalTo(7))); // 7 columnas
    assertThat(result.get("column1").size(), is(equalTo(6))); // 6 filas
   }



}