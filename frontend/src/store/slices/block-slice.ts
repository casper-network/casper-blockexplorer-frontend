import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { formatTimeAgo } from '../../utils';
import { middleware, Block, DEFAULT_PAGINATION } from '../../api';
import { Loading } from '../loading.type';

export interface BlockState {
  status: Loading;
  blocks: Block[];
  latestBlock: Block | null;
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

      const blocks = await middleware.getBlocks(
        fromHeight,
        sortBy,
        order,
        numToShow,
      );

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
      const latestBlock = await middleware.getLatestBlock();

      return latestBlock;
    } catch (error: any) {
      throw new Error('An error occurred while fetching latest block.');
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
    setPagination: (
      state,
      action: PayloadAction<BlockState['tableOptions']>,
    ) => {
      console.log('payload', action.payload);
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
      });
  },
});

export const { refreshBlockTimes, setPagination } = blockSlice.actions;
