import browser from '../../index'

/*eslint-disable */
const MinecraftHandler = {
  setBrowserSize(data: { width: number; height: number }) {
    const { width, height } = data;
    browser.setSize(width, height);
  },
  loadUrl(s: string) {
    browser.loadURL(s);
  },
  setFrameRate(s: string) {
    browser.setTransmissionSpeed(Number(s));
  },
  openDevTools(_data: never): void {
    browser.GetBrowser().webContents.openDevTools({
      mode: "detach"
    });
  }
};
export default MinecraftHandler;
