//consts and modules
const { app, BrowserWindow } = require('electron')
const path = require('path')

// create window
const createWindow = () => {
    const win = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        preload: path.join(__dirname, 'preload.js') //points to the path of the currently executing script
      }
    })
  
    win.loadFile('index.html')
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
  })