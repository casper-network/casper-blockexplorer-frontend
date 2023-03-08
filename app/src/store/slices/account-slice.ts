import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Account, middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';

export interface AccountState {
  status: Loading;
  account: Account | null;
  balance: string | null;
  errorMessage: string | null;
}

const initialState: AccountState = {
  status: Loading.Idle,
  account: null,
  balance: null,
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
      if (err instanceof AxiosError) {
        return rejectWithValue({ error: err.message });
      }

      throw new Error('An error occurred while fetching account.');
    }
  },
);

export const fetchBalance = createAsyncThunk<
  { balance: string },
  string,
  { rejectValue: { error: string } }
>('rpcClient/fetchBalance', async (uref: string, { rejectWithValue }) => {
  try {
    const balance = await middlewareServiceApi.account.getBalance(uref);

    return balance;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return rejectWithValue({ error: err.message });
    }

    throw new Error('An error occurred while fetching balance.');
  }
});

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
      })
      .addCase(fetchBalance.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchBalance.fulfilled,
        (state, { payload }: PayloadAction<{ balance: string }>) => {
          state.status = Loading.Complete;
          state.balance = payload.balance;
        },
      )
      .addCase(fetchBalance.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || null;

        state.status = Loading.Failed;
      });
  },
});
