import { join } from 'path'
import { BrowserWindow } from 'electron'
import Event from './Event'
import { is } from '@electron-toolkit/utils'
import IPCHandler from '../MinecraftIPC/createIPCServer'

class Browser {
  private browser = new BrowserWindow({
    width: 600,
    height: 400,
    x: 0,
    y: 0,
    title: 'ElectronCraftBrowser',
    resizable: true,
    alwaysOnTop: false,
    skipTaskbar: true,
    frame: true,
    show: true,
    transparent: true,
    autoHideMenuBar: true,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      autoplayPolicy: 'no-user-gesture-required'
    }
  })
  private Event = new Event(this.browser)
  private TransmissionSpeed: number = 60

  constructor() {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.browser.loadURL(process.env['ELECTRON_RENDERER_URL']).then(() => {
        this.browser.webContents.openDevTools({
          mode: 'detach' // Optional, place developer tools in a separate window
        })
      })
    } else {
      this.browser.loadFile(join(__dirname, '../renderer/index.html')).then(() => {})
    }
    import('../MinecraftIPC/createIPCServer')
    setInterval(async () => {
      const imageData = await (await this.browser.webContents.capturePage()).toPNG()
      IPCHandler({
        Reach: 'Minecraft',
        ComeFrom: 'Node',
        Type: 'Render',
        Data: Buffer.from(imageData).toString('base64')
      })
    }, 1000 / this.TransmissionSpeed)
  }

  public setTransmissionSpeed(speed: number): void {
    this.TransmissionSpeed = speed
  }

  public GetBrowser(): BrowserWindow {
    return this.browser
  }
}

export default Browser
