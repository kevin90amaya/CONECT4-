package com.conect4maxmax.conect4.controller;
import com.conect4maxmax.conect4.service.ToggleButtonService;
import com.conect4maxmax.conect4.service.dto.ProposedValue;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/ToggleButton")
public class ToggleButtonController {  

    @Autowired
    private ToggleButtonService toggleButtonService;

    @PostMapping("/column")
    public void setColumn(@RequestBody ProposedValue column) {
        toggleButtonService.setColumn(column);
    }

    @PostMapping("/row")
    public void setRow(@RequestBody ProposedValue row) {
        toggleButtonService.setRow(row);
    }
    
    @PostMapping("/reset")
    public void resetDefault() {
        toggleButtonService.resetDefault();
    }
    
}
