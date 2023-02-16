import { RootState } from '../store';

export const getPeers = (state: RootState) => {
  return state.peer.peers;
};

export const getPeerLoadingStatus = (state: RootState) => {
  return state.peer.status;
};
