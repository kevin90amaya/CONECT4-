package com.conect4maxmax.conect4.service;

import com.conect4maxmax.conect4.models.Board;
import com.conect4maxmax.conect4.service.dto.ProposedValue;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ToggleButtonService {

    @Autowired
    private Board board;

    public void setColumn(ProposedValue column) {
        board.setNumberColumns(column.getValue());
        board.create();
    }

    public void setRow(ProposedValue row) {
        board.setNumberRows(row.getValue());
        board.create();
    }

    public void resetDefault() {
        board.resetDefault();
    }

}
