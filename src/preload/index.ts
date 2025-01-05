import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM加载完成')
  window.addEventListener('keyup', (e) => {
    // @ts-ignore (define in dts)
    electronAPI.ipcRenderer.send('keyUp', {
      key: e.key,
      code: e.code
    })
  })
  window.addEventListener('keydown', (e) => {
    // @ts-ignore (define in dts)
    electronAPI.ipcRenderer.send('key' + 'Down', {
      key: e.key,
      code: e.code
    })
  })
})
