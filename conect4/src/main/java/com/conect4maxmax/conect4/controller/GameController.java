package com.conect4maxmax.conect4.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;

import com.conect4maxmax.conect4.service.dto.GameResult;
import com.conect4maxmax.conect4.service.dto.ProposedColumn;
import com.conect4maxmax.conect4.service.GameService;

@RestController
@RequestMapping("/api/game")
public class GameController {


    @Autowired
    private GameService gameService;

    @PostMapping("/resolve-turn")
    public GameResult resolveTurn(@RequestBody ProposedColumn proposedColumn) {
       return  gameService.play(proposedColumn);    
       
    }

    
}
