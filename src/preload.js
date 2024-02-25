// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts
const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  resizeWindow: (width, height) =>
    ipcRenderer.invoke("resizeWindow", width, height),
  delete: (filepath) => ipcRenderer.invoke("delete", filepath),
  setFullscreen: (isFullscreen) =>
    ipcRenderer.invoke("setFullscreen", isFullscreen),
  readImagesFromFolder: (imagePath) =>
    ipcRenderer.invoke("readImagesFromFolder", imagePath),
  openMenu: (x, y) => ipcRenderer.invoke("openMenu", x, y),
});
