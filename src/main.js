const { log } = require("console");
const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  dialog,
  shell,
  webUtils,
  screen,
} = require("electron");
import MenuTemplate from "./public/main/MenuTemplate.mjs";
const sizeOf = require("image-size");
const path = require("path");
const fs = require("fs");
const FILETYPES = [
  ".apng",
  ".bmp",
  ".gif",
  ".jpeg",
  ".pjpeg",
  ".png",
  ".jpg",
  ".svg+xml",
  ".tiff",
  ".webp",
  ".x-icon",
];

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}

const handleDeleteFile = async (filepath) => {
  shell.trashItem(filepath);
};

const readImagesFromFolder = (imagePath) => {
  const folderPath = path.dirname(imagePath); // Get the folder path of the provided image
  // Read all files in the folder
  const files = fs.readdirSync(folderPath);
  // Filter image files (you can adjust the filter condition as needed)
  let imageFiles = files.filter((file) => {
    const ext = path.extname(file).toLowerCase();
    return FILETYPES.includes(ext);
  });

  imageFiles = imageFiles.map((fileName) => {
    const filePath = path.join(folderPath, fileName);
    const data = fs.readFileSync(filePath);
    const { ctime } = fs.statSync(filePath);
    const sizes = sizeOf(filePath);
    return [data, fileName, ctime, sizes, filePath];
  });
  return imageFiles;
};

const createWindow = () => {
  const displays = screen.getAllDisplays();
  const externalDisplay = displays.find((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0;
  });

  let mainWindow = null;

  if (externalDisplay) {
    mainWindow = new BrowserWindow({
      width: 1000,
      height: 800,
      x: externalDisplay.bounds.x + 50,
      y: externalDisplay.bounds.y + 50,
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: true,
        preload: path.join(__dirname, "preload.js"),
      },
      resizable: true,
      // transparent: true,
      autoHideMenuBar: true,
      // vibrancy: "fullscreen-ui", // on MacOS
      // backgroundMaterial: "mica", // on Windows 11
    });
  }
  mainWindow.center()
  const menu = Menu.buildFromTemplate(MenuTemplate)
  Menu.setApplicationMenu(menu);

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  ipcMain.handle("resizeWindow", (event, width, height) => {
    mainWindow.setSize(width, height);
    mainWindow.center();
  });

  ipcMain.handle("setFullscreen", (event, isFullscreen) =>
    mainWindow.setFullScreen(isFullscreen)
  );

  ipcMain.handle("readImagesFromFolder", (event, imagePath) =>
    readImagesFromFolder(imagePath)
  );

  ipcMain.handle("openMenu", (event, x, y) => {
    Menu.getApplicationMenu().popup();
  });

  ipcMain.handle("delete", (event, filepath) => {
    return dialog
      .showMessageBox({
        title: "Move to Recycle bin",
        buttons: ["yes", "no"],
        message: "Do you want to move this file to Recycle bin?",
      })
      .then((msgProps) => {
        const { response } = msgProps;
        if (response === 0) handleDeleteFile(filepath);
        else throw new Error("No delete");
      });
  });

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
