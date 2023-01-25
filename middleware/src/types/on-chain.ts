import { ExecutionResult, JsonHeader as DeployAccepted } from "casper-js-sdk";
export { JsonHeader as DeployAccepted } from "casper-js-sdk";
export interface GetBlock {
  block_hash: string;
  block: Block;
}

export interface Block {
  hash: string;
  header: Header;
  body: Body;
  proofs: Proof[];
}

export interface Proof {
  public_key: string;
  signature: string;
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
  timestamp: Date;
  era_id: number;
  height: number;
  protocol_version: string;
}

export interface GetDeploy {
  deploy_hash: string;
  deploy_accepted: DeployAccepted;
  deploy_processed: DeployProcessed | null;
  deploy_expired: boolean;
}

export interface DeployProcessed {
  deploy_hash: string;
  account: string;
  timestamp: Date;
  ttl: string;
  dependencies: unknown[];
  block_hash: string;
  execution_result: ExecutionResult;
}
