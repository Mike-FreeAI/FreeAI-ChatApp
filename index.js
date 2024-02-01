const { app, BrowserWindow } = require('electron');
const path = require('path');
let mainWindow;
function createWindow() {
    mainWindow = new BrowserWindow({
      width: 800,
      height: 600,
      minWidth:800,
      minHeight:600,
      webPreferences: {
        nodeIntegration: true,
        maximizable: true,
      },
      titleBarStyle: 'hidden',
      titleBarOverlay: {
        color: '#2f3241',
        symbolColor: '#74b1be'
      },
      title: 'FreeAI ChatApp',
      icon: path.join(__dirname, 'icon.png'),
    });
  
    mainWindow.loadFile('index.html');
  
    mainWindow.on('closed', function () {
      mainWindow = null;
    });
}
const isSingleInstance = app.requestSingleInstanceLock();
if (!isSingleInstance) {
  app.quit();
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore();
      mainWindow.focus();
    }
  });
  app.whenReady().then(() => {
    createWindow();
    app.on('window-all-closed', function () {
      if (process.platform !== 'darwin') app.quit();
    });
    app.on('activate', function () {
      if (mainWindow === null) createWindow();
    });
  });
}
