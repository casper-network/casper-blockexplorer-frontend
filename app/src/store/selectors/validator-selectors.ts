import { RootState } from '../store';

export const getValidators = (state: RootState) => {
  return state.validator.validators;
};

export const getValidatorLoadingStatus = (state: RootState) => {
  return state.validator.status;
};
