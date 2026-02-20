package com.conect4maxmax.conect4.models;


import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.fail;

import java.util.ArrayList;

import static org.junit.jupiter.api.Assertions.assertThrows;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PlayersTest {

    @Autowired
    Players players;

    @BeforeEach
    public void setUp() {
        players.getPropertiPlayers().clear();
        players.getPropertiPlayers().add(new Object[]{"RED", "R", 1, 0});
        players.getPropertiPlayers().add(new Object[]{"YELLOW", "Y", 2, 1});
        players.setNumberPlayers(2);
    }

    @AfterEach
    public void tearDown() {

    }

    @Test
    public void testInitialProperties() {
        assertThat(players.getPropertiPlayers().size(), is(equalTo(2)));
        assertThat(players.getPropertiPlayers().get(0)[0], is(equalTo("RED")));
        assertThat(players.getPropertiPlayers().get(0)[1], is(equalTo("R")));
        assertThat(players.getPropertiPlayers().get(0)[2], is(equalTo(1)));
        assertThat(players.getPropertiPlayers().get(0)[3], is(equalTo(0)));
        assertThat(players.getPropertiPlayers().get(1)[0], is(equalTo("YELLOW")));
        assertThat(players.getPropertiPlayers().get(1)[1], is(equalTo("Y")));
        assertThat(players.getPropertiPlayers().get(1)[2], is(equalTo(2)));
        assertThat(players.getPropertiPlayers().get(1)[3], is(equalTo(1)));
        }

    @Test    
    public void testSetNumberPlayersMenorException() {
        assertThrows(IllegalArgumentException.class, () -> {
            players.setNumberPlayers(1);
        });
        }
    
    @Test
    public void testSetNumberPlayersMayorException() {
        assertThrows(IllegalArgumentException.class, () -> {
                players.setNumberPlayers(11);
        });
        }

    @Test
    public void testSetNumberPlayers() {
        players.setNumberPlayers(2);
        assertThat(players.getNumberPlayers(), is(equalTo(2)));
        players.setNumberPlayers(10);
        assertThat(players.getNumberPlayers(), is(equalTo(10)));
        }

    @Test
    public void testCreatePlayers() {
        }

    @Test
    public void testGetTipe() {     
        assertThat(players.getTipe(1), is(instanceOf(HumanPlayer.class)));
        assertThat(players.getTipe(2), is(instanceOf(ComputerPlayer.class)));
        }

    @Test
    public void testGetTipeMayorException() {
        assertThrows(IllegalArgumentException.class, () -> {
            players.getTipe(3);
            fail("No se lanzo la excepcion");
        });
    }

    @Test
    public void testGetTipeMenorException() {
        assertThrows(IllegalArgumentException.class, () -> {
            players.getTipe(0);
            fail("No se lanzo la excepcion");
        });
    }

}
