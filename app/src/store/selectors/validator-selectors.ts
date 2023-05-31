import { RootState } from '../store';

export const getCurrentEraValidators = (state: RootState) => {
  return state.validator.currentEraValidators;
};

export const getNextEraValidators = (state: RootState) => {
  return state.validator.nextEraValidators;
};

export const getValidatorLoadingStatus = (state: RootState) => {
  return state.validator.status;
};

export const getCurrentEraValidatorStatus = (state: RootState) => {
  return state.validator.currentEraValidatorStatus;
};

export const getCurrentEraValidatorStatusStatus = (state: RootState) => {
  return state.validator.currentEraValidatorStatusLoadingStatus;
};

export const getValidatorsTableOptions = (state: RootState) => {
  return state.validator.tableOptions;
};

export const getTotalEraValidators = (state: RootState) => {
  return state.validator.currentEraValidatorStatus?.validatorsCount ?? 0;
};
