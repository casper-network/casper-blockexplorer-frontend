import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiData } from 'src/api/types';
import { middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';

export interface NetworkState {
  status: Loading;
  networkStatus: ApiData.Status | null;
}

const initialState: NetworkState = {
  status: Loading.Idle,
  networkStatus: null,
};

export const fetchNetworkStatus = createAsyncThunk(
  'rpcClient/fetchNetworkStatus',
  async () => {
    try {
      const status = await middlewareServiceApi.status.getStatus();

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
      .addCase(fetchNetworkStatus.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchNetworkStatus.fulfilled,
        (state, { payload }: PayloadAction<ApiData.Status>) => {
          state.status = Loading.Complete;
          state.networkStatus = payload;
        },
      )
      .addCase(fetchNetworkStatus.rejected, state => {
        state.status = Loading.Failed;
      });
  },
});
