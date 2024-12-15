import { BrowserWindow, ipcMain, shell } from 'electron'
import { server } from '../index'

class Event {
  browser: BrowserWindow

  constructor(browser: BrowserWindow) {
    this.browser = browser
    this.readyToShow()
    this.setWindowOpenHandler()
    this.EnterHtmlFullScreen()
    this.LeaveHtmlFullScreen()
    this.KeyBored()
  }

  private KeyBored(): void {
    ipcMain.on('keyUp', (_e, data: { key: string; code: string }) => {
      server.sendHandler({
        ComeFrom: 'Node',
        Data: {
          key: data.key,
          code: data.code,
          type: 'keyUp'
        },
        Reach: 'Minecraft',
        Type: 'KeyBored'
      })
    })
    ipcMain.on('keyDown', (_e, data: { key: string; code: string }) => {
      server.sendHandler({
        ComeFrom: 'Node',
        Data: {
          key: data.key,
          code: data.code,
          type: 'keyDown'
        },
        Reach: 'Minecraft',
        Type: 'KeyBored'
      })
    })
  }

  private readyToShow(): void {
    this.browser.on('ready-to-show', () => {
      this.browser.show()
    })
  }

  private setWindowOpenHandler(): void {
    this.browser.webContents.setWindowOpenHandler((details) => {
      shell.openExternal(details.url)
      return { action: 'deny' }
    })
  }

  private EnterHtmlFullScreen(): void {
    this.browser.on('enter-html-full-screen', () => {
      server.sendHandler({
        ComeFrom: 'Node',
        Data: '',
        Reach: 'Minecraft',
        Type: 'EnterFullScreen'
      })
    })
  }

  private LeaveHtmlFullScreen(): void {
    this.browser.on('leave-html-full-screen', () => {
      server.sendHandler({
        ComeFrom: 'Node',
        Data: '',
        Reach: 'Minecraft',
        Type: 'LeaveFullScreen'
      })
    })
  }
}

export default Event
