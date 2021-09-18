import { Avalanche, BN } from "../../src"
import { AVMAPI, KeyChain as AVMKeyChain } from "../../src/apis/avm"
import {
  EVMAPI,
  KeyChain as EVMKeyChain,
  UnsignedTx,
  Tx
} from "../../src/apis/evm"
import {
  PrivateKeyPrefix,
  DefaultLocalGenesisPrivateKey,
  Defaults
} from "../../src/utils"
import { ethers, BigNumber } from "ethers"

const ip: string = "localhost"
const port: number = 9650
const protocol: string = "http"
const networkID: number = 12345
const avalanche: Avalanche = new Avalanche(ip, port, protocol, networkID)
const xchain: AVMAPI = avalanche.XChain()
const cchain: EVMAPI = avalanche.CChain()
const xKeychain: AVMKeyChain = xchain.keyChain()
const privKey: string = `${PrivateKeyPrefix}${DefaultLocalGenesisPrivateKey}`
const cKeychain: EVMKeyChain = cchain.keyChain()
xKeychain.importKey(privKey)
cKeychain.importKey(privKey)
const xAddressStrings: string[] = xchain.keyChain().getAddressStrings()
const cAddressStrings: string[] = cchain.keyChain().getAddressStrings()
const xChainBlockchainIdStr: string = Defaults.network[networkID].X.blockchainID
const avaxAssetID: string = Defaults.network[networkID].X.avaxAssetID
const cHexAddress: string = "0x8db97C7cEcE249c2b98bDC0226Cc4C2A57BF52FC"
const path: string = "/ext/bc/C/rpc"
const provider = new ethers.providers.JsonRpcProvider(
  `${protocol}://${ip}:${port}${path}`,
  {
    chainId: 43112,
    name: "avash"
  }
)
const threshold: number = 1

const main = async (): Promise<any> => {
  let balance: BigNumber | BN = await provider.getBalance(cHexAddress)
  const fee: BN = cchain.getDefaultTxFee()
  balance = new BN(balance.toString().substring(0, 17))
  const txcount = await provider.getTransactionCount(cHexAddress)
  const nonce: number = txcount
  const locktime: BN = new BN(0)
  const avaxAmount: BN = balance.sub(fee)

  const unsignedTx: UnsignedTx = await cchain.buildExportTx(
    avaxAmount,
    avaxAssetID,
    xChainBlockchainIdStr,
    cHexAddress,
    cAddressStrings[0],
    xAddressStrings,
    nonce,
    locktime,
    threshold
  )

  const tx: Tx = unsignedTx.sign(cKeychain)
  const txid: string = await cchain.issueTx(tx)
  console.log(`Success! TXID: ${txid}`)
}

main()
