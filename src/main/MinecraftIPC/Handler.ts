import MinecraftHandler from './Handler/MinecraftHandler'

export interface iHandler {
  Reach: 'Minecraft' | 'Node'
  ComeFrom: 'Minecraft' | 'Node'
  Type: string
  Data
}

export default function Handler(iHandler: iHandler): never {
  if (iHandler.ComeFrom === 'Minecraft') {
    return MinecraftHandler[iHandler.Type](iHandler.Data)
  } else {
    throw new Error('Handler not found')
  }
}
