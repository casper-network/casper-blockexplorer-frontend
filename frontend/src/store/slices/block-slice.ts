/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { casperApi } from '../../api';
import { Block } from '../../types';

export enum BlockLoading {
  Idle = 'idle',
  Pending = 'pending',
  Complete = 'complete',
  Failed = 'failed',
}

export interface BlockState {
  status: BlockLoading;
  blocks: Block[];
}

const initialState: BlockState = {
  status: BlockLoading.Idle,
  blocks: [],
};

export const fetchBlocks = createAsyncThunk(
  'rpcClient/fetchBlocks',
  async () => {
    try {
      const blocks = await casperApi.getBlocks();

      return blocks;
    } catch (error: any) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
      return error.message;
    }
  },
);

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchBlocks.pending, state => {
        state.status = BlockLoading.Pending;
      })
      .addCase(
        fetchBlocks.fulfilled,
        (state, { payload }: PayloadAction<Block[]>) => {
          state.status = BlockLoading.Complete;
          state.blocks = payload;
        },
      )
      .addCase(fetchBlocks.rejected, state => {
        state.status = BlockLoading.Failed;
      });
  },
});
