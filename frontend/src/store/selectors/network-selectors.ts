import { RootState } from '../store';

export const getNetworkStatus = (state: RootState) => {
  return state.networkStatus;
};
