import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  isAnyOf,
  createListenerMiddleware,
} from '@reduxjs/toolkit';
import { ApiData, TableOrder } from 'src/api/types';
import { DEFAULT_PAGESIZE } from 'src/constants';

import type { RootState } from '../store';
import { middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';
import { TableOptions } from '../types';
import {
  setInitialStateWithLSTableOptions,
  determineInitialTableState,
  setTableOptionsUrlSearchParams,
} from '../utils';
import { VALIDATOR_TABLE_OPTIONS } from '../constants';

export interface ValidatorState {
  status: Loading;
  currentEraValidators: ApiData.ValidatorsInfo[];
  nextEraValidators: ApiData.ValidatorsInfo[];
  currentEraValidatorStatus: ApiData.CurrentEraValidatorStatus | null;
  currentEraValidatorStatusLoadingStatus: Loading;
  tableOptions: TableOptions;
}

const defaultTableOptions: TableOptions = {
  pagination: {
    pageSize: DEFAULT_PAGESIZE,
    pageNum: 1,
  },
  sorting: {
    sortBy: 'totalStakeMotes',
    order: TableOrder.Descending,
  },
};

const initialState: ValidatorState = {
  status: Loading.Idle,
  currentEraValidators: [],
  nextEraValidators: [],
  currentEraValidatorStatus: null,
  currentEraValidatorStatusLoadingStatus: Loading.Idle,
  tableOptions: defaultTableOptions,
};

export const validatorListener = createListenerMiddleware();

export const fetchValidators = createAsyncThunk(
  'rpcClient/fetchValidators',
  async ({
    pagination: { pageSize, pageNum },
    sorting: { sortBy, order },
  }: ValidatorState['tableOptions']) => {
    try {
      const validators = await middlewareServiceApi.validator.getValidators({
        sortBy,
        orderBy: order,
        count: pageSize,
        pageNum,
      });

      return validators;
    } catch (error: any) {
      throw new Error('An error occurred while fetching validators.');
    }
  },
);

export const fetchCurrentEraValidatorStatus = createAsyncThunk(
  'rpcClient/fetchCurrentEraValidatorStatus',
  async () => {
    try {
      const currentEraValidatorStatus =
        await middlewareServiceApi.validator.getCurrentEraValidatorStatus();

      return currentEraValidatorStatus;
    } catch (error: any) {
      throw new Error('An error occurred while fetching validator status.');
    }
  },
);

export const validatorSlice = createSlice({
  name: 'validator',
  initialState: setInitialStateWithLSTableOptions<ValidatorState>(
    VALIDATOR_TABLE_OPTIONS,
    initialState,
  ),
  reducers: {
    setValidatorTableOptions: (
      state,
      action: PayloadAction<ValidatorState['tableOptions']>,
    ) => {
      state.tableOptions = action.payload;
    },
    updateValidatorPageNum: (state, action: PayloadAction<number>) => {
      state.tableOptions.pagination.pageNum += action.payload;
    },
    updateValidatorSorting: (
      state,
      action: PayloadAction<ValidatorState['tableOptions']['sorting']>,
    ) => {
      state.tableOptions.sorting = action.payload;
    },
    resetValidatorTableOptions: state => {
      state.tableOptions = defaultTableOptions;
    },
    resetToInitialValidatorState: () => initialState,
    updateCurrentEraValidatorsStatus: (
      state,
      action: PayloadAction<ApiData.CurrentEraValidatorStatus>,
    ) => {
      state.currentEraValidatorStatus = action.payload;
    },
    setInitialValidatorStateFromUrlSearchParams: (
      state,
      action: PayloadAction<string[]>,
    ) => {
      const tableOptions = determineInitialTableState(
        VALIDATOR_TABLE_OPTIONS,
        defaultTableOptions,
        action.payload,
      );

      state.tableOptions = tableOptions;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchValidators.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchValidators.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<{
            currentEraValidators: ApiData.ValidatorsInfo[];
            nextEraValidators: ApiData.ValidatorsInfo[];
          }>,
        ) => {
          state.status = Loading.Complete;
          state.currentEraValidators = payload.currentEraValidators;
          state.nextEraValidators = payload.nextEraValidators;
        },
      )
      .addCase(fetchValidators.rejected, state => {
        state.status = Loading.Failed;
      })
      .addCase(fetchCurrentEraValidatorStatus.pending, state => {
        state.currentEraValidatorStatusLoadingStatus = Loading.Pending;
      })
      .addCase(
        fetchCurrentEraValidatorStatus.fulfilled,
        (
          state,
          { payload }: PayloadAction<ApiData.CurrentEraValidatorStatus>,
        ) => {
          state.currentEraValidatorStatusLoadingStatus = Loading.Complete;
          state.currentEraValidatorStatus = payload;
        },
      )
      .addCase(fetchCurrentEraValidatorStatus.rejected, state => {
        state.currentEraValidatorStatusLoadingStatus = Loading.Failed;
      });
  },
});

export const {
  setValidatorTableOptions,
  updateValidatorPageNum,
  updateValidatorSorting,
  resetValidatorTableOptions,
  resetToInitialValidatorState,
  updateCurrentEraValidatorsStatus,
  setInitialValidatorStateFromUrlSearchParams,
} = validatorSlice.actions;

validatorListener.startListening({
  matcher: isAnyOf(
    setValidatorTableOptions,
    updateValidatorPageNum,
    updateValidatorSorting,
  ),
  effect: async (_, listenerApi) => {
    const rootStateAll = listenerApi.getState() as RootState;

    const validatorTableOptions = rootStateAll.validator.tableOptions;

    localStorage.setItem(
      VALIDATOR_TABLE_OPTIONS,
      JSON.stringify(validatorTableOptions),
    );

    setTableOptionsUrlSearchParams(validatorTableOptions);
  },
});
