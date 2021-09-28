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

  const txBytes: string =
    "11111111JvKptXTaQ2uHBi6XcCA7ZzcsegZxXU9tcjx16oorLZYvar6DEstkNaKtqvTuLvCrAM8rySf5rKGqMXwb9kvaKSeruScX1kZXbR5kuUAKSDxi1sihZi4fSh6v7QPxAYgjrHp3BXxCQ9cCPUkdUi5xezJqpLFZyCJjF27xC6mWbHZTuyHtrTYCBYfSE59z6A4LvHPh77T2QJTieAFiiGxJto7PLwmJVKrK5DpEGAHvzz4ThPoS1P6eLhzHDsZBZnqu6jqJ6cf6QL9DJFB4sKQ3yZzAhu6jv7YPDBaVxQnJAGVKeopPCTVddFDp9TzMCprfGEws5dfFDjTrwTA5qdaovCdTma7ewENLeMRm8CqMaQuRfrC2yjXvPsQ61ZrTzibcypVVt8z8myhLvYwxxE6eszmscTLs3s3EaWUJK1VVi4qKz2PHhqzEKXgKe3PgQsf6mXn7HBAgCqWFs3Nk1LeDkxFgmkV2MaiB81V1Yad89wmo88kih9L9V5QnGrqx8cQK"
  const encoding: string = "cb58"
  const baseurl: string = "/ext/index/X/tx"
  const wait = (waitTime: number) => {
    return new Promise<void>((resolve) => {
      setTimeout(() => resolve(), waitTime)
    })
  }

  // test_name          response_promise               resp_fn                 matcher           expected_value/obtained_value
  const tests_spec: any = [
    [
      "createUser",
      () => keystore.createUser(user, passwd),
      (x) => x,
      Matcher.toBe,
      () => true
    ],
    [
      "importKey",
      () => xchain.importKey(user, passwd, key),
      (x) => x,
      Matcher.toBe,
      () => whaleAddr
    ],
    [
      "createaddrB",
      () => xchain.createAddress(user, passwd),
      (x) => x,
      Matcher.Get,
      () => addrB
    ],
    [
      "send",
      () =>
        xchain.send(
          user,
          passwd,
          "AVAX",
          10,
          addrB.value,
          [whaleAddr],
          whaleAddr,
          "MEMO"
        ),
      (x) => x.txID,
      Matcher.Get,
      () => tx
    ],
    [
      "getLastAccepted",
      async () => {
        await Index.getLastAccepted(encoding, baseurl)
      },
      (x) => {
        return x
      },
      Matcher.toBe,
      () => txBytes
    ]
  ]

  createTests(tests_spec)
})
