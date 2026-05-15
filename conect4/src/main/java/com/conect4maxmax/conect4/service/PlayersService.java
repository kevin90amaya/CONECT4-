package com.conect4maxmax.conect4.service;

import org.springframework.stereotype.Service;
import com.conect4maxmax.conect4.models.GameMode;
import com.conect4maxmax.conect4.models.Players;
import com.conect4maxmax.conect4.models.PlayerProperties;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

@Service
public class PlayersService {
    @Autowired  
    private Players players;

    public GameMode[] getGameModes() {
        return GameMode.values();
    }

    public void setGameMode(GameMode mode) {
        players.setMode(mode);
    }

    public List<PlayerProperties> getPlayers() {
        return players.getPlayers();
    }
    
    public PlayerProperties getCurrentPlayer() {
        return players.getCurrentPlayer();
    }

    public int getNumberOfPlayers() {
        return players.getNumberPlayers();
    }

    public GameMode getCurrentMode() {
       return players.getCurrentMode();
    }
    
}
