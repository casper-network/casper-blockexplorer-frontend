import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { GetStatus, middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';

export interface NetworkState {
  status: Loading;
  networkStatus: GetStatus | null;
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
        (state, { payload }: PayloadAction<GetStatus>) => {
          state.status = Loading.Complete;
          state.networkStatus = payload;
        },
      )
      .addCase(fetchNetworkStatus.rejected, state => {
        state.status = Loading.Failed;
      });
  },
});
