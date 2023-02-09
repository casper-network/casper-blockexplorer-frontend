import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { formatTimeAgo } from '../../utils';
import { middleware, DEFAULT_NUM_TO_SHOW, Block } from '../../api';
import { Loading } from '../loading.type';

export interface BlockState {
  status: Loading;
  blocks: Block[];
  isLoadingMoreBlocks: Loading;
  totalBlocks: number;
  pagination: {
    numToShow: number;
    orderByHeight: 'desc' | 'asc';
  };
}

const initialState: BlockState = {
  status: Loading.Idle,
  blocks: [],
  isLoadingMoreBlocks: Loading.Idle,
  totalBlocks: 0,
  pagination: {
    numToShow: DEFAULT_NUM_TO_SHOW,
    orderByHeight: 'desc',
  },
};

export const fetchBlocks = createAsyncThunk(
  'rpcClient/fetchBlocks',
  async (params: BlockState['pagination']) => {
    try {
      const amount = params?.numToShow ?? 10;
      const order = params?.orderByHeight ?? 'desc';

      const fromHeight = order === 'desc' ? undefined : 0;

      console.log({ fromHeight });

      const blocks = await middleware.getBlocks(
        fromHeight,
        'height',
        order,
        amount,
      );

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
      const {
        header: { height: currentBlockHeight },
      } = await middleware.getLatestBlock();
      const newBlocks: Block[] = [];

      let blockHeightStart = latestReduxStoredHeight + 1;

      while (blockHeightStart < currentBlockHeight) {
        const nextBlock = await middleware.getBlock(blockHeightStart);
        newBlocks.push(nextBlock);
        blockHeightStart++;
      }

      return newBlocks;
    } catch (error) {
      throw new Error('An error occurred while refreshing blocks');
    }
  },
);

// export const fetchMoreBlocks = createAsyncThunk(
//   'rpcClient/fetchMoreBlocks',
//   async (earliestLoadedBlockHeight: number) => {
//     try {
//       const newlyFetchedBlocks: Block[] = [];

//       let blockHeightStart = earliestLoadedBlockHeight - 1;
//       const targetHeight = blockHeightStart - DEFAULT_NUM_TO_SHOW;

//       while (blockHeightStart > targetHeight) {
//         if (blockHeightStart < 0) break;
//         const prevBlock = await middleware.getBlock(blockHeightStart);
//         newlyFetchedBlocks.push(prevBlock);
//         blockHeightStart--;
//       }

//       return newlyFetchedBlocks;
//     } catch (error) {
//       throw new Error('An error occurred while fetching more blocks');
//     }
//   },
// );

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
    setPagination: (state, action: PayloadAction<BlockState['pagination']>) => {
      state.pagination = action.payload;
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
                block.header.height,
                block,
              ]),
            ).values(),
          ].sort(
            (blockA, blockB) => blockB.header.height - blockA.header.height,
          );

          state.blocks = [
            ...nonDuplicateAddedBlocks,
            ...state.blocks.slice(payload.length),
          ];
          state.isLoadingMoreBlocks = Loading.Complete;
        },
      )
      .addCase(refreshBlocks.rejected, state => {
        state.isLoadingMoreBlocks = Loading.Failed;
      });
    // .addCase(fetchMoreBlocks.pending, state => {
    //   state.isLoadingMoreBlocks = Loading.Pending;
    // })
    // .addCase(
    //   fetchMoreBlocks.fulfilled,
    //   (state, { payload }: PayloadAction<Block[]>) => {
    //     state.blocks = [...state.blocks, ...payload];
    //     state.isLoadingMoreBlocks = Loading.Complete;
    //   },
    // );
  },
});

export const { refreshBlockTimes, setPagination } = blockSlice.actions;
