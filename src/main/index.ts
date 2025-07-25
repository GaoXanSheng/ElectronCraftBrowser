import Server from './Minecraft/Server'
import { app } from 'electron'
import { optimizer } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Browser from './electron/Browser'

const server = new Server()
let browser: Browser | null = null
let browserInit = false

app.commandLine.appendSwitch('use-gl = desktop')

app.whenReady().then(() => {
  browser = new Browser()
  browser.GetBrowser().setIcon(icon)
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  browserInit = true
})
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
export { browser, server, browserInit }
