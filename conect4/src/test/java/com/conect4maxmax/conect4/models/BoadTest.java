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

   @Test
   public void testSetNumberToWinMayorException(){
        assertThrows(IllegalArgumentException.class, () -> {
            boardBuilder.setNumberToWin(31).build();
        });
   }

   @Test
   public void testSetNumberToWinMenorException(){
        assertThrows(IllegalArgumentException.class, () -> {
            boardBuilder.setNumberToWin(2).build();
        });
   }

   @Test
   public void testSetNumberToWinZeroException(){
        assertThrows(IllegalArgumentException.class, () -> {
            boardBuilder.setNumberToWin(0).build();
        });
   }
   
   @Test
   public void testFindEmptyRow(){
        boardBuilder.setActualColumn(6).build();
        assertThat(board.getBoard()[6][0].getColor(), is(equalTo(Color.EMPTY)));

        board.dropColor(Color.YELLOW);
        assertThat(board.getBoard()[6][0].getColor(), is(equalTo(Color.YELLOW)));

        board.dropColor(Color.RED);
        assertThat(board.getBoard()[6][1].getColor(), is(equalTo(Color.RED)));

        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        assertThat(board.getBoard()[6][5].getColor(), is(equalTo(Color.RED)));
   }

   @Test
   public void testFindEmptyRowException(){
        boardBuilder.setActualColumn(0).build();
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        assertThrows(IllegalStateException.class, () -> {
            board.dropColor(Color.YELLOW);
        });
   }


   @Test
   public void testDropColor(){
        boardBuilder.setActualColumn(2).build();
        assertThat(board.colorActual, is(equalTo(Color.EMPTY)));
        assertThat(board.colorsQuantityOnCells, is(equalTo(0)));


        board.dropColor(Color.YELLOW);
        assertThat(board.getBoard()[2][0].getColor(), is(equalTo(Color.YELLOW)));
        assertThat(board.colorActual, is(equalTo(Color.YELLOW)));
        assertThat(board.colorsQuantityOnCells, is(equalTo(1)));

        board.dropColor(Color.RED);
        board.dropColor(Color.RED);
        board.dropColor(Color.RED);
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        assertThat(board.getBoard()[2][5].getColor(), is(equalTo(Color.RED)));
        assertThat(board.colorActual, is(equalTo(Color.RED)));
        assertThat(board.colorsQuantityOnCells, is(equalTo(6)));
   }

   @Test
   public void testIsCompleteColumn(){

        assertThat(board.isCompleteColumn(0), is(false));

        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);

        assertThat(board.isCompleteColumn(0), is(false));
        
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);
        board.dropColor(Color.YELLOW);
        board.dropColor(Color.RED);

        assertThat(board.isCompleteColumn(0), is(true));
   }

   @Test
   public void testCheckHorizontal(){
        board.dropColor(Color.YELLOW);
        assertThat(board.checkHorizontal(), is(false));
        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(2).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(3).build();
        board.dropColor(Color.RED);
        assertThat(board.checkHorizontal(), is(false));

        boardBuilder.setActualColumn(0).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(2).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(3).build();
        board.dropColor(Color.YELLOW);
        assertThat(board.checkHorizontal(), is(true));

        boardBuilder.setActualColumn(4).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(5).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(6).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(4).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(5).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(6).build();
        board.dropColor(Color.YELLOW);
        
        boardBuilder.setActualColumn(0).build();
        board.dropColor(Color.RED);
        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.RED);
        boardBuilder.setActualColumn(2).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(3).build();
        board.dropColor(Color.RED);
        boardBuilder.setActualColumn(4).build();
        board.dropColor(Color.RED);
        boardBuilder.setActualColumn(5).build();
        board.dropColor(Color.RED);
        boardBuilder.setActualColumn(6).build();
        board.dropColor(Color.RED);
        
        assertThat(board.checkHorizontal(), is(true));
        
    }
    
    @Test
    public void testCheckVertical(){
        board.dropColor(Color.YELLOW);
        assertThat(board.checkVertical(), is(false));
        boardBuilder.setActualColumn(0).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(0).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(0).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(0).build();
        board.dropColor(Color.YELLOW);
        assertThat(board.checkVertical(), is(true));

        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.RED);
        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.YELLOW);
        boardBuilder.setActualColumn(1).build();
        board.dropColor(Color.YELLOW);
        assertThat(board.checkVertical(), is(true));
    }




    @Test
    public void testHaysuficientesFilasParaVerificar(){

          assertThat(board.haySuficientesFilasParaVerificar(0 ,0), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(0 ,1), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(0 ,2), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(0 ,3), is(true));

          assertThat(board.haySuficientesFilasParaVerificar(1 ,0), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(1 ,1), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(1 ,2), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(1 ,3), is(true));

          assertThat(board.haySuficientesFilasParaVerificar(2 ,0), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(2 ,1), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(2 ,2), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(2 ,3), is(true));

          assertThat(board.haySuficientesFilasParaVerificar(3 ,0), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(3 ,1), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(3 ,2), is(true));
          assertThat(board.haySuficientesFilasParaVerificar(3 ,3), is(true));

          assertThat(board.haySuficientesFilasParaVerificar(4 ,0), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(4 ,1), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(4 ,2), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(4 ,3), is(true));

          assertThat(board.haySuficientesFilasParaVerificar(5 ,0), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(5 ,1), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(5 ,2), is(false));
          assertThat(board.haySuficientesFilasParaVerificar(5 ,3), is(false));

    }
    
    @Test
    public void testDameLaColumnaMaximaYSuficienteParaVerificar(){
        assertThat(board.dameLaColumnaMaximaYSuficienteParaVerificar(), is(3));
    }
    
    @Test
    public void testEstaDentroDeLosLimitesDelTablero(){
        assertThat(board.estaDentroDeLosLimitesDelTablero(0, 0), is(true));
        assertThat(board.estaDentroDeLosLimitesDelTablero(5, 0), is(true));
        assertThat(board.estaDentroDeLosLimitesDelTablero(6, 0), is(false));

        assertThat(board.estaDentroDeLosLimitesDelTablero(0, 0), is(true));
        assertThat(board.estaDentroDeLosLimitesDelTablero(0, 6), is(true));
        assertThat(board.estaDentroDeLosLimitesDelTablero(0, 7), is(false));
    }

    @Test
    public void testSePuedeVerificarSiguientePosicion(){
          assertThat(board.sePuedeVerificarSiguientePosicion(0, 0, 0,0), is(true));
          assertThat(board.sePuedeVerificarSiguientePosicion(4, 5, 1,0), is(true));
          assertThat(board.sePuedeVerificarSiguientePosicion(5, 6, 1,0), is(false));

    }




}
