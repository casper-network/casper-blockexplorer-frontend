/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { casperApi } from '../../api';
import { Peer } from '../../types';
import { Loading } from '../loading.type';

export interface PeerState {
  status: Loading;
  peers: Peer[];
}

const initialState: PeerState = {
  status: Loading.Idle,
  peers: [],
};

export const fetchPeers = createAsyncThunk('rpcClient/fetchPeers', async () => {
  try {
    const peers = await casperApi.getPeers();

    return peers;
  } catch (error: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
    return error.message;
  }
});

export const peerSlice = createSlice({
  name: 'peer',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPeers.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchPeers.fulfilled,
        (state, { payload }: PayloadAction<Peer[]>) => {
          state.status = Loading.Complete;
          state.peers = payload;
        },
      )
      .addCase(fetchPeers.rejected, state => {
        state.status = Loading.Failed;
      });
  },
});
