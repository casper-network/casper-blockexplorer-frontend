import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { Deploy, middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';

export interface DeployState {
  status: Loading;
  deploy: Deploy | null;
  errorMessage: string | null;
}

const initialState: DeployState = {
  status: Loading.Idle,
  deploy: null,
  errorMessage: null,
};

export const fetchDeploy = createAsyncThunk<
  Deploy,
  string,
  { rejectValue: { error: string } }
>('rpcClient/fetchDeploy', async (hash: string, { rejectWithValue }) => {
  try {
    const deploy = await middlewareServiceApi.deploy.getDeploy(hash);

    return deploy;
  } catch (err: any) {
    const error: AxiosError = err;
    if (!error.response) {
      throw new Error('An error occurred while fetching deploy.');
    }

    return rejectWithValue({ error: error.message });
  }
});

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
      .addCase(fetchDeploy.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || null;

        state.status = Loading.Failed;
      });
  },
});
