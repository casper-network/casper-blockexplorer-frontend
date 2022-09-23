import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { formatTimeAgo } from 'src/utils';
import { casperApi, DEFAULT_NUM_TO_SHOW } from '../../api';
import { Block } from '../../types';
import { Loading } from '../loading.type';

export interface BlockState {
  status: Loading;
  blocks: Block[];
  isLoadingMoreBlocks: Loading;
}

const initialState: BlockState = {
  status: Loading.Idle,
  blocks: [],
  isLoadingMoreBlocks: Loading.Idle,
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

export const fetchMoreBlocks = createAsyncThunk(
  'rpcClient/fetchMoreBlocks',
  async (earliestLoadedBlockHeight: number) => {
    try {
      const newlyFetchedBlocks: Block[] = [];

      let blockHeightStart = earliestLoadedBlockHeight - 1;
      const targetHeight = blockHeightStart - DEFAULT_NUM_TO_SHOW;

      while (blockHeightStart > targetHeight) {
        if (blockHeightStart < 0) break;
        const prevBlock = await casperApi.getBlockByHeight(blockHeightStart);
        newlyFetchedBlocks.push(prevBlock);
        blockHeightStart--;
      }

      return newlyFetchedBlocks;
    } catch (error) {
      throw new Error('An error occurred while fetching more blocks');
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
      .addCase(refreshBlocks.pending, state => {
        state.isLoadingMoreBlocks = Loading.Pending;
      })
      .addCase(
        refreshBlocks.fulfilled,
        (state, { payload }: PayloadAction<Block[]>) => {
          const potentialOldBlocksToRemove = state.blocks.slice(
            0,
            payload.length,
          );

          // ensure the array has no duplicates incase refresh takes longer than the next refresh
          const nonDuplicateAddedBlocks = [
            ...new Map(
              [...payload, ...potentialOldBlocksToRemove].map(block => [
                block.height,
                block,
              ]),
            ).values(),
          ].sort((blockA, blockB) => blockB.height - blockA.height);

          state.blocks = [
            ...nonDuplicateAddedBlocks,
            ...state.blocks.slice(payload.length),
          ];
        },
      )
      .addCase(refreshBlocks.rejected, state => {
        state.isLoadingMoreBlocks = Loading.Failed;
      })
      .addCase(fetchMoreBlocks.pending, state => {
        state.isLoadingMoreBlocks = Loading.Pending;
      })
      .addCase(
        fetchMoreBlocks.fulfilled,
        (state, { payload }: PayloadAction<Block[]>) => {
          state.blocks = [...state.blocks, ...payload];
          state.isLoadingMoreBlocks = Loading.Complete;
        },
      );
  },
});

export const { refreshBlockTimes } = blockSlice.actions;
