"use strict";

const { app, BrowserWindow } = require("electron");

app.on(
    "ready",
    () => {
        new BrowserWindow({
            width: 800,
            height: 900,
            x: 0,
            y: 0,
            frame: false
        }).loadURL("http://127.0.0.1:8080");
        new BrowserWindow({
            width: 800,
            height: 900,
            x: 800,
            y: 0,
            frame: false
        }).loadURL("https://gb.hlorenzi.com/table");
    }
);

app.on(
    "window-all-closed",
    () => {
        app.quit();
    }
);
