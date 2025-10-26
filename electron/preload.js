const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    sendAction: (action, payload) => ipcRenderer.send('action', action, payload),
    onLog: (callback) => ipcRenderer.on('log', (_event, message) => callback(message)),
});
