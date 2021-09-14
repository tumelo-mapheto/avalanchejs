import { Avalanche } from "../../src"
import { EVMAPI } from "../../src/apis/evm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const cchain: EVMAPI = avalanche.CChain()

const main = async (): Promise<any> => {
  const address: string = "0x9632a79656af553F58738B0FB750320158495942"
  const tag: any = "latest"
  const balance: string = await cchain.getAvaxBalance(address, tag)
  console.log(balance)
}

main()
