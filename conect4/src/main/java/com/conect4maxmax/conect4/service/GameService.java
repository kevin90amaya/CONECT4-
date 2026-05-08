package com.conect4maxmax.conect4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conect4maxmax.conect4.models.Board;
import com.conect4maxmax.conect4.models.ComputerPlayer;
import com.conect4maxmax.conect4.models.PlayerProperties;
import com.conect4maxmax.conect4.models.Players;
import com.conect4maxmax.conect4.service.dto.GameResult;
import com.conect4maxmax.conect4.service.dto.ProposedColumn;

@Service
public class GameService {
    @Autowired
    private ComputerPlayer computerPlayer;
    @Autowired
    private Players players;
    @Autowired
    private Board board;

    public void reset() {
        board.reset();
        players.resetTurn();
    }

    public Board getBoard() {
        return board;
    }

    public Players getPlayers() {
        return players;
    }

    public ComputerPlayer getComputerPlayer() {
        return computerPlayer;
    }

    public GameResult play(ProposedColumn proposedColumn) {

        if (proposedColumn == null) {
            throw new IllegalArgumentException("proposedColumn cannot be null");
        }

        PlayerProperties activePayer = this.players.getCurrentPlayer();
        int column;
        GameResult result = new GameResult();

        switch (activePayer.getTipe()) {
            case HUMAN:
               column =  (int) proposedColumn.getValue();    
               break;
            case COMPUTER:
               column = this.computerPlayer.getColumn();
               break;
               default: throw new IllegalStateException("tipo invalid");
        }

        if(!this.board.isCompleteColumn(column)){
            this.board.asigColumn(column);
            this.board.dropColor(activePayer.getColor());
        }else{
            result.setStatus("COLUMN_IS_COMPLETE");
            return result;}

        if (board.isConectToWin()) {
            result.setStatus("WIN");
            return result;
        }
        if (board.isFullBoard()) {
            result.setStatus("DRAW");
            return result;
        }
        players.nextTurn();
        result.setStatus("NEXT_TURN");
        return result;

    }

 
}
