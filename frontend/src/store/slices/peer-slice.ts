import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { middlewareServiceApi, Peer } from '../../api';
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
    const peers = await middlewareServiceApi.peer.getPeers();

    return peers;
  } catch (error: any) {
    throw new Error('An error occurred while fetching peers.');
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
