//consts and modules
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');
//const ipcMain = require('electron').ipcMain;

// create window
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        enableRemoteModule: true,
        preload: path.join(__dirname, 'backend/preload.js') //points to the path of the currently executing script
      },
      autoHideMenuBar: true,
      frame: false,
      
    })
  
    win.loadFile('app/index.html')
  }

  app.whenReady().then(() => {
    createWindow()
  
    app.on('activate', () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })

//app quit
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
  });

ipcMain.on('app/close', () => {
    app.quit();
  });

ipcMain.on('app/minimize', () => {
  var focusedWindow = BrowserWindow.getFocusedWindow();
  focusedWindow.minimize();
  });

/* open folder */
ipcMain.on('open-folder', () => {
    //set focused window
    var focusedWindow = BrowserWindow.getFocusedWindow();

    dialog.showOpenDialog(focusedWindow, {
      properties: ['openFile', 'openDirectory']
    }).then(result => {
      console.log(result.filePaths)
    }).catch(err => {
      console.log(err)
    })
  });

/* open file */
ipcMain.on('open-file', () => {
    //set focused window
    var focusedWindow = BrowserWindow.getFocusedWindow();

    dialog.showOpenDialog(focusedWindow, {
      properties: ['openFile']
    }).then(result => {
      console.log(result.filePaths)
    }).catch(err => {
      console.log(err)
    })
});