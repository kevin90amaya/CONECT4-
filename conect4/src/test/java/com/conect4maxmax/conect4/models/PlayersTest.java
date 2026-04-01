package com.conect4maxmax.conect4.models;
import static org.hamcrest.MatcherAssert.assertThat;
import static org.hamcrest.Matchers.equalTo;
import static org.hamcrest.Matchers.is;



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
        players.getPlayers().add(new PlayerProperties("RED", Color.RED, PlayerTipe.HUMAN, 0));
        players.getPlayers().add(new PlayerProperties("YELLOW", Color.YELLOW, PlayerTipe.COMPUTER, 1));
    }

    @AfterEach
    public void tearDown() {

    }

    @Test
    public void testInitialProperties() {
        assertThat(players.getPlayers().size(), is(equalTo(2)));
        assertThat(players.getPlayers().get(0).getName(), is(equalTo("RED")));
        assertThat(players.getPlayers().get(0).getColor(), is(Color.RED));
        assertThat(players.getPlayers().get(0).getTipe(), is(PlayerTipe.HUMAN));
        assertThat(players.getPlayers().get(0).getTurn(), is(equalTo(0)));
        assertThat(players.getPlayers().get(1).getName(), is(equalTo("YELLOW")));
        assertThat(players.getPlayers().get(1).getColor(), is(Color.YELLOW));
        assertThat(players.getPlayers().get(1).getTipe(), is(PlayerTipe.COMPUTER));
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

    @Test
    public void testGetCurrentPlayer() {
        players.getCurrentPlayer();
        assertThat(players.getCurrentPlayer().getName(), is(equalTo("RED")));

        players.nextTurn();
        players.getCurrentPlayer();
        assertThat(players.getCurrentPlayer().getName(), is(equalTo("YELLOW")));
    
        players.nextTurn();
        assertThat(players.getTurn(), is(equalTo(0)));
    }

    @Test
    public void testGetCurrentPlayerException() {
        java.util.List<PlayerProperties> playersList = new java.util.ArrayList<>();
        playersList.add(new PlayerPropertiesBuilder().turn(1).build());
        playersList.add(new PlayerPropertiesBuilder().turn(2).build());
        players.setNumberPlayers(2);
        players.setPlayers(playersList);

       assertThrows(IllegalStateException.class, () -> {
            players.getCurrentPlayer();
        });
    }

    @Test
    public void testGetCurrentPlayerOnMaxPlayers() {
        java.util.List<PlayerProperties> playersList = new java.util.ArrayList<>();
        playersList.add(new PlayerPropertiesBuilder().turn(0).build());
        playersList.add(new PlayerPropertiesBuilder().turn(1).build());
        playersList.add(new PlayerPropertiesBuilder().turn(2).build());
        playersList.add(new PlayerPropertiesBuilder().turn(3).build());
        playersList.add(new PlayerPropertiesBuilder().turn(4).build());
        playersList.add(new PlayerPropertiesBuilder().turn(5).build());
        playersList.add(new PlayerPropertiesBuilder().turn(6).build());
        playersList.add(new PlayerPropertiesBuilder().turn(7).build());
        playersList.add(new PlayerPropertiesBuilder().turn(8).build());
        playersList.add(new PlayerPropertiesBuilder().turn(9).build());
        players.setNumberPlayers(10);
        players.setPlayers(playersList);

        players.nextTurn();
        assertThat(players.getCurrentPlayer().getTurn(), is(equalTo(1)));

        players.nextTurn();
        players.nextTurn();
        players.nextTurn();
        players.nextTurn();
        assertThat(players.getCurrentPlayer().getTurn(), is(equalTo(5)));

        players.nextTurn();
        players.nextTurn();
        players.nextTurn();
        players.nextTurn();
        assertThat(players.getCurrentPlayer().getTurn(), is(equalTo(9)));

        players.nextTurn();
        assertThat(players.getCurrentPlayer().getTurn(), is(equalTo(0)));
    }

    @Test
    public void testChangedMode(){
        assertThat(players.getPlayers().get(0).getTipe(), is(PlayerTipe.HUMAN));
        assertThat(players.getPlayers().get(1).getTipe(), is(PlayerTipe.COMPUTER));

        players.setMode(GameMode.COMPUTER_VS_COMPUTER);
        players.changedMode();
        assertThat(players.getPlayers().get(0).getTipe(), is(PlayerTipe.COMPUTER));
        assertThat(players.getPlayers().get(1).getTipe(), is(PlayerTipe.COMPUTER));

        players.setMode(GameMode.HUMAN_VS_HUMAN);
        players.changedMode();
        assertThat(players.getPlayers().get(0).getTipe(), is(PlayerTipe.HUMAN));
        assertThat(players.getPlayers().get(1).getTipe(), is(PlayerTipe.HUMAN));
    }
}

