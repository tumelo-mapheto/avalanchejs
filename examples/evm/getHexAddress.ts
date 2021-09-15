import { BinTools, Buffer as AvalancheBuffer } from "../../src"
import {
  PrivateKeyPrefix,
  DefaultLocalGenesisPrivateKey
} from "../../src/utils"
import { Wallet } from "ethers"

const bintools: BinTools = BinTools.getInstance()

// you can derive an X address or an EVM address from the private key,
// however you cannot derive the EVM address from an X-chain address, or vice versa.
const main = async (): Promise<any> => {
  const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`
  // PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN

  const privKeyBuffer: AvalancheBuffer = bintools.cb58Decode(
    privKey.split("-")[1]
  )

  const wallet: Wallet = new Wallet(privKeyBuffer)
  console.log(wallet.address)
  // 0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC
}

main()
