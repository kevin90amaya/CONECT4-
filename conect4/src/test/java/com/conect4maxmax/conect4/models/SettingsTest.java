package com.conect4maxmax.conect4.models;

import static org.hamcrest.Matchers.arrayContaining;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.fail;
import static org.junit.jupiter.api.Assertions.assertThrows;


import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;



public class SettingsTest {

    private Settings settings;

    @BeforeEach
    public void setUp() {
        settings = Settings.getInstace();
    }

    @AfterEach
    public void tearDown() {
        settings = null;
    }

    @Test
    public void testInitialProperties() {
        assertThat(settings.getNumberColumns(), is(equalTo(7)));
        assertThat(settings.getNumberRows(), is(equalTo(6)));
        assertThat(settings.getNumberToWin(), is(equalTo(4)));
        assertThat(settings.getTurn(), is(equalTo(0)));
        assertThat(settings.getMode(), is(equalTo(2)));
        assertThat(settings.getPropertiPlayers(), is(arrayContaining(arrayContaining("RED", "R", 1, 0),arrayContaining("YELLOW", "Y", 2, 1))));
        }

    @Test
    public void testCreatePlayers() {
        }

    @Test
    public void testGetTipe() {     
        assertThat(settings.getTipe(1), is(instanceOf(HumanPlayer.class)));
        assertThat(settings.getTipe(2), is(instanceOf(ComputerPlayer.class)));
        }

    @Test
    public void testGetTipeMayorException() {
        assertThrows(IllegalArgumentException.class, () -> {
            settings.getTipe(3);
            fail("No se lanzo la excepcion");
        });
    }

    @Test
    public void testGetTipeMenorException() {
        assertThrows(IllegalArgumentException.class, () -> {
            settings.getTipe(0);
            fail("No se lanzo la excepcion");
        });
    }
  

    @Test
    public void testIncrementTurn() {
        }
        
    @Test
    public void testSetNumberColumns() {
        }

    @Test
    public void testSetNumberRows() {
        }

    @Test
    public void testSetNumberToWin() {
        }

    @Test
    public void testSetMode() {
        }

    @Test
    public void testChangedMode() {
        }

    @Test
    public void testGetTurn() {
        }
    
    @Test
    public void testGetMode() {
        }

    @Test
    public void testGetNumberColumns() {
        }

    @Test
    public void testGetNumberRows() {
        }

    @Test
    public void testGetNumberToWin() {
        }

    @Test
    public void testGetPlayers() {
        }

}
