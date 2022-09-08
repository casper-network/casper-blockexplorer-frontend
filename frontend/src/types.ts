export type Block = {
  height: number;
  eraID: number;
  transactions: number;
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

enum DeployStatus {
  Success,
  Failed
}

export type Deploy = {
  timestamp: number;
  deployHash: string;
  blockHash: string;
  publicKey: string;
  paymentAmount: string;
  cost: string;
  status: DeployStatus,
}
