import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Deploy, middleware } from '../../api';
import { Loading } from '../loading.type';

export interface DeployState {
  status: Loading;
  deploy: Deploy | null;
}

const initialState: DeployState = {
  status: Loading.Idle,
  deploy: null,
};

export const fetchDeploy = createAsyncThunk(
  'rpcClient/fetchDeploy',
  async (hash: string) => {
    try {
      const deploy = await middleware.getDeploy(hash);

      return deploy;
    } catch (error: any) {
      throw new Error('An error occurred while fetching deploy.', error);
    }
  },
);

export const deploySlice = createSlice({
  name: 'deploy',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchDeploy.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchDeploy.fulfilled,
        (state, { payload }: PayloadAction<Deploy>) => {
          state.status = Loading.Complete;
          state.deploy = payload;
        },
      )
      .addCase(fetchDeploy.rejected, state => {
        state.status = Loading.Failed;
      });
  },
});
