package com.conect4maxmax.conect4.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;


@Component
public class Players {

    private GameMode mode;
    private int turn;
    private int number_players;
    private List<PlayerProperties> players;

    public Players() {
        this.mode = GameMode.HUMAN_VS_COMPUTER; 
        this.turn = 0;
        this.number_players = 2;
        this.players = new ArrayList<>();
        this.players.add(new PlayerProperties("RED", Color.RED, PlayerTipe.HUMAN, 0));
        this.players.add(new PlayerProperties("YELLOW", Color.YELLOW, PlayerTipe.COMPUTER, 1));
    }

    public void setPlayers(List<PlayerProperties> listPlayers) {
        if (listPlayers.size() != this.number_players) {
            throw new IllegalArgumentException("El número de jugadores no puede ser diferente al número de jugadores configurados");
        }
        this.players.clear();
        this.players.addAll(listPlayers);
        this.mode = GameMode.CUSTOMIZER_PLAYERS;
    }

    public GameMode getCurrentMode() {
        return mode;
    }

    public void setNumberPlayers(int number_players) {
        final int minNumberPlayers = 2;
        final int maxNumberPlayers = 10;
        if (number_players < minNumberPlayers || number_players > maxNumberPlayers) {
            throw new IllegalArgumentException("El número de jugadores no puede ser menor a " + minNumberPlayers + " o mayor a " + maxNumberPlayers);
        }

        this.number_players = number_players;
    }

    public List<PlayerProperties> getPlayers() {
        return this.players;
    }

    public int getNumberPlayers() {
        return number_players;
    }

    public int getTurn() {
        return turn;
    }

    public void nextTurn() {
       this.turn++;
       if (this.turn >= this.number_players) {
           this.turn = 0;
       }
    }
    
    public PlayerProperties getCurrentPlayer() {
        for (PlayerProperties player : this.players) {
            if (player.getTurn() == this.turn) {
                return player;
            }
        }
        throw new IllegalStateException("no player found for turn " + this.turn);
    }
    
    public void changedMode() {
        switch (this.mode) {
            case COMPUTER_VS_COMPUTER:
                this.players.get(0).setTipe(PlayerTipe.COMPUTER);
                this.players.get(1).setTipe(PlayerTipe.COMPUTER);
                break;
            case HUMAN_VS_COMPUTER:
                this.players.get(0).setTipe(PlayerTipe.HUMAN);
                this.players.get(1).setTipe(PlayerTipe.COMPUTER);
                break;
            case HUMAN_VS_HUMAN:
                this.players.get(0).setTipe(PlayerTipe.HUMAN);
                this.players.get(1).setTipe(PlayerTipe.HUMAN);
                break;
            default:
                break;
        }
    }
    
    public void setMode(GameMode mode){
        this.mode = mode;
        this.changedMode();
    }

    public void resetTurn(){
        this.turn = 0;
    }
}