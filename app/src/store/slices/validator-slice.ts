import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  createListenerMiddleware,
  isAnyOf,
} from '@reduxjs/toolkit';
import { ApiData } from 'src/api/types';
import { DEFAULT_PAGESIZE } from 'src/constants';

import { middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';
import { TableOptions } from '../types';

export interface ValidatorState {
  status: Loading;
  validators: ApiData.ValidatorsInfo[];
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
    order: 'desc',
  },
};

const initialState: ValidatorState = {
  status: Loading.Idle,
  validators: [],
  currentEraValidatorStatus: null,
  currentEraValidatorStatusLoadingStatus: Loading.Idle,
  tableOptions: defaultTableOptions,
};

export const listenerMiddleware = createListenerMiddleware();

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
  initialState: () => {
    // TODO: could probably put logic like this into a LS class method for reusability
    const rawValidatorTableOptions = localStorage.getItem(
      'validatorTableOptions',
    );

    if (rawValidatorTableOptions === null) {
      return initialState;
    }

    const validatorTableOptions = JSON.parse(
      rawValidatorTableOptions,
    ) as TableOptions;

    console.log('fetching from LS', validatorTableOptions);

    // TODO: how to make sure the type is exactly equal before returning?

    return {
      ...initialState,
      tableOptions: validatorTableOptions,
    };
  },
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
  resetValidatorTableOptions,
  resetToInitialValidatorState,
} = validatorSlice.actions;

// all
listenerMiddleware.startListening({
  matcher: isAnyOf(
    setValidatorTableOptions,
    updateValidatorPageNum,
    updateValidatorSorting,
  ),
  effect: async (_, listenerApi) => {
    // TODO: how to get access to RootState type without dep cycle error?
    const rootStateAll = listenerApi.getState() as any;

    const validatorTableOptions = rootStateAll.validator.tableOptions;
    console.log({ validatorTableOptions });

    localStorage.setItem(
      'validatorTableOptions',
      JSON.stringify(validatorTableOptions),
    );
  },
});
