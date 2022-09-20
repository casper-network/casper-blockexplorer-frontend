import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { formatTimeAgo } from 'src/utils';
import { casperApi } from '../../api';
import { Block } from '../../types';
import { Loading } from '../loading.type';

export interface BlockState {
  status: Loading;
  blocks: Block[];
}

const initialState: BlockState = {
  status: Loading.Idle,
  blocks: [],
};

export const fetchBlocks = createAsyncThunk(
  'rpcClient/fetchBlocks',
  async () => {
    try {
      const blocks = await casperApi.getBlocks();

      return blocks;
    } catch (error: any) {
      throw new Error('An error occurred while fetching blocks.');
    }
  },
);

export const refreshBlocks = createAsyncThunk(
  'rpcClient/refreshBlocks',
  async (latestReduxStoredHeight: number) => {
    try {
      const currentBlockHeight = await casperApi.getCurrentBlockHeight();
      const newBlocks: Block[] = [];

      let blockHeightStart = latestReduxStoredHeight + 1;

      while (blockHeightStart < currentBlockHeight) {
        const nextBlock = await casperApi.getBlockByHeight(blockHeightStart);
        newBlocks.push(nextBlock);
        blockHeightStart++;
      }

      return newBlocks;
    } catch (error) {
      throw new Error('An error occurred while refreshing blocks');
    }
  },
);

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    refreshBlockTimes: state => {
      state.blocks = state.blocks.map(block => {
        const { timestamp } = block;

        const timeSince = formatTimeAgo(new Date(timestamp));

        return { ...block, timeSince };
      });
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchBlocks.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchBlocks.fulfilled,
        (state, { payload }: PayloadAction<Block[]>) => {
          state.status = Loading.Complete;
          state.blocks = payload;
        },
      )
      .addCase(fetchBlocks.rejected, state => {
        state.status = Loading.Failed;
      })
      .addCase(
        refreshBlocks.fulfilled,
        (state, { payload }: PayloadAction<Block[]>) => {
          state.blocks = [...payload, ...state.blocks];
        },
      );
  },
});

export const { refreshBlockTimes } = blockSlice.actions;
