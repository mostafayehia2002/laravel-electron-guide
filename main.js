import { app, BrowserWindow } from 'electron';

function createWindow() {
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        autoHideMenuBar: true,
        //  icon: './icon.png'

    });

    win.loadURL('http://127.0.0.1:8000');
    win.maximize();
}

app.whenReady().then(createWindow);