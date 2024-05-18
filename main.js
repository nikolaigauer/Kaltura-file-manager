// Import the update-electron-app module
require('update-electron-app');

const { app, BrowserWindow } = require('electron')

// include the Node.js 'path' module at the top of your file
const path = require('path')


// modify your existing createWindow() function
const createWindow = () => {
        const win = new BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        })

        win.loadFile('index.html')
    }
    // ...



app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})