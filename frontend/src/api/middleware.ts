import axios, { AxiosInstance } from 'axios';
import { SortDirection } from '@tanstack/react-table';
import { CLValueParsers, GetDeployResult, JsonDeploy } from 'casper-js-sdk';
import { formatDate, formatTimeAgo, loadConfig } from 'src/utils';
import { Account, DeployStatus } from './types';
import { JsonDeploySession } from './missing-sdk-types';
import { determineDeploySessionData, isValidPublicKey } from './utils';

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

  public async getStatus() {
    const { data } = await this.api.get<GetStatus>('/status');
    return data;
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
  public async getLatestBlock() {
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
   */
  public async getDeploy(hash: string) {
    const {
      data: { execution_results: executionResults, ...deploy },
    } = await this.api.get<GetDeploy>(`/deploy/${hash}`);

    // @ts-ignore
    const paymentMap = new Map(deploy.payment.ModuleBytes?.args);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
    const paymentAmount = CLValueParsers.fromJSON(paymentMap.get('amount'))
      .unwrap()
      .value()
      .toString() as string;

    const { timestamp, account: publicKey } = deploy.header;

    const { block_hash: blockHash, result: executionResult } =
      executionResults[0];

    const status = executionResult.Success
      ? DeployStatus.Success
      : DeployStatus.Failed;

    const deploySession = deploy.session as JsonDeploySession;

    const { action, deployType, amount } = determineDeploySessionData(
      deploySession,
      status,
    );

    const cost = executionResult.Success
      ? executionResult.Success.cost
      : executionResult.Failure?.cost ?? 0;

    const dateTime = new Date(timestamp);

    const timeSince = formatTimeAgo(dateTime);
    const readableTimestamp = formatDate(dateTime);

    return {
      timestamp,
      timeSince,
      readableTimestamp,
      deployHash: deploy.hash,
      blockHash,
      publicKey,
      action,
      deployType,
      amount,
      paymentAmount,
      cost: cost.toString(),
      status,
      rawDeploy: JSON.stringify({
        deploy,
        execution_results: executionResults,
      }),
    };
  }

  public async getAccount(hashOrPublicKey: string): Promise<Account> {
    const { data: account } = await this.api.get<GetAccount>(
      `/account/${hashOrPublicKey}`,
    );

    return {
      trimmedAccountHash: account._accountHash.slice(13),
      publicKey: isValidPublicKey(hashOrPublicKey)
        ? hashOrPublicKey
        : undefined,
      mainPurse: account.mainPurse,
      rawAccount: JSON.stringify(account),
    };
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

export interface GetStatus {
  api_version: string;
  chainspec_name: string;
  starting_state_root_hash: string;
  last_added_block_info: LastAddedBlockInfo;
  our_public_signing_key: string;
  round_length: null;
  next_upgrade: null;
  build_version: string;
  uptime: string;
}

export interface LastAddedBlockInfo {
  hash: string;
  timestamp: Date;
  era_id: number;
  height: number;
  state_root_hash: string;
  creator: string;
}

export interface GetDeploy extends JsonDeploy {
  execution_results: GetDeployResult['execution_results'];
}

export interface GetAccount {
  _accountHash: string;
  namedKeys: any[];
  mainPurse: string;
  associatedKeys: AssociatedKey[];
  actionThresholds: ActionThresholds;
}

export interface ActionThresholds {
  deployment: number;
  keyManagement: number;
}

export interface AssociatedKey {
  accountHash: string;
  weight: number;
}
