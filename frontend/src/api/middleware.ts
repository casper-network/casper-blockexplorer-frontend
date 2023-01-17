import axios, { AxiosInstance } from 'axios';
import { SortDirection } from '@tanstack/react-table';
import { loadConfig } from 'src/utils';

export enum DeployProcessed {
  Accepted = 'accepted',
  Processed = 'processed',
  Expired = 'expired',
}

export class Middleware {
  private api: AxiosInstance;

  constructor(public url: string) {
    this.api = axios.create({ baseURL: url });
  }

  public async getPeers() {
    const {
      data: { result },
    } = await this.api.get<GetPeers>('/peers');
    return result;
  }

  /**
   * Retrieve information about the last block added to the linear chain.
   */
  public async getTheLatestBlock() {
    const { data } = await this.api.get<Block>('/latest-block');

    return data;
  }

  /**
   * Retrieve information about a block given its block hash or height.
   * @param hashOrHeight block hash or height to get block
   */
  public async getBlock(hashOrHeight: string | number) {
    const { data } = await this.api.get<Block>(`/block/${hashOrHeight}`);

    return data;
  }

  public async getBlocks(
    from?: number,
    sort_by?: string,
    order_by?: SortDirection,
    count = 10,
  ) {
    const { data } = await this.api.get<GetBlocks>('/blocks', {
      params: { from, sort_by, order_by, count },
    });

    return data;
  }

  /**
   * Retrieve an aggregate of the various states a deploy goes through, given its deploy hash. The node does not emit this event, but the Sidecar computes it and returns it for the given deploy. This endpoint behaves differently than other endpoints, which return the raw event received from the node.
   * @param hash deploy hash to get deploy
   * @param type enum `DeployProcessed`
   */
  public async getDeploy(hash: string, type?: DeployProcessed) {
    const { data } = await this.api.get(
      `/deploy/${type ? `${type}/` : ''}${hash}`,
    );

    return data;
  }

  /**
   * Retrieve the faults associated with a validator's public key
   * @param publicKey public key to get faults
   */
  public async getFaultsByPublicKey(publicKey: string) {
    const { data } = await this.api.get(`/faults/${publicKey}`);

    return data;
  }

  /**
   * Retrieve the finality signatures in a block, given its block hash.
   * @param hash block hash to get signatures
   */
  public async getFinalitySignaturesByBlock(hash: string) {
    const { data } = await this.api.get(`/signatures/${hash}`);

    return data;
  }

  /**
   * Retrieve the step event emitted at the end of an era, given a valid era identifier.
   * @param eraId era id to get step
   */
  public async getStepByEra(eraId: number) {
    const { data } = await this.api.get(`/step/${eraId}`);

    return data;
  }
}

const { webServerUrl } = loadConfig();

export const middleware = new Middleware(webServerUrl);

export interface GetPeers {
  result: Peer[];
}

export interface Peer {
  address: string;
  uptime: string;
  isAlive: boolean;
}
export interface GetBlocks {
  blocks: Block[];
  total: number;
}

export interface Block {
  hash: string;
  header: Header;
  body: Body;
  proofs: any[];
}

export interface Body {
  proposer: string;
  deploy_hashes: string[];
  transfer_hashes: string[];
}

export interface Header {
  parent_hash: string;
  state_root_hash: string;
  body_hash: string;
  random_bit: boolean;
  accumulated_seed: string;
  era_end: null;
  timestamp: string;
  era_id: number;
  height: number;
  protocol_version: string;
}
