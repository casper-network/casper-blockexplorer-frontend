import { RootState } from '../store';

export const getAccount = (state: RootState) => {
  return state.account.account;
};

export const getAccountLoadingStatus = (state: RootState) => {
  return state.account.status;
};
