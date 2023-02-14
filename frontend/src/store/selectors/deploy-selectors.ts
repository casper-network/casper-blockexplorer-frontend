import { RootState } from '../store';

export const getDeploy = (state: RootState) => {
  return state.deploy.deploy;
};

export const getDeployLoadingStatus = (state: RootState) => {
  return state.deploy.status;
};

export const getDeployErrorMessage = (state: RootState) => {
  return state.deploy.errorMessage;
};
