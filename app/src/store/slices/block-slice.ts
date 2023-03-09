import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { ApiData } from 'src/api/types';
import { DEFAULT_PAGESIZE } from 'src/constants';
import { middlewareServiceApi } from '../../api';
import { formatTimeAgo } from '../../utils';
import { Loading } from '../loading.type';
import { TableOptions } from '../types';

export interface BlockState {
  status: Loading;
  blocks: ApiData.Block[];
  block: ApiData.Block | null;
  blockLoadingStatus: Loading;
  blockErrorMessage: string | null;
  latestBlock: ApiData.Block | null;
  latestBlockLoadingStatus: Loading;
  totalBlocks: number;
  tableOptions: TableOptions;
}

const defaultTableOptions: TableOptions = {
  pagination: {
    pageSize: DEFAULT_PAGESIZE,
    pageNum: 1,
  },
  sorting: {
    sortBy: 'height',
    order: 'desc',
  },
};

const initialState: BlockState = {
  status: Loading.Idle,
  blocks: [],
  block: null,
  blockLoadingStatus: Loading.Idle,
  blockErrorMessage: null,
  latestBlock: null,
  latestBlockLoadingStatus: Loading.Idle,
  totalBlocks: 0,
  tableOptions: defaultTableOptions,
};

export const fetchBlocks = createAsyncThunk(
  'rpcClient/fetchBlocks',
  async ({
    pagination: { pageSize, pageNum },
    sorting: { sortBy, order },
  }: BlockState['tableOptions']) => {
    try {
      const blocks = await middlewareServiceApi.block.getBlocks({
        sortBy,
        orderBy: order,
        count: pageSize,
        pageNum,
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
      if (err instanceof AxiosError) {
        return rejectWithValue({ error: err.message });
      }

      throw new Error('An error occurred while fetching block.');
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
    setBlocksTableOptions: (
      state,
      action: PayloadAction<BlockState['tableOptions']>,
    ) => {
      state.tableOptions = action.payload;
    },
    updateBlocksPageNum: (state, action: PayloadAction<number>) => {
      state.tableOptions.pagination.pageNum += action.payload;
    },
    updateBlocksSorting: (
      state,
      action: PayloadAction<BlockState['tableOptions']['sorting']>,
    ) => {
      state.tableOptions.sorting = action.payload;
    },
    restetBlocksTableOptions: state => {
      state.tableOptions = defaultTableOptions;
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

export const {
  refreshBlockTimes,
  setBlocksTableOptions,
  updateBlocksPageNum,
  updateBlocksSorting,
  restetBlocksTableOptions,
} = blockSlice.actions;
