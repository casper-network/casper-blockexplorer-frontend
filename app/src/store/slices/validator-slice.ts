import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiData } from 'src/api/types';
import { loadConfig } from 'src/utils';
import { middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';
import { TableOptions } from '../types';

const { defaultPagination } = loadConfig();

export interface ValidatorState {
  status: Loading;
  validators: ApiData.ValidatorsInfo[];
  currentEraValidatorStatus: ApiData.CurrentEraValidatorStatus | null;
  currentEraValidatorStatusLoadingStatus: Loading;
  tableOptions: TableOptions;
}

const initialState: ValidatorState = {
  status: Loading.Idle,
  validators: [],
  currentEraValidatorStatus: null,
  currentEraValidatorStatusLoadingStatus: Loading.Idle,
  tableOptions: {
    pagination: {
      pageSize: defaultPagination,
      pageNum: 1,
    },
    sorting: {
      sortBy: '',
      order: 'desc',
    },
  },
};

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
  initialState,
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
  },
  extraReducers(builder) {
    builder
      .addCase(fetchValidators.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchValidators.fulfilled,
        (state, { payload }: PayloadAction<ApiData.ValidatorsInfo[]>) => {
          state.status = Loading.Complete;
          state.validators = payload;
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
} = validatorSlice.actions;
