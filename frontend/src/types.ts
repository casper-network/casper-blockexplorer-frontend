export type Account = {
  trimmedAccountHash: string;
  rawAccountHash: string;
  publicKey: string;
  mainPurse: string;
};

export type Block = {
  height: number;
  eraID: number;
  deployCount: number;
  deployHashes?: string[];
  transferHashes?: string[];
  timestamp: number;
  timeSince: string;
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
  timeSince: string;
  deployHash: string;
  blockHash: string;
  publicKey: string;
  status: DeployStatus;
  paymentAmount: string;
  cost: string;
};
