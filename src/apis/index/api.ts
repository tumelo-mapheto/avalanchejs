/**
 * @packageDocumentation
 * @module API-Index
 */
import AvalancheCore from "../../avalanche"
import { JRPCAPI } from "../../common/jrpcapi"
import { RequestResponseData } from "../../common/apibase"
import {
  GetLastAcceptedParams,
  GetLastAcceptedResponse,
  GetContainerByIndexParams,
  GetContainerByIndexResponse,
  GetContainerByIDParams,
  GetContainerByIDResponse,
  GetContainerRangeParams,
  GetContainerRangeResponse,
  GetIndexParams,
  GetIsAcceptedParams
} from "./interfaces"

/**
 * Class for interacting with a node's IndexAPI.
 *
 * @category RPCAPIs
 *
 * @remarks This extends the [[JRPCAPI]] class. This class should not be directly called. Instead, use the [[Avalanche.addAPI]] function to register this interface with Avalanche.
 */
export class IndexAPI extends JRPCAPI {
  /**
   * Get last accepted tx, vtx or block
   *
   * @param encoding
   * @param baseURL
   *
   * @returns Returns a Promise<GetLastAcceptedResponse>.
   */
  getLastAccepted = async (
    encoding: string = "cb58",
    baseURL: string = this.getBaseURL()
  ): Promise<GetLastAcceptedResponse> => {
    this.setBaseURL(baseURL)
    const params: GetLastAcceptedParams = {
      encoding
    }

    const response: RequestResponseData = await this.callMethod(
      "index.getLastAccepted",
      params
    )
    return response.data.result
  }

  /**
   * Get container by index
   *
   * @param index
   * @param encoding
   * @param baseURL
   *
   * @returns Returns a Promise<GetContainerByIndexResponse>.
   */
  getContainerByIndex = async (
    index: string = "0",
    encoding: string = "cb58",
    baseURL: string = this.getBaseURL()
  ): Promise<GetContainerByIndexResponse> => {
    this.setBaseURL(baseURL)
    const params: GetContainerByIndexParams = {
      index,
      encoding
    }

    const response: RequestResponseData = await this.callMethod(
      "index.getContainerByIndex",
      params
    )
    return response.data.result
  }

  /**
   * Get contrainer by ID
   *
   * @param containerID
   * @param encoding
   * @param baseURL
   *
   * @returns Returns a Promise<GetContainerByIDResponse>.
   */
  getContainerByID = async (
    containerID: string = "0",
    encoding: string = "cb58",
    baseURL: string = this.getBaseURL()
  ): Promise<GetContainerByIDResponse> => {
    this.setBaseURL(baseURL)
    const params: GetContainerByIDParams = {
      containerID,
      encoding
    }

    const response: RequestResponseData = await this.callMethod(
      "index.getContainerByID",
      params
    )
    return response.data.result
  }

  /**
   * Get container range
   *
   * @param startIndex
   * @param numToFetch
   * @param encoding
   * @param baseURL
   *
   * @returns Returns a Promise<GetContainerRangeResponse>.
   */
  getContainerRange = async (
    startIndex: number = 0,
    numToFetch: number = 100,
    encoding: string = "cb58",
    baseURL: string = this.getBaseURL()
  ): Promise<GetContainerRangeResponse[]> => {
    this.setBaseURL(baseURL)
    const params: GetContainerRangeParams = {
      startIndex,
      numToFetch,
      encoding
    }

    const response: RequestResponseData = await this.callMethod(
      "index.getContainerRange",
      params
    )
    return response.data.result
  }

  /**
   * Get index by containerID
   *
   * @param containerID
   * @param encoding
   * @param baseURL
   *
   * @returns Returns a Promise<GetIndexResponse>.
   */
  getIndex = async (
    containerID: string = "",
    encoding: string = "cb58",
    baseURL: string = this.getBaseURL()
  ): Promise<string> => {
    this.setBaseURL(baseURL)
    const params: GetIndexParams = {
      containerID,
      encoding
    }

    const response: RequestResponseData = await this.callMethod(
      "index.getIndex",
      params
    )
    return response.data.result
  }

  /**
   * Check if container is accepted
   *
   * @param containerID
   * @param encoding
   * @param baseURL
   *
   * @returns Returns a Promise<GetIsAcceptedResponse>.
   */
  isAccepted = async (
    containerID: string = "",
    encoding: string = "cb58",
    baseURL: string = this.getBaseURL()
  ): Promise<boolean> => {
    this.setBaseURL(baseURL)
    const params: GetIsAcceptedParams = {
      containerID,
      encoding
    }

    const response: RequestResponseData = await this.callMethod(
      "index.isAccepted",
      params
    )
    return response.data.result
  }

  /**
   * This class should not be instantiated directly. Instead use the [[Avalanche.addAPI]] method.
   *
   * @param core A reference to the Avalanche class
   * @param baseURL Defaults to the string "/ext/index/X/tx" as the path to rpc's baseURL
   */
  constructor(core: AvalancheCore, baseURL: string = "/ext/index/X/tx") {
    super(core, baseURL)
  }
}
