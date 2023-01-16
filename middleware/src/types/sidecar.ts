export interface GetBlock {
  block_hash: string;
  block: Block;
}

export interface Block {
  hash: string;
  header: Header;
  body: Body;
  proofs: any[];
}

export interface Body {
  proposer: string;
  deploy_hashes: any[];
  transfer_hashes: any[];
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
