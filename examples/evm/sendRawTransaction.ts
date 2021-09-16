import { Avalanche, BinTools, Buffer as AvalancheBuffer } from "../../src"
import {
  PrivateKeyPrefix,
  DefaultLocalGenesisPrivateKey
} from "../../src/utils"
import { EVMAPI } from "../../src/apis/evm"

import { Wallet, utils, BigNumber } from "ethers"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const cchain: EVMAPI = avalanche.CChain()
const bintools: BinTools = BinTools.getInstance()

const main = async (): Promise<any> => {
  const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`
  // PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN
  const privKeyBuffer: AvalancheBuffer = bintools.cb58Decode(
    privKey.split("-")[1]
  )
  const wallet: Wallet = new Wallet(privKeyBuffer)

  let tx = {
    chainId: 43112,
    nonce: 1,
    to: "0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7",
    gasLimit: BigNumber.from(21000),
    gasPrice: BigNumber.from(225000000000),
    value: utils.parseEther("1.0")
  }
  const rawTx: string = await wallet.signTransaction(tx)
  console.log("rawTx", rawTx)
  const txHash: string = await cchain.sendRawTransaction(rawTx)
  console.log("txHash", txHash)
}

main()
