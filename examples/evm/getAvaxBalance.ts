import { Avalanche } from "../../src"
import { EVMAPI } from "../../src/apis/evm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const cchain: EVMAPI = avalanche.CChain()

const main = async (): Promise<any> => {
  const address: string = "0x8db97c7cece249c2b98bdc0226cc4c2a57bf52fc"
  const tag: any = "latest"
  const balance: string = await cchain.getAvaxBalance(address, tag)
  console.log(balance)
}

main()
