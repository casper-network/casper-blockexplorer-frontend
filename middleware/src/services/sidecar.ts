import axios, { AxiosInstance } from "axios";
import NodeCache from "node-cache";

import { SidecarTypes } from "../types";

export enum DeployProcessed {
  Accepted = "accepted",
  Processed = "processed",
  Expired = "expired",
}

/**
 * The Casper Event Sidecar is an application that runs in tandem with the node process.
 * This reduces the load on the node process by allowing subscribers to monitor the event stream through the Sidecar while the node focuses entirely on the blockchain.
 * Users needing access to the JSON-RPC will still need to query the node directly.
 * While the primary use case for the Sidecar application is running alongside the node on the same machine, it can be run remotely if necessary.
 */
export class Sidecar {
  public cache: NodeCache;
  private api: AxiosInstance;
  BLOCK_GENERATE_INTERVAL = 30;

  constructor(public url: string) {
    this.cache = new NodeCache({ stdTTL: this.BLOCK_GENERATE_INTERVAL });
    this.api = axios.create({ baseURL: url });
  }

  /**
   * Retrieve information about the last block added to the linear chain.
   */
  public async getTheLatestBlock(): Promise<SidecarTypes.GetBlock> {
    const cacheKey = "latestBlock";
    const existLatestBlock = this.cache.get<SidecarTypes.GetBlock>(cacheKey);
    if (existLatestBlock) return existLatestBlock;

    const { data } = await this.api.get("/block");

    this.cache.set(cacheKey, data);

    return data;
  }

  /**
   * Retrieve information about a block given its block hash or height.
   * @param hashOrHeight block hash or height to get block
   */
  public async getBlock(
    hashOrHeight: string | number
  ): Promise<SidecarTypes.GetBlock> {
    const cacheKey = `block:${hashOrHeight}`;
    const existBlock = this.cache.get<SidecarTypes.GetBlock>(cacheKey);
    if (existBlock) return existBlock;

    const { data } = await this.api.get(`/block/${hashOrHeight}`);

    this.cache.set(cacheKey, data);

    return data;
  }

  /**
   * Retrieve an aggregate of the various states a deploy goes through, given its deploy hash. The node does not emit this event, but the Sidecar computes it and returns it for the given deploy. This endpoint behaves differently than other endpoints, which return the raw event received from the node.
   * @param hash deploy hash to get deploy
   * @param type enum `DeployProcessed`
   */
  public async getDeploy(hash: string, type?: DeployProcessed) {
    const cacheKey = `deploy:${hash}-${type}`;
    const existDeploy = this.cache.get(cacheKey);
    if (existDeploy) return existDeploy;

    const { data } = await this.api.get(
      `/deploy/${type ? type + "/" : ""}${hash}`
    );

    this.cache.set(cacheKey, data);

    return data;
  }

  /**
   * Retrieve the faults associated with a validator's public key
   * @param publicKey public key to get faults
   */
  public async getFaultsByPublicKey(publicKey: string) {
    const cacheKey = `faults:${publicKey}`;
    const existFaults = this.cache.get(cacheKey);
    if (existFaults) return existFaults;

    const { data } = await this.api.get(`/faults/${publicKey}`);

    this.cache.set(cacheKey, data);

    return data;
  }

  /**
   * Retrieve the finality signatures in a block, given its block hash.
   * @param hash block hash to get signatures
   */
  public async getFinalitySignaturesByBlock(hash: string) {
    const cacheKey = `signatures:${hash}`;
    const existSignatures = this.cache.get(cacheKey);
    if (existSignatures) return existSignatures;

    const { data } = await this.api.get(`/signatures/${hash}`);

    this.cache.set(cacheKey, data);

    return data;
  }

  /**
   * Retrieve the step event emitted at the end of an era, given a valid era identifier.
   * @param eraId era id to get step
   */
  public async getStepByEra(eraId: number) {
    const cacheKey = `step:${eraId}`;
    const existEra = this.cache.get(cacheKey);
    if (existEra) return existEra;

    const { data } = await this.api.get(`/step/${eraId}`);

    this.cache.set(cacheKey, data);

    return data;
  }
}
