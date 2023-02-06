// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { ipcRenderer, contextBridge } from 'electron'
// import Store from 'electron-store'

// Initialization
// const store = new Store();
const sendMessage = (id, data) => ipcRenderer.send(id, data);
const onMessage = (id, callback) => ipcRenderer.on(id, callback);

const mapIpcOnMessageToCallback = (message, callback) =>
  onMessage(message, (ipcEvent, data) => callback(data));

declare global {
  interface Window {
      api: any;
  }
}


// Set up context bridge exposing it to the window.api.
contextBridge.exposeInMainWorld(
  'api',
  {
    ping: () => {
      sendMessage('ping', { message: 'ping' })
    },
    onPingSuccess: (callback: any) => {
      mapIpcOnMessageToCallback('ping-success', callback);
    },
  }
);