import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ValidatorWeight } from 'casper-js-sdk';
import { ApiData } from 'src/api/types';
import { middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';

export interface ValidatorState {
  status: Loading;
  validators: ValidatorWeight[];
  currentEraValidatorStatus: ApiData.CurrentEraValidatorStatus | null;
}

const initialState: ValidatorState = {
  status: Loading.Idle,
  validators: [],
  currentEraValidatorStatus: null,
};

export const fetchValidators = createAsyncThunk(
  'rpcClient/fetchValidators',
  async () => {
    try {
      const validators = await middlewareServiceApi.validator.getValidators();

      return validators;
    } catch (error: any) {
      throw new Error('An error occurred while fetching validators.');
    }
  },
);

export const fetchCurrentEraValidatorStatus = createAsyncThunk(
  'rpcClient/fetchCurrentEraValidatorStatus',
  async () => {
    try {
      const currentEraValidatorStatus =
        await middlewareServiceApi.validator.getCurrentEraValidatorStatus();

      return currentEraValidatorStatus;
    } catch (error: any) {
      throw new Error('An error occurred while fetching validator status.');
    }
  },
);

export const validatorSlice = createSlice({
  name: 'validator',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchValidators.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchValidators.fulfilled,
        (state, { payload }: PayloadAction<ValidatorWeight[]>) => {
          state.status = Loading.Complete;
          state.validators = payload;
        },
      )
      .addCase(fetchValidators.rejected, state => {
        state.status = Loading.Failed;
      })
      .addCase(fetchCurrentEraValidatorStatus.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchCurrentEraValidatorStatus.fulfilled,
        (
          state,
          { payload }: PayloadAction<ApiData.CurrentEraValidatorStatus>,
        ) => {
          state.status = Loading.Complete;
          state.currentEraValidatorStatus = payload;
        },
      )
      .addCase(fetchCurrentEraValidatorStatus.rejected, state => {
        state.status = Loading.Failed;
      });
  },
});
