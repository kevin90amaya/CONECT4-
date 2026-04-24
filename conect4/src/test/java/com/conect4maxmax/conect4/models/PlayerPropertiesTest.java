package com.conect4maxmax.conect4.models;



import static org.hamcrest.Matchers.instanceOf;
import static org.hamcrest.Matchers.is;

import static org.hamcrest.MatcherAssert.assertThat;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class PlayerPropertiesTest {
    
        @Autowired
    Players players;


    @BeforeEach
    public void setUp() {
        players.setNumberPlayers(2);
        players.getPlayers().clear();
        players.getPlayers().add(new PlayerProperties("RED", Color.RED, PlayerTipe.HUMAN, 0));
        players.getPlayers().add(new PlayerProperties("YELLOW", Color.YELLOW, PlayerTipe.COMPUTER, 1));
    }

}
