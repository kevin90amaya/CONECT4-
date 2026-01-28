package com.conect4maxmax.conect4.model;

import java.util.HashMap;
import java.util.Map;

public class Messages {

    public Map<String, String> getMainMenu() {
        Map<String, String> menu = new HashMap<>();
        menu.put("title", "Menu principal");
        menu.put("addServices", "Añadir servicios");
        menu.put("cancelDateServices", "Cancelar fecha");
        menu.put("modifyServices", "Modificar servicios");
        menu.put("queryServices", "Consultar servicios");
        menu.put("exit", "Salir");
        return menu;
    }

    public Map<String, String> getCommon() {
        Map<String, String> common = new HashMap<>();
        common.put("invalidOption", "Opción inválida");
        common.put("option", "Selecciona una opción");
        common.put("price", "Precio");
        common.put("back", "Volver");
        common.put("costAnual", "Costo anual del contrato: ");
        common.put("day", "dame el dia");
        common.put("month", "dame el mes");
        common.put("year", "dame el año");
        common.put("list", "Lista de servicios disponibles");
        return common;
    }

    public Map<String, String> getAddServices() {
        Map<String, String> addServices = new HashMap<>();
        Map<String, String> menu = getMainMenu();
        addServices.put("title", menu.get("addServices"));
        addServices.put("name", "dame el nombre del servicio");
        addServices.put("exito", "se ha añadido el servicio");
        return addServices;
    }

    public Map<String, String> getCancelDateServices() {
        Map<String, String> cancelDateServices = new HashMap<>();
        Map<String, String> menu = getMainMenu();
        cancelDateServices.put("title", menu.get("cancelDateServices"));
        cancelDateServices.put("select", "Selecciona el servicio a cancelar");
        cancelDateServices.put("exito", "se ha cancelado el servicio");
        return cancelDateServices;
    }

    public Map<String, String> getModifyServices() {
        Map<String, String> modifyServices = new HashMap<>();
        Map<String, String> menu = getMainMenu();
        modifyServices.put("title", menu.get("modifyServices"));
        modifyServices.put("select", "Selecciona el servicio a modificar");
        modifyServices.put("question", "Selecciona la operación a realizar");
        modifyServices.put("enlarge", "1. aumentar el rango");
        modifyServices.put("shift", "2. desplazar el rango");
        modifyServices.put("range", "dame el rango");
        modifyServices.put("exito", "se ha modificado el servicio");
        return modifyServices;
    }

    public Map<String, String> getQueryServices() {
        Map<String, String> queryServices = new HashMap<>();
        Map<String, String> menu = getMainMenu();
        queryServices.put("title", menu.get("queryServices"));
        queryServices.put("select", "Selecciona el servicio a consultar");
        queryServices.put("exito", "se ha consultado el servicio");
        return queryServices;
    }

    public Map<String, String> getDeleteServices() {
        Map<String, String> deleteServices = new HashMap<>();
        Map<String, String> menu = getMainMenu();
        deleteServices.put("title", menu.get("deleteServices"));
        deleteServices.put("select", "Selecciona el servicio a eliminar: ");
        deleteServices.put("exito", "se ha eliminado el servicio: ");
        return deleteServices;
    }
}
