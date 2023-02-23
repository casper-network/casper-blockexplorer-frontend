import { RootState } from '../store';

export const getValidators = (state: RootState) => {
  return state.validator.validators;
};

export const getValidatorLoadingStatus = (state: RootState) => {
  return state.validator.status;
};

export const getCurrentEraValidatorStatus = (state: RootState) => {
  return state.validator.currentEraValidatorStatus;
};

export const getCurrentEraValidatorStatusStatus = (state: RootState) => {
  return state.validator.status;
};

export const getValidatorsTableOptions = (state: RootState) => {
  return state.validator.tableOptions;
};

export const getTotalEraValidators = (state: RootState) => {
  return state.validator.validators.length;
};
