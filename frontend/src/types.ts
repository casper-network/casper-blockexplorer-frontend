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
