import { Avalanche, BN } from "../../src"
import { EVMAPI } from "../../src/apis/evm"
import { TransactionParams } from "../../src/apis/evm/interfaces"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const cchain: EVMAPI = avalanche.CChain()

const main = async (): Promise<any> => {
  const params: TransactionParams = {
    to: "0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7",
    data: "0xc92aecc4"
  }
  const result: string = await cchain.ethCall(params, "latest")
  console.log(result)
}

main()
