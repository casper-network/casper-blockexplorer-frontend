import { RootState } from '../store';

export const getNetworkStatus = (state: RootState) => {
  return state.network.networkStatus;
};

export const getNetworkStatusLoadingStatus = (state: RootState) => {
  return state.network.status;
};
