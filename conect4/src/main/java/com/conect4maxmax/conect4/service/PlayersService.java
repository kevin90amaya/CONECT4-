package com.conect4maxmax.conect4.service;

import org.springframework.stereotype.Service;
import com.conect4maxmax.conect4.models.GameMode;
import com.conect4maxmax.conect4.models.Players;
import org.springframework.beans.factory.annotation.Autowired;

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
    
}
