package com.conect4maxmax.conect4.models;

import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class ComputerPlayerTest {

    @Autowired
    ComputerPlayer computerPlayer;
    


    @Test
    public void testGetColumnsValuesDefautBoard() {
     assertThat(computerPlayer.getColumn(), allOf(greaterThanOrEqualTo(0), lessThanOrEqualTo(6)));
    }

    @Test
    public void testGetColumnsMaxValuesBoard() {
        computerPlayer.getBoard().setNumberColumns(30);
        assertThat(computerPlayer.getColumn(), allOf(greaterThanOrEqualTo(0), lessThanOrEqualTo(29)));
    }

    @Test
    public void testGetColumnsMinValuesBoard() {
        computerPlayer.getBoard().setNumberColumns(3);
        assertThat(computerPlayer.getColumn(), allOf(greaterThanOrEqualTo(0), lessThanOrEqualTo(2)));
    }

}
