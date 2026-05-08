package com.conect4maxmax.conect4.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.conect4maxmax.conect4.models.Board;
import com.conect4maxmax.conect4.service.dto.ProposedValue;



@Service
public class SettingsMenuService {

    @Autowired
    private Board board;

    public void setConectToWin(ProposedValue conectToWin) {
        board.setNumberToWin(conectToWin.getValue());
        board.create();
    }

    public void setRows(ProposedValue rows) {
        board.setNumberRows(rows.getValue());
        board.create();
    }

    public void setColumns(ProposedValue columns) {
        board.setNumberColumns(columns.getValue());
        board.create();
    }
    
}
