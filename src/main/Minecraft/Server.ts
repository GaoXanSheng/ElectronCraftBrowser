import logger from '../tools/logger'
import { createServer, Socket } from 'net'
import MinecraftHandler from './Handler/MinecraftHandler'

export interface iHandler {
  Reach: 'Minecraft' | 'Node'
  ComeFrom: 'Minecraft' | 'Node'
  Type: string
  Data
}

class Server {
  private BrowserPort = Number(process.env.BrowserPort) || 9090
  private Client: Socket | null = null

  constructor() {
    const server = createServer((socket) => {
      this.Client = socket
      this.Client.on('data', (res) => {
        // Convert Base64 string to 'utf8' string using Buffer
        const buffer = Buffer.from(res.toString(), 'base64')
        const decodedString = buffer.toString('utf8')
        this.Handler(JSON.parse(decodedString))
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
    if (iHandler.ComeFrom === 'Minecraft') {
      MinecraftHandler[iHandler.Type](iHandler.Data)
    } else {
      throw new Error('Handler not found')
    }
  }
}

export default Server
