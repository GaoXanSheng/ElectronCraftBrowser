import { join } from 'path'
import { BrowserWindow, screen } from 'electron'
import Event from './Event'
import { is } from '@electron-toolkit/utils'

class Browser {
  private browser = new BrowserWindow({
    width: 1,
    height: 1,
    x: 0,
    y: 0,
    title: 'ElectronCraftBrowser',
    opacity: 1,
    resizable: false,
    skipTaskbar: true,
    alwaysOnTop: true,
    transparent: true,
    focusable: true,
    modal: false,
    frame: false,
    // roundedCorners: false,
    thickFrame: false,
    hasShadow: false,
    fullscreenable: false,
    autoHideMenuBar: true,
    useContentSize: true,
    webPreferences: {
      backgroundThrottling: false,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false,
      autoplayPolicy: 'no-user-gesture-required'
    }
  })

  constructor() {
    this.loadFile()
    new Event(this.browser)
    // this.setIgnoreMouseEvents(true)
  }

  public loadFile(): void {
    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
      this.browser.loadURL(process.env['ELECTRON_RENDERER_URL']).then(() => {
        this.browser.webContents.openDevTools({
          mode: 'detach' // Optional, place developer tools in a separate window
        })
      })
    } else {
      this.browser.loadFile(join(__dirname, '../renderer/index.html')).then(() => {})
    }
  }

  public setSize(width: number, height: number): void {
    const primaryDisplay = screen.getPrimaryDisplay()
    const scaleFactor = primaryDisplay.scaleFactor
    this.browser.setContentBounds({
      height: height / scaleFactor,
      width: width / scaleFactor,
      x: 0,
      y: 0
    })
  }

  public setIgnoreMouseEvents(b: boolean): void {
    this.browser.setIgnoreMouseEvents(b, { forward: b })
  }

  public loadURL(url: string): void {
    this.browser.loadURL(url)
  }

  public GetBrowser(): BrowserWindow {
    return this.browser
  }
}

export default Browser
