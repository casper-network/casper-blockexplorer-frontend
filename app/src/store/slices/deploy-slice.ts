import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { formatDate, formatTimeAgo } from 'src/utils';
import { Deploy, middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';

export interface DeployState {
  status: Loading;
  deploy: Deploy | null;
  deploys: Deploy[];
  errorMessage: string | null;
}

const initialState: DeployState = {
  status: Loading.Idle,
  deploy: null,
  deploys: [],
  errorMessage: null,
};

export const fetchDeploy = createAsyncThunk<
  Deploy,
  string,
  { rejectValue: { error: string } }
>('rpcClient/fetchDeploy', async (hash: string, { rejectWithValue }) => {
  try {
    const deploy = await middlewareServiceApi.deploy.getDeploy(hash);

    const timeSince = formatTimeAgo(deploy.dateTime);
    const readableTimestamp = formatDate(deploy.dateTime);

    return { ...deploy, timeSince, readableTimestamp };
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return rejectWithValue({ error: err.message });
    }

    throw new Error('An error occurred while fetching deploy.');
  }
});

export const fetchDeploys = createAsyncThunk<
  Deploy[],
  undefined,
  { rejectValue: { error: string } }
>('rpcClient/fetchDeploys', async () => {
  try {
    const deploys = await middlewareServiceApi.deploy.getDeploys();

    return deploys;
  } catch (err: any) {
    if (err instanceof AxiosError) {
      return rejectWithValue({ error: err.message });
    }

    throw new Error('An error occurred while fetching deploys.');
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
      })
      .addCase(fetchDeploys.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchDeploys.fulfilled,
        (state, { payload }: PayloadAction<Deploy[]>) => {
          state.status = Loading.Complete;
          state.deploys = payload;
        },
      )
      .addCase(fetchDeploys.rejected, (state, { payload }) => {
        state.errorMessage = payload?.error || null;

        state.status = Loading.Failed;
      });
  },
});
function rejectWithValue(arg0: { error: string }): any {
  throw new Error('Function not implemented.');
}
