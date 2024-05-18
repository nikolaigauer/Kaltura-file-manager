// Import the update-electron-app module
require('update-electron-app');

const { app, BrowserWindow } = require('electron')
const { exec } = require('child_process'); // Import exec from child_process


// include the Node.js 'path' module at the top of your file
const path = require('path')


// Include your shell script execution in the app.whenReady() block
app.whenReady().then(() => {
    // Define the path to your script and the app
    const scriptPath = path.join(__dirname, 'remove_xattr.sh');
    const appPath = path.join(__dirname, '..', '..'); // Adjust this if necessary

    // Execute the shell script
    exec(`bash "${scriptPath}" "${appPath}"`, (err, stdout, stderr) => {
        if (err) {
            console.error(`Error executing script: ${err}`);
            return;
        }
        console.log(`Output: ${stdout}`);
        if (stderr) {
            console.error(`Stderr: ${stderr}`);
        }

        // After executing the script, create the main window
        createWindow();
    });

    // Handle app activation
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

// modify your existing createWindow() function
const createWindow = () => {
        const win = new BrowserWindow({
            width: 1200,
            height: 800,
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