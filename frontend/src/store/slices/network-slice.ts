import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { casperApi } from '../../api';
import { NetworkStatus } from '../../types';
import { Loading } from '../loading.type';

export interface NetworkState {
  status: Loading;
  network: NetworkStatus | null;
}

const initialState: NetworkState = {
  status: Loading.Idle,
  network: null,
};

export const fetchStatus = createAsyncThunk(
  'rpcClient/fetchStatus',
  async () => {
    try {
      const status = await casperApi.getStatus();

      return status;
    } catch (error: any) {
      throw new Error('An error occurred while fetching status.');
    }
  },
);

export const networkSlice = createSlice({
  name: 'networkStatus',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchStatus.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchStatus.fulfilled,
        (state, { payload }: PayloadAction<NetworkStatus>) => {
          state.status = Loading.Complete;
          state.network = payload;
        },
      )
      .addCase(fetchStatus.rejected, state => {
        state.status = Loading.Failed;
      });
  },
});
