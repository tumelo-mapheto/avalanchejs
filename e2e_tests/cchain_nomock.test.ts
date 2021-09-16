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
      "getMaxPriorityFeePerGas",
      () => cchain.getMaxPriorityFeePerGas(),
      (x) => x,
      Matcher.toBe,
      () => "0x2540be400"
    ]
  ]

  createTests(tests_spec)
})
