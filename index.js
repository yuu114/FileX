const fs = require('fs');
const path = require('path');
const url = require('url');
const {
  app,
  BrowserWindow,
   Menu
} = require('electron');

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800
  });
  
  win.setMenu(null);

  win.webContents.openDevTools()

  win.loadURL('file://' + __dirname + '/html/index.html');
}

app.on('ready', createWindow);
