package com.conect4maxmax.conect4.models;

import java.util.LinkedHashMap;
import java.util.Map;

public class Board {
    
    Object BOARD;
    int tokenQuantityOnBoard;
    
    public Board() {
        this.BOARD = new Object();
        this.tokenQuantityOnBoard = 0;
    }
public Map<String, Map<String, String>> getBoard() {
    return new LinkedHashMap<>();  // Devuelve mapa vacío temporalmente
}

public int getTokenQuantityOnBoard() {
    return 0;  // Sin tokens inicialmente
}

private boolean completeColumn(int proposedColumn) {
    return false;  // Por defecto no está completa
}

private int isOcupiedRow() {
    return -1;  // Valor indicando que no hay fila ocupada
}

public boolean checkEndGame() {
    return false;  // Por defecto el juego no ha terminado
}

public boolean isFullBoard() {
    return false;  // Por defecto el tablero no está lleno
}

public boolean isConectToWin() {
    return false;  // Por defecto no hay ganador
}
}

