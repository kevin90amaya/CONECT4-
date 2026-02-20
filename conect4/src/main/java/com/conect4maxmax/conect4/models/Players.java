package com.conect4maxmax.conect4.models;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Component;


@Component
public class Players {

    private int minNumberPlayers;
    private int maxNumberPlayers;
    private int number_players;
    private List<PlayerProperties> players;

    public Players() {
        this.minNumberPlayers = 2;
        this.maxNumberPlayers = 10;
        this.number_players = 2;
        this.players = new ArrayList<>();
        this.players.add(new PlayerProperties("RED", "R", 1, 0));
        this.players.add(new PlayerProperties("YELLOW", "Y", 2, 1));
    }

    public void setPlayers(List<PlayerProperties> listPlayers) {
        if (listPlayers.size() != this.number_players) {
            throw new IllegalArgumentException("El número de jugadores no puede ser diferente al número de jugadores configurados");
        }
        this.players.clear();
        this.players.addAll(listPlayers);
    }
    
    public Object getTipe(int tipe) {
        if (tipe < 1 || tipe > 2) {
            throw new IllegalArgumentException("El tipo no puede ser mayor a 2 o menor a 1");
        }
        switch (tipe) {
            case 1:
                return new HumanPlayer();
            case 2:
                return new ComputerPlayer();
            default:
                throw new IllegalArgumentException("Unsupported type: " + tipe);
        }
    }

    public void setNumberPlayers(int number_players) {
        if (number_players < this.minNumberPlayers || number_players > this.maxNumberPlayers) {
            throw new IllegalArgumentException("El número de jugadores no puede ser menor a " + this.minNumberPlayers + " o mayor a " + this.maxNumberPlayers);
        }

        this.number_players = number_players;
    }

    public List<PlayerProperties> getPlayers() {
        return this.players;
    }

    public int getNumberPlayers() {
        return number_players;
    }

}
