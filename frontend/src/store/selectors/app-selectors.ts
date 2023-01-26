import { RootState } from '../store';

export const getBounds = (state: RootState) => {
  return state.app.bounds;
};

export const getRefreshTimer = (state: RootState) => {
  return state.app.refreshTimer;
};

export const getIsFirstVisit = (state: RootState) => {
  return state.app.isFirstVisit;
};
