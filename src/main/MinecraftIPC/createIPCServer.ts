import logger from '../tools/logger'
import { createServer, Socket } from 'net'
import Handler, { iHandler } from './Handler'

const BrowserPort = Number(process.env.BrowserPort) || 9090
let Client: Socket | null = null
const server = createServer((socket) => {
  Client = socket
  Client.on('data', (res) => {
    // Convert Base64 string to 'utf8' string using Buffer
    const buffer = Buffer.from(res.toString(), 'base64')
    const decodedString = buffer.toString('utf8')
    Handler(JSON.parse(decodedString))
  })
  Client.on('error', () => {
    Client = null
    logger.info('TheClientHasBeenDisconnected')
  })
  Client.on('end', () => {
    Client = null
    logger.info('TheClientHasBeenDisconnected')
  })
})
server.listen(BrowserPort, () => {
  logger.info('TCP Server:' + BrowserPort)
})

function IPCHandler(iHandler: iHandler): boolean {
  if (Client === null) {
    return false
  } else {
    Client.write(`${JSON.stringify(iHandler)}\n`)
    return true
  }
}

export default IPCHandler
