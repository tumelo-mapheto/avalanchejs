import { getAvalanche, createTests, Matcher } from "./e2etestlib"
import { IndexAPI } from "../src/apis/index/api"
import { KeystoreAPI } from "../src/apis/keystore/api"
import { Avalanche } from "../src"
import { AVMAPI } from "../src/apis/avm/api"

describe("Index", () => {
  let tx = { value: "" }
  let addrB = { value: "" }

  const avalanche: Avalanche = getAvalanche()
  const xchain: AVMAPI = avalanche.XChain()
  const keystore = new KeystoreAPI(avalanche)
  const Index: IndexAPI = avalanche.Index()

  const user: string = "avalancheJsPChainUser"
  const passwd: string = "avalancheJsPAssw4rd"
  const whaleAddr: string = "X-local18jma8ppw3nhx5r4ap8clazz0dps7rv5u00z96u"
  const key: string =
    "PrivateKey-ewoqjP7PxY4yr3iLTpLisriqt94hdyDFNgchSxGGztUrTXtNN"

  const encoding: string = "hex"
  const baseurl: string = "/ext/index/X/tx"
  const cContainerID: string =
    "2ceDnmxh59AsXqTG95vf3dr2a7ohXprNn9mvWgQJ39uHryBecT"

  const containerID: string =
    "2ceDnmxh59AsXqTG95vf3dr2a7ohXprNn9mvWgQJ39uHryBecT"

  // test_name          response_promise               resp_fn                 matcher           expected_value/obtained_value
  const tests_spec: any = [
    // [
    //   "createUser",
    //   () => keystore.createUser(user, passwd),
    //   (x) => x,
    //   Matcher.toBe,
    //   () => true
    // ],
    // [
    //   "importKey",
    //   () => xchain.importKey(user, passwd, key),
    //   (x) => x,
    //   Matcher.toBe,
    //   () => whaleAddr
    // ],
    // [
    //   "createaddrB",
    //   () => xchain.createAddress(user, passwd),
    //   (x) => x,
    //   Matcher.Get,
    //   () => addrB
    // ],
    // [
    //   "send",
    //   () =>
    //     xchain.send(
    //       user,
    //       passwd,
    //       "AVAX",
    //       10,
    //       addrB.value,
    //       [whaleAddr],
    //       whaleAddr,
    //       "MEMO"
    //     ),
    //   (x) => x.txID,
    //   Matcher.Get,
    //   () => tx
    // ],
    [
      "getXLastAccepted",
      async () => {
        await Index.getLastAccepted(encoding, baseurl)
      },
      (x) => x,
      Matcher.toThrow,
      () => "no containers have been accepted"
    ],

    [
      "getXContainerByIndex",
      async () => {
        await Index.getContainerByIndex("0", encoding, "/ext/index/X/tx")
      },
      (x) => x,
      Matcher.toThrow,
      () => "no container at index 0"
    ],
    [
      "getXContainerRange",
      async () => {
        await Index.getContainerRange(0, 100, "hex", "/ext/index/X/tx")
      },
      (x) => x,
      Matcher.toThrow,
      () => "no containers have been accepted"
    ],
    [
      "getXIndex",
      async () => {
        Index.getIndex(cContainerID, "hex", "ext/index/X/tx")
      },
      (x) => x,
      Matcher.toBe,
      () => undefined
    ],
    [
      "getXisAccepted",
      async () => {
        Index.isAccepted(cContainerID, "hex", "ext/index/X/tx")
      },
      (x) => x,
      Matcher.toBe,
      () => undefined
    ],
    [
      "getXVerticeLastAccepted",
      async () => {
        await Index.getLastAccepted(encoding, "/ext/index/X/vtx")
      },
      (x) => x,
      Matcher.toThrow,
      () => "no containers have been accepted"
    ],

    [
      "getXVerticeContainerByIndex",
      async () => {
        await Index.getContainerByIndex("0", encoding, "/ext/index/X/vtx")
      },
      (x) => x,
      Matcher.toThrow,
      () => "not found"
    ],
    [
      "getXVerticeContainerRange",
      async () => {
        await Index.getContainerRange(0, 100, "hex", "/ext/index/X/vtx")
      },
      (x) => x,
      Matcher.toThrow,
      () => "no containers have been accepted"
    ],
    [
      "getXVerticeIndex",
      async () => {
        Index.getIndex(cContainerID, "hex", "ext/index/X/vtx")
      },
      (x) => x,
      Matcher.toBe,
      () => undefined
    ],
    [
      "getXVerticeisAccepted",
      async () => {
        Index.isAccepted(cContainerID, "hex", "ext/index/X/vtx")
      },
      (x) => x,
      Matcher.toBe,
      () => undefined
    ]
  ]

  createTests(tests_spec)
})
