import { getAvalanche, createTests, Matcher } from "./e2etestlib"
import { KeystoreAPI } from "src/apis/keystore/api"
import BN from "bn.js"
import { BlockParameter } from "src/apis/evm/interfaces"

describe("CChain", (): void => {
  const avalanche = getAvalanche()
  const cchain = avalanche.CChain()

  const to: string = "0x197E90f9FAD81970bA7976f33CbD77088E5D7cf7"
  const tag: BlockParameter = "latest"
  const data: string = "0xc92aecc4"
  const hash: string =
    "0x14d9c2aeec20254d966a947e23eb3172ae5067e66fd4e69aecc3c9d6ff24443a"
  const rawTx: string =
    "0xf86f028534630b8a0082520894197e90f9fad81970ba7976f33cbd77088e5d7cf7880f43fc2c04ee000080830150f4a0b3b2c1d0348822a4bbfacba46d2525bd3949c8a89a2de015811d2a2a8f695003a07e9ee1c98bfe6e35cce932540c25f2552fb67f3a22c5fdd51b63d7e35363b9e2"
  const txHash: string =
    "0x58cbd8363e9bf3258779599f482f914e6646c8bee63b6f65c311d134f547f3f2"
  // test_name        response_promise                            resp_fn          matcher           expected_value/obtained_value
  const tests_spec: any = [
    [
      "getBaseFee",
      () => cchain.getBaseFee(),
      (x) => x,
      Matcher.toBe,
      () => "0x34630b8a00"
    ],
    [
      "getBlockNumber",
      () => cchain.getBlockNumber(),
      (x) => x,
      Matcher.toBe,
      () => "0x0"
    ],
    [
      "getEthCall",
      () => cchain.getEthCall({ to, data }, tag),
      (x) => x,
      Matcher.toBe,
      () => "0x"
    ],
    [
      "getEthChainID",
      () => cchain.getEthChainID(),
      (x) => x,
      Matcher.toBe,
      () => "0xa868"
    ],
    [
      "getAvaxBalance",
      () => cchain.getAvaxBalance(to, tag),
      (x) => x,
      Matcher.toBe,
      () => "0x0"
    ],
    [
      "getTransactionCount",
      () => cchain.getTransactionCount(to, tag),
      (x) => x,
      Matcher.toBe,
      () => "0x0"
    ],
    [
      "getBlockByHash",
      () => cchain.getBlockByHash(hash, true),
      (x) => x,
      Matcher.toBe,
      () => null
    ],
    [
      "sendRawTransaction",
      () => cchain.sendRawTransaction(rawTx),
      (x) => x,
      Matcher.toBe,
      () => txHash
    ],
    [
      "getMaxPriorityFeePerGas",
      () => cchain.getMaxPriorityFeePerGas(),
      (x) => x,
      Matcher.toBe,
      () => "0x2540be400"
    ]
  ]

  createTests(tests_spec)
})
