export interface StatusResponse {
  api_version: string;
  chainspec_name: string;
  starting_state_root_hash: string;
  peers: Peer[];
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

export interface Peer {
  node_id: string;
  address: string;
}
