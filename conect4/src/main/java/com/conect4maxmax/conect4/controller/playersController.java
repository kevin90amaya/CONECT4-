package com.conect4maxmax.conect4.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import com.conect4maxmax.conect4.service.PlayersService;
import org.springframework.beans.factory.annotation.Autowired;
import com.conect4maxmax.conect4.models.GameMode;

@RestController
@RequestMapping("/api/players")
public class playersController {

    @Autowired
    private PlayersService playersService;
    
    @GetMapping("/modes")
    public GameMode[] getGameModes() {
        return playersService.getGameModes();
    }

    @PostMapping("/mode")
    public void setGameMode(@RequestBody GameMode mode) {
        playersService.setGameMode(mode);
    }
}
