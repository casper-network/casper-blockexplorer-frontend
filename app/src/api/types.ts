import { GetDeployResult, JsonDeploy } from 'casper-js-sdk';

export namespace ApiData {
  export interface Blocks {
    blocks: Block[];
    total: number;
  }

  export interface Block {
    hash: string;
    header: BlockHeader;
    body: BlockBody;
    proofs: any[];
  }

  export interface BlockHeader {
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

  export interface BlockBody {
    proposer: string;
    deploy_hashes: string[];
    transfer_hashes: string[];
  }

  export interface Status {
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

  export interface Peers {
    paginatedResult: Peer[];
    totalPeers: number;
  }

  export interface Peer {
    nodeId: string;
    address: string;
    uptime?: string;
    isAlive?: boolean;
    lastAddedBlockHash?: string;
  }

  export interface Account {
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

  export interface ValidatorsInfo {
    rank: number;
    publicKey: string;
    feePercentage: number;
    delegatorsCount: number;
    totalStakeMotes: number;
    selfPercentage: number;
    percentageOfNetwork: number;
  }

  export interface Validators {
    validators: {
      status: CurrentEraValidatorStatus;
      currentEraValidators: ValidatorsInfo[];
      nextEraValidators: ValidatorsInfo[];
    };
  }

  export interface Deploy extends JsonDeploy {
    execution_results: GetDeployResult['execution_results'];
  }

  export interface CurrentEraValidatorStatus {
    validatorsCount: number;
    bidsCount: number;
  }

  export interface ProcessedDeploy {
    timestamp: number;
    dateTime: Date;
    deployHash: string;
    blockHash: string;
    publicKey: string;
    action: string;
    deployType: string | undefined;
    amount: string | undefined;
    paymentAmount: string;
    cost: string;
    status: DeployStatus;
    rawDeploy: string;
  }

  export interface ProcessedSidecarDeploy {
    timestamp: string;
    deployHash: string;
    blockHash: string;
    publicKey: string;
    contractType?: string;
    amount: {
      motes: string;
      usd: string;
    };
    cost: {
      motes: string;
      usd: string;
    };
    csprToUsdConversion: number;
  }

  export interface SidecarDeploy {
    block_timestamp?: string;
    deploy_hash: string;
    deploy_accepted: {
      hash: string;
      header: {
        account: string;
        timestamp: string;
        ttl: string;
        gas_price: number;
        body_hash: string;
        dependencies: any[];
        chain_name: string;
      };
      payment: {
        ModuleBytes?: { args: any[]; module_bytes?: string };
        Transfer?: { args: any[] };
      };
      session: {
        ModuleBytes?: {
          args: any[];
          module_bytes?: string;
          entry_point?: string;
          hash?: string;
        };
        Transfer?: { args: any[] };
      };
      approvals: {
        signature: string;
        signer: string;
      }[];
    };
    deploy_processed: {
      deploy_hash: string;
      account: string;
      timestamp: string;
      ttl: string;
      dependencies: any[];
      block_hash: string;
      execution_result: { Failure?: object; Success?: object };
    } | null;
    deploy_expired: boolean;
  }
}

export type Account = {
  trimmedAccountHash: string;
  publicKey: string | undefined;
  mainPurse: string;
  rawAccount: string;
};

export type Block = {
  height: number;
  eraID: number;
  deployCount: number;
  deployHashes?: string[];
  transferHashes?: string[];
  timestamp: number;
  readableTimestamp: string;
  timeSince: string;
  hash: string;
  validatorPublicKey: string;
  parentHash: string;
  stateRootHash?: string;
  proofs?: any[];
  rawBlock: string;
};

export enum DeployStatus {
  Success = 'Success',
  Failed = 'Failed',
}

export type Deploy = {
  timestamp: number;
  timeSince: string;
  readableTimestamp: string;
  deployHash: string;
  blockHash: string;
  publicKey: string;
  status: DeployStatus;
  amount?: string;
  action: string;
  deployType?: string;
  paymentAmount: string;
  cost: string;
  rawDeploy: string;
};

export enum BlockSearchType {
  Hash,
  Height,
}

export type NetworkStatus = {
  api: string;
  build: string;
  networkName: string;
};
