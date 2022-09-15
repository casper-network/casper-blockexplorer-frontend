/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
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
      });
  },
});
