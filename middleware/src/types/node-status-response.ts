export interface StatusResponse {
  api_version: string;
  chainspec_name: string;
  peers: Peer[];
}

export interface Peer {
  nodeId: string;
  address: string;
}
