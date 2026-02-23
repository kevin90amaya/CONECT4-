package com.conect4maxmax.conect4.models;


import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.is;
import static org.junit.jupiter.api.Assertions.fail;


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
        players.setNumberPlayers(2);
        players.getPlayers().clear();
        players.getPlayers().add(new PlayerProperties("RED", "R", 1, 0));
        players.getPlayers().add(new PlayerProperties("YELLOW", "Y", 2, 1));
    }

    @AfterEach
    public void tearDown() {

    }

    @Test
    public void testInitialProperties() {
        assertThat(players.getPlayers().size(), is(equalTo(2)));
        assertThat(players.getPlayers().get(0).getName(), is(equalTo("RED")));
        assertThat(players.getPlayers().get(0).getToken(), is(equalTo("R")));
        assertThat(players.getPlayers().get(0).getTipe(), is(equalTo(1)));
        assertThat(players.getPlayers().get(0).getTurn(), is(equalTo(0)));
        assertThat(players.getPlayers().get(1).getName(), is(equalTo("YELLOW")));
        assertThat(players.getPlayers().get(1).getToken(), is(equalTo("Y")));
        assertThat(players.getPlayers().get(1).getTipe(), is(equalTo(2)));
        assertThat(players.getPlayers().get(1).getTurn(), is(equalTo(1)));
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
    public void testSetPlayersExeption() {
        assertThrows(IllegalArgumentException.class, () -> {
            java.util.List<PlayerProperties> playersList = new java.util.ArrayList<>();
            playersList.add(new PlayerPropertiesBuilder().build());
            playersList.add(new PlayerPropertiesBuilder().build());
            playersList.add(new PlayerPropertiesBuilder().build());   
            players.setPlayers(playersList);
            });
        }

    @Test    
    public void testSetPlayers() {
        java.util.List<PlayerProperties> playersList = new java.util.ArrayList<>();
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        players.setNumberPlayers(3);
        players.setPlayers(playersList);
        assertThat(players.getPlayers().size(), is(equalTo(3)));

        playersList.clear();
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        playersList.add(new PlayerPropertiesBuilder().build());
        players.setNumberPlayers(9);
        players.setPlayers(playersList);
        assertThat(players.getPlayers().size(), is(equalTo(9)));

        }
    
    @Test
    public void testSetNumberPlayers() {
        players.setNumberPlayers(2);
        assertThat(players.getNumberPlayers(), is(equalTo(2)));
        players.setNumberPlayers(10);
        assertThat(players.getNumberPlayers(), is(equalTo(10)));
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

    @Test
    public void testGetPlayers() {
        java.util.List<PlayerProperties> playersList = new java.util.ArrayList<>();
        playersList.add(new PlayerPropertiesBuilder().name("RED").build());
        playersList.add(new PlayerPropertiesBuilder().name("YELLOW").build());
        playersList.add(new PlayerPropertiesBuilder().name("RED").build());
        playersList.add(new PlayerPropertiesBuilder().name("ORANGE").build());
        playersList.add(new PlayerPropertiesBuilder().name("PURPLE").build());
        players.setNumberPlayers(5);
        players.setPlayers(playersList);
        assertThat(players.getPlayers().size(), is(equalTo(5)));
        assertThat(players.getPlayers().get(0).getName(), is(equalTo("RED")));
        assertThat(players.getPlayers().get(1).getName(), is(equalTo("YELLOW")));
        assertThat(players.getPlayers().get(2).getName(), is(equalTo("RED")));
        assertThat(players.getPlayers().get(3).getName(), is(equalTo("ORANGE")));
        assertThat(players.getPlayers().get(4).getName(), is(equalTo("PURPLE")));
    }
}
