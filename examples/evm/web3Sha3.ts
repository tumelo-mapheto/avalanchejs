import { Avalanche, BN } from "../../src"
import { EVMAPI } from "../../src/apis/evm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const cchain: EVMAPI = avalanche.CChain()

const main = async (): Promise<any> => {
  const data: string = "0x736e6f7773746f726d"
  const hash: string = await cchain.web3Sha3(data)
  console.log(hash)
}

main()
