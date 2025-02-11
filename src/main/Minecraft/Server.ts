import logger from '../tools/logger'
import { createServer, Socket } from 'net'
import MinecraftHandler from './Handler/MinecraftHandler'

export interface iHandler {
  Reach: 'Minecraft' | 'Node'
  ComeFrom: 'Minecraft' | 'Node'
  Type: string
  Data: any
}

class Server {
  private BrowserPort = Number(process.env.BrowserPort) || 9090
  private Client: Socket | null = null

  constructor() {
    const server = createServer((socket) => {
      this.Client = socket
      this.Client.on('data', (res) => {
        try {
          const decoded = JSON.parse(res.toString())
          this.Handler(decoded)
        } catch (e) {
          console.log(e)
        }
      })
      this.Client.on('error', () => {
        this.Client = null
        logger.error('TheClientHasBeenDisconnected')
      })
      this.Client.on('end', () => {
        this.Client = null
        logger.info('TheClientHasBeenDisconnected')
      })
    })
    server.listen(this.BrowserPort, () => {
      logger.info('TCP Server:' + this.BrowserPort)
    })
  }

  public sendHandler(iHandler: iHandler): boolean {
    if (this.Client === null) {
      return false
    } else {
      this.Client.write(`${JSON.stringify(iHandler)}\n`)
      return true
    }
  }

  private Handler(iHandler: iHandler): void {
    logger.info(JSON.stringify(iHandler))
    if (iHandler.ComeFrom === 'Minecraft') {
      MinecraftHandler[iHandler.Type](iHandler.Data)
    } else {
      throw new Error('Handler not found')
    }
  }
}

export default Server
