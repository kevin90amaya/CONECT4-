package com.conect4maxmax.conect4.model;

public abstract class MenuModel {

    protected String title;
    protected OptionModel[] options;
    private static final int MAX = 100;
    protected int size;

    protected MenuModel(String title) {
        this.title = title;
        this.options = new OptionModel[MenuModel.MAX];
        this.size = 0;
    }

    protected void add(OptionModel option) {
        if (this.size >= MenuModel.MAX) {
            throw new IllegalStateException("Número máximo de opciones alcanzado");
        }
        this.options[this.size] = option;
        this.size++;
    }

    protected boolean hasOption(OptionModel option) {
        for (int i = 0; i < this.size; i++) {
            if (this.options[i] == option) {
                return true;
            }
        }
        return false;
    }

    protected void removeOptions() {
        this.size = 0;
    }

    public String getTitle() {
        return title;
    }

    public int getSize() {
        return size;
    }

    public OptionModel[] getOptions() {
        OptionModel[] current = new OptionModel[this.size];
        System.arraycopy(this.options, 0, current, 0, this.size);
        return current;
    }

    public OptionModel getOptionByIndex(int index) {
        if (index < 0 || index >= this.size) {
            throw new IllegalArgumentException("Índice de opción fuera de rango: " + index);
        }
        return this.options[index];
    }

    public void resetAndAddOptions() {
        this.removeOptions();
        this.addOptions();
    }

    protected abstract void addOptions();
}
