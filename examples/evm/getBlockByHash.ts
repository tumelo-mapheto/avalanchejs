import { Avalanche } from "../../src"
import { EVMAPI } from "../../src/apis/evm"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const cchain: EVMAPI = avalanche.CChain()

const main = async (): Promise<any> => {
  const hash: string =
    "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a"
  const bool: boolean = true
  const block: string = await cchain.getBlockByHash(hash, bool)
  console.log(block)
}

main()
