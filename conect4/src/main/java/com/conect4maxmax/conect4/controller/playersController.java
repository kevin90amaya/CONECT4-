package com.conect4maxmax.conect4.controller;
import com.conect4maxmax.conect4.config.ApiEndpoints;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.conect4maxmax.conect4.service.PlayersService;
import org.springframework.beans.factory.annotation.Autowired;
import com.conect4maxmax.conect4.models.GameMode;
import com.conect4maxmax.conect4.models.PlayerProperties;
import java.util.List;

@RestController
@RequestMapping(ApiEndpoints.PLAYERS)
public class playersController {

    @Autowired
    private PlayersService playersService;
    
    @GetMapping(ApiEndpoints.GAME_MODES)
    public GameMode[] getGameModes() {
        return playersService.getGameModes();
    }

    @PostMapping(ApiEndpoints.MODE)
    public void setGameMode(@RequestBody GameMode mode) {
        playersService.setGameMode(mode);
    }

    @GetMapping(ApiEndpoints.LIST_PLAYERS)
    public List<PlayerProperties> getListPlayers() {
        return playersService.getPlayers();
    }
    

    @GetMapping(ApiEndpoints.CURRENT_PLAYER)
    public PlayerProperties getCurrentPlayer() {
        return playersService.getCurrentPlayer();
    }
    
    @GetMapping(ApiEndpoints.NUMBER_OF_PLAYERS)
    public int getNumberOfPlayers() {
        return playersService.getNumberOfPlayers();
    }
    
    @GetMapping(ApiEndpoints.CURRENT_MODE)
    public GameMode getCurrentMode() {
        return playersService.getCurrentMode();
    }
    

}
