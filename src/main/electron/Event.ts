import { BrowserWindow, shell } from 'electron'
import { server } from '../index'

class Event {
  browser: BrowserWindow

  constructor(browser: BrowserWindow) {
    this.browser = browser
    this.readyToShow()
    this.setWindowOpenHandler()
    this.EnterHtmlFullScreen()
    this.LeaveHtmlFullScreen()
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
