const os = require('os');
const { ipcRenderer } = require('electron');

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
    }
  }

contextBridge.exposeInMainWorld('API', API);