const { ipcRenderer, contextBridge } = require('electron');
//const os = require('os');

console.log("preload.js loaded"); //debug

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
      const element = document.getElementById(selector)
      if (element) element.innerText = text
    }
  
    for (const dependency of ['chrome', 'node', 'electron']) {
      replaceText(`${dependency}-version`, process.versions[dependency])
    }
  })

  /* communication between main and renderer process */
  const API = {
    window: {
      close: () => ipcRenderer.send('app/close'),
      minimize: () => ipcRenderer.send('app/minimize'),
      openFile: () => ipcRenderer.send('open-file'),
    }
  }

  let indexBridge = {
    filePath: (callback) => ipcRenderer.on("file-path", (callback))
  }

contextBridge.exposeInMainWorld('app', API);
contextBridge.exposeInMainWorld("indexBridge", indexBridge);