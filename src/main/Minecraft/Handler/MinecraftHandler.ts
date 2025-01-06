import { browser, browserInit, server } from '../../index'

/*eslint-disable */
const MinecraftHandler = {
  setBrowserSize(data: { width: number; height: number }) {
    if (browser == null) return;
    const { width, height } = data;
    browser.setSize(width, height);
  },
  loadUrl(s: string) {
    if (browser == null) return;
    browser.loadURL(s);
  },
  loadFile() {
    if (browser == null) return;
    browser.loadFile();
    server.sendHandler({
      ComeFrom: "Node",
      Data: "",
      Reach: "Minecraft",
      Type: "LoadFile"
    });
  },
  openDevTools(_data: never): void {
    if (browser == null) return;
    browser.GetBrowser().webContents.openDevTools({
      mode: "detach"
    });
  },
  setIgnoreMouseEvents(b: string) {
    if (browser == null) return;
    browser.setIgnoreMouseEvents(b.toLowerCase() === "true");
  },
  BrowserInit(_data: never) {
    if (browserInit) {
      server.sendHandler({
        ComeFrom: "Node",
        Data: "",
        Reach: "Minecraft",
        Type: "BrowserInit"
      });
    }
  }
};
export default MinecraftHandler;
