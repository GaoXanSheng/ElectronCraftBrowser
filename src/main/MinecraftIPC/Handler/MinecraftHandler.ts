import browser from '../../index'

const MinecraftHandler = {
  /**
   * Set frame rate transmission speed
   */
  setFrameRate(s: number) {
    browser.setTransmissionSpeed(s)
  }
}
export default MinecraftHandler
