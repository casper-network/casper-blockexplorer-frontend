import { RootState } from '../store';

export const getPeers = (state: RootState) => {
  return state.peer.peers;
};

export const getPeerLoadingStatus = (state: RootState) => {
  return state.peer.status;
};

export const getPeersTableOptions = (state: RootState) => {
  return state.peer.tableOptions;
};

export const getTotalPeers = (state: RootState) => {
  return state.peer.totalPeers ?? 0;
};
