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

/* open file */
ipcMain.on('open-file', () => {
    //set focused window
    var focusedWindow = BrowserWindow.getFocusedWindow();

    //opens file dialog
    console.log("open file");
    const files = dialog.showOpenDialog(focusedWindow, {
      properties: ['openFile'],
      filters: [
        {name: 'Text Files', extensions: ['txt', 'text', 'md', 'markdown']},
      ]
    });

    console.log("opened file prompt");
    //if no file is selected
    if (!files) return;

    //get the first file
    const file = files[0];

    //read the file
    const fileContent = fs.readFileSync(file).toString();
    console.log(fileContent);
  });