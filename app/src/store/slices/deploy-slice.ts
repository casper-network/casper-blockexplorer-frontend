import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { formatDate, formatTimeAgo } from 'src/utils';
import { ApiData } from 'src/api/types';
import { DEFAULT_PAGESIZE } from 'src/constants';
import { Deploy, middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';
import { TableOptions } from '../types';
import type { RootState } from '../store';
import { DEPLOY_TABLE_OPTIONS } from '../constants';
import {
  determineInitialTableState,
  setTableOptionsUrlSearchParams,
} from '../utils';

export interface DeployState {
  status: Loading;
  deploy: Deploy | null;
  deploys: ApiData.ProcessedSidecarDeploy[];
  deploysLoadingStatus: Loading;
  errorMessage: string | null;
  totalDeploys: number;
  tableOptions: TableOptions;
}

const defaultTableOptions: TableOptions = {
  pagination: {
    pageSize: DEFAULT_PAGESIZE,
    pageNum: 1,
  },
  sorting: {
    sortBy: 'timestamp',
    order: 'desc',
  },
};

const initialState: DeployState = {
  status: Loading.Idle,
  deploy: null,
  deploys: [],
  deploysLoadingStatus: Loading.Idle,
  errorMessage: null,
  totalDeploys: 0,
  tableOptions: defaultTableOptions,
};

export const deployListener = createListenerMiddleware();

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

export const fetchDeploys = createAsyncThunk(
  'rpcClient/fetchDeploys',
  async ({
    pagination: { pageSize, pageNum },
    sorting: { sortBy, order },
  }: DeployState['tableOptions']) => {
    try {
      const deploys = await middlewareServiceApi.deploy.getDeploys({
        sortBy,
        orderBy: order,
        count: pageSize,
        pageNum,
      });

      return deploys;
    } catch (err: any) {
      throw new Error('An error occurred while fetching deploys.');
    }
  },
);

export const deploySlice = createSlice({
  name: 'deploy',
  initialState,
  reducers: {
    setDeploysTableOptions: (
      state,
      action: PayloadAction<DeployState['tableOptions']>,
    ) => {
      state.tableOptions = action.payload;
    },
    updateDeploysPageNum: (state, action: PayloadAction<number>) => {
      state.tableOptions.pagination.pageNum += action.payload;
    },
    updateDeploysSorting: (
      state,
      action: PayloadAction<DeployState['tableOptions']['sorting']>,
    ) => {
      state.tableOptions.sorting = action.payload;
    },
    setInitialDeployStateFromUrlSearchParams: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      const tableOptions = determineInitialTableState(
        DEPLOY_TABLE_OPTIONS,
        defaultTableOptions,
        action.payload,
      );

      state.tableOptions = tableOptions;
    },
    updateDeploysWithLatest: (
      state,
      action: PayloadAction<ApiData.ProcessedSidecarDeploy>,
    ) => {
      if (state.deploys.length) {
        const latestDeployTimestamp = action.payload.timestamp;
        const lastDepoyInListTimestamp = state.deploys[0].timestamp;

        const isLatestDeployAfterLastDeployInList =
          new Date(latestDeployTimestamp).getTime() >
          new Date(lastDepoyInListTimestamp).getTime();

        if (
          state.tableOptions.pagination.pageNum === 1 &&
          isLatestDeployAfterLastDeployInList
        ) {
          const poppedDeploys = [
            ...state.deploys.slice(0, state.deploys.length - 1),
          ];

          const updatedDeploys = [action.payload, ...poppedDeploys];

          state.deploys = updatedDeploys;
        }
      }
    },
  },
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
        state.deploysLoadingStatus = Loading.Pending;
      })
      .addCase(
        fetchDeploys.fulfilled,
        (
          state,
          {
            payload: { deploys, total },
          }: PayloadAction<{
            deploys: ApiData.ProcessedSidecarDeploy[];
            total: number;
          }>,
        ) => {
          state.deploysLoadingStatus = Loading.Complete;

          state.deploys = deploys;
          state.totalDeploys = total;
        },
      )
      .addCase(fetchDeploys.rejected, state => {
        state.deploysLoadingStatus = Loading.Failed;
      });
  },
});

export const {
  setDeploysTableOptions,
  updateDeploysPageNum,
  updateDeploysSorting,
  setInitialDeployStateFromUrlSearchParams,
  updateDeploysWithLatest,
} = deploySlice.actions;

deployListener.startListening({
  matcher: isAnyOf(
    setDeploysTableOptions,
    updateDeploysPageNum,
    updateDeploysSorting,
  ),
  effect: async (_, listenerApi) => {
    const rootStateAll = listenerApi.getState() as RootState;

    const deployTableOptions = rootStateAll.deploy.tableOptions;

    localStorage.setItem(
      DEPLOY_TABLE_OPTIONS,
      JSON.stringify(deployTableOptions),
    );

    setTableOptionsUrlSearchParams(deployTableOptions);
  },
});
