export interface StatusResponse {
  api_version: string;
  chainspec_name: string;
  peers: Peer[];
}
export interface Peer {
  address: string;
  isAlive: boolean;
  uptime: string;
}
