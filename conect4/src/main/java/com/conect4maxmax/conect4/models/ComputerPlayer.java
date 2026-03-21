package com.conect4maxmax.conect4.models;

import java.util.concurrent.ThreadLocalRandom;

public class ComputerPlayer extends Players{


public int getColumn() {
    return ThreadLocalRandom.current().nextInt(0, this.board.getNumberColumns());
}

    
}
