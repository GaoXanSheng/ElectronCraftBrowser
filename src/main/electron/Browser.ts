import { join } from 'path'
import { BrowserWindow } from 'electron'
import Event from './Event'
import { is } from '@electron-toolkit/utils'

class Browser {
  private browser = new BrowserWindow({
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    title: 'ElectronCraftBrowser',
    opacity: 1,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    transparent: true,
    frame: false,
    autoHideMenuBar: true,
    webPreferences: {
      backgroundThrottling: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      autoplayPolicy: 'no-user-gesture-required'
    }
  })

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
    new Event(this.browser)
  }

  public setSize(width: number, height: number): void {
    this.browser.setContentBounds({
      width,
      height,
      x: 0,
      y: 0
    })
  }

  public loadURL(url: string): void {
    this.browser.loadURL(url)
  }

  public GetBrowser(): BrowserWindow {
    return this.browser
  }
}

export default Browser
