import browser from '../../index'

const MinecraftHandler = {
  /**
   * Set frame rate transmission speed
   */
  setFrameRate(s: number) {
    browser.setTransmissionSpeed(s)
  },
  OpenDevTools(_data: never): void {
    browser.GetBrowser().webContents.openDevTools({
      mode: 'detach'
    })
  }
}
export default MinecraftHandler
