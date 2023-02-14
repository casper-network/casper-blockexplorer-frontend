import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Account, middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';

export interface AccountState {
  status: Loading;
  account: Account | null;
  errorMessage: string | null;
}

const initialState: AccountState = {
  status: Loading.Idle,
  account: null,
  errorMessage: null,
};

export const fetchAccount = createAsyncThunk<
  Account,
  string,
  { rejectValue: { error: string } }
>(
  'rpcClient/fetchAccount',
  async (hashOrPublicKey: string, { rejectWithValue }) => {
    try {
      const account = await middlewareServiceApi.account.getAccount(
        hashOrPublicKey,
      );

      return account;
    } catch (err: any) {
      const error: AxiosError = err;
      if (!error.response) {
        throw new Error('An error occurred while fetching account.');
      }

      return rejectWithValue({ error: error.message });
    }
  },
);

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchAccount.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchAccount.fulfilled,
        (state, { payload }: PayloadAction<Account>) => {
          state.status = Loading.Complete;
          state.account = payload;
        },
      )
      .addCase(fetchAccount.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || null;

        state.status = Loading.Failed;
      });
  },
});
