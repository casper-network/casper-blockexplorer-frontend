export type Account = {
  trimmedAccountHash: string;
  rawAccountHash: string;
  publicKey: string;
  mainPurse: string;
}

export type Block = {
  height: number;
  eraID: number;
  deployCount: number;
  deployHashes?: string[];
  transferHashes?: string[];
  timestamp: number;
  hash: string;
  validatorPublicKey: string;
  parentHash: string;
  stateRootHash?: string;
  proofs?: any[];
};

export type Peer = {
  id: string;
  address: string;
};

export enum DeployStatus {
  Success,
  Failed,
}

export type Deploy = {
  timestamp: number;
  deployHash: string;
  blockHash: string;
  publicKey: string;
  status: DeployStatus;
};
