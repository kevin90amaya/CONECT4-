package com.conect4maxmax.conect4.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.conect4maxmax.conect4.service.SettingsMenuService;
import com.conect4maxmax.conect4.service.dto.ProposedValue;

@RestController
@RequestMapping("/api/setting-menu")
public class SettingsMenuController {


    @Autowired
    private SettingsMenuService settingsMenuService;

    @PostMapping("/conect-to-win")
    public void setConectToWin(@RequestBody ProposedValue conectToWin) {
        settingsMenuService.setConectToWin(conectToWin);
    }

    @PostMapping("/rows")
    public void setRows(@RequestBody ProposedValue rows) {
        settingsMenuService.setRows(rows);
    }
    
    @PostMapping("/columns")
    public void setColumns(@RequestBody ProposedValue columns) {
        settingsMenuService.setColumns(columns);
    }
    
    
    
}
