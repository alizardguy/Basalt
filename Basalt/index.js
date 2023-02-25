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
    var fileData = "";
    dialog.showOpenDialog(focusedWindow, {
      properties: ['openFile']
    }).then(result => {
      console.log("file path: " + result.filePaths)
      console.log("file contents loaded!")
      /* read file */
      fs.readFile(result.filePaths[0], 'utf-8', (err, data) => { //read file
        fileData = data.toString();

        console.log("sending file data: " + fileData);

        /* send file data to render */
        focusedWindow.webContents.send('file-data', result.filePaths[0], fileData);
      });
    }).catch(err => {
      console.log(err)
    })
});