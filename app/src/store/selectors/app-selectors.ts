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

export const appFontUrl = (state: RootState) => {
  return state.app.appFontUrl;
};

export const appPrimaryFontName = (state: RootState) => {
  return state.app.appPrimaryFontName;
};

export const appSecondaryFontName = (state: RootState) => {
  return state.app.appSecondaryFontName;
};

export const getSocket = (state: RootState) => {
  return state.app.socket;
};
