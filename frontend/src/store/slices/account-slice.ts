import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Account, middleware } from '../../api';
import { Loading } from '../loading.type';

export interface AccountState {
  status: Loading;
  account: Account | null;
}

const initialState: AccountState = {
  status: Loading.Idle,
  account: null,
};

export const fetchAccount = createAsyncThunk(
  'rpcClient/fetchAccount',
  async (hashOrPublicKey: string) => {
    try {
      const account = await middleware.getAccount(hashOrPublicKey);

      return account;
    } catch (error: any) {
      console.log('asdfsadfsdfsass', error);
      throw new Error('An error occurred while fetching account.', error);
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
      .addCase(fetchAccount.rejected, state => {
        state.status = Loading.Failed;
      });
  },
});
