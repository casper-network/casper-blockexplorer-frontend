import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiData } from 'src/api/types';
import { AxiosError } from 'axios';
import { formatTimeAgo } from '../../utils';
import { DEFAULT_PAGINATION, middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';

export interface BlockState {
  status: Loading;
  blocks: ApiData.Block[];
  block: ApiData.Block | null;
  blockLoadingStatus: Loading;
  blockErrorMessage: string | null;
  latestBlock: ApiData.Block | null;
  latestBlockLoadingStatus: Loading;
  totalBlocks: number;
  tableOptions: {
    pagination: {
      numToShow: number;
    };
    sorting: {
      sortBy: string;
      order: 'desc' | 'asc';
    };
  };
}

const initialState: BlockState = {
  status: Loading.Idle,
  blocks: [],
  block: null,
  blockLoadingStatus: Loading.Idle,
  blockErrorMessage: null,
  latestBlock: null,
  latestBlockLoadingStatus: Loading.Idle,
  totalBlocks: 0,
  tableOptions: {
    pagination: {
      numToShow: DEFAULT_PAGINATION,
    },
    sorting: {
      sortBy: 'height',
      order: 'desc',
    },
  },
};

export const fetchBlocks = createAsyncThunk(
  'rpcClient/fetchBlocks',
  async ({
    pagination: { numToShow },
    sorting: { sortBy, order },
  }: BlockState['tableOptions']) => {
    try {
      const fromHeight = order === 'desc' ? undefined : 0;

      const blocks = await middlewareServiceApi.block.getBlocks({
        from: fromHeight,
        sort_by: sortBy,
        order_by: order,
        count: numToShow,
      });

      return blocks;
    } catch (error: any) {
      throw new Error('An error occurred while fetching blocks.');
    }
  },
);

export const fetchLatestBlock = createAsyncThunk(
  'rpcClient/fetchLatestBlock',
  async () => {
    try {
      const latestBlock = await middlewareServiceApi.block.getLatestBlock();

      return latestBlock;
    } catch (error: any) {
      throw new Error('An error occurred while fetching latest block.');
    }
  },
);

export const fetchBlock = createAsyncThunk<
  ApiData.Block,
  string,
  { rejectValue: { error: string } }
>(
  'rpcClient/fetchBlock',
  async (blockHashOrHeight: string | number, { rejectWithValue }) => {
    try {
      const block = await middlewareServiceApi.block.getBlock(
        blockHashOrHeight,
      );

      return block;
    } catch (err: any) {
      const error: AxiosError = err;
      if (!error.response) {
        throw new Error('An error occurred while fetching block.');
      }

      return rejectWithValue({ error: error.message });
    }
  },
);

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    refreshBlockTimes: state => {
      state.blocks = state.blocks.map(block => {
        const {
          header: { timestamp },
        } = block;

        const timeSince = formatTimeAgo(new Date(timestamp));

        return { ...block, timeSince };
      });
    },
    setTableOptions: (
      state,
      action: PayloadAction<BlockState['tableOptions']>,
    ) => {
      state.tableOptions = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlocks.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchBlocks.fulfilled,
        (state, { payload: { blocks, total } }) => {
          state.status = Loading.Complete;
          state.blocks = blocks;
          state.totalBlocks = total;
          state.tableOptions.pagination.numToShow = blocks.length;
        },
      )
      .addCase(fetchBlocks.rejected, state => {
        state.status = Loading.Failed;
      })
      .addCase(fetchLatestBlock.pending, state => {
        state.latestBlockLoadingStatus = Loading.Pending;
      })
      .addCase(
        fetchLatestBlock.fulfilled,
        (state, { payload: latestBlock }) => {
          state.latestBlockLoadingStatus = Loading.Complete;
          state.latestBlock = latestBlock;
        },
      )
      .addCase(fetchLatestBlock.rejected, state => {
        state.latestBlockLoadingStatus = Loading.Failed;
      })
      .addCase(fetchBlock.pending, state => {
        state.blockLoadingStatus = Loading.Pending;
      })
      .addCase(fetchBlock.fulfilled, (state, { payload: block }) => {
        state.blockLoadingStatus = Loading.Complete;
        state.block = block;
      })
      .addCase(fetchBlock.rejected, (state, { payload }) => {
        state.blockErrorMessage = payload?.error || null;

        state.blockLoadingStatus = Loading.Failed;
      });
  },
});

export const { refreshBlockTimes, setTableOptions } = blockSlice.actions;
