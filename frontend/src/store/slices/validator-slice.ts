import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ValidatorWeight } from 'casper-js-sdk';
import { middleware } from '../../api';
import { Loading } from '../loading.type';

export interface ValidatorState {
  status: Loading;
  validators: ValidatorWeight[];
}

const initialState: ValidatorState = {
  status: Loading.Idle,
  validators: [],
};

export const fetchValidators = createAsyncThunk(
  'rpcClient/fetchValidators',
  async () => {
    try {
      const validators = await middleware.getValidators();

      return validators;
    } catch (error: any) {
      throw new Error('An error occurred while fetching validators.');
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
      });
  },
});
