const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');

let mainWindow;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 900,
        height: 700,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    // Detecta si estamos en desarrollo o build
    const isDev = !!process.env.ELECTRON_START_URL;
    const startURL = isDev
        ? process.env.ELECTRON_START_URL
        : `file://${path.join(__dirname, '../frontend/dist/index.html')}`;

    mainWindow.loadURL(startURL);

    if (isDev) {
        mainWindow.webContents.openDevTools();
    }
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

//
// 🎬 IPC: Manejo de acciones desde el frontend
//
ipcMain.on('action', (event, action, payload) => {
    console.log('📥 Acción recibida desde el renderer:', action);

    switch (action) {
        case 'start-record':
            event.sender.send('log', '🎬 Recording started...');
            break;

        case 'stop-record':
            event.sender.send('log', '🛑 Recording stopped.');
            break;

        case 'execute-actions':
            if (Array.isArray(payload) && payload.length > 0) {
                event.sender.send('log', `🚀 Starting execution of ${payload.length} actions...`);

                // Simulación de ejecución paso a paso
                payload.forEach((a, i) => {
                    setTimeout(() => {
                        event.sender.send('log', `⚙️ Executing: ${a}`);
                        if (i === payload.length - 1) {
                            event.sender.send('log', '✅ All actions executed.');
                        }
                    }, i * 1000);
                });
            } else {
                event.sender.send('log', '⚠️ No actions to execute.');
            }
            break;

        default:
            event.sender.send('log', `❓ Unknown action: ${action}`);
    }
});
