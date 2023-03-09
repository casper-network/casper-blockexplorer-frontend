import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { ApiData } from 'src/api/types';
import { DEFAULT_PAGESIZE } from 'src/constants';
import { middlewareServiceApi } from '../../api';
import { Loading } from '../loading.type';
import { TableOptions } from '../types';

export interface PeerState {
  status: Loading;
  peers: ApiData.Peer[];
  tableOptions: TableOptions;
  totalPeers: number;
}

const initialState: PeerState = {
  status: Loading.Idle,
  peers: [],
  totalPeers: 0,
  tableOptions: {
    pagination: {
      pageSize: DEFAULT_PAGESIZE,
      pageNum: 1,
    },
    sorting: {
      sortBy: '',
      order: 'desc',
    },
  },
};

export const fetchPeers = createAsyncThunk(
  'rpcClient/fetchPeers',
  async ({
    pagination: { pageSize, pageNum },
    sorting: { sortBy, order },
  }: PeerState['tableOptions']) => {
    try {
      const peers = await middlewareServiceApi.peer.getPeers({
        sortBy,
        orderBy: order,
        count: pageSize,
        pageNum,
      });

      return peers;
    } catch (error: any) {
      throw new Error('An error occurred while fetching peers.');
    }
  },
);

export const peerSlice = createSlice({
  name: 'peer',
  initialState,
  reducers: {
    setPeerTableOptions: (
      state,
      action: PayloadAction<PeerState['tableOptions']>,
    ) => {
      state.tableOptions = action.payload;
    },
    updatePeerPageNum: (state, action: PayloadAction<number>) => {
      state.tableOptions.pagination.pageNum += action.payload;
    },
    updatePeerSorting: (
      state,
      action: PayloadAction<PeerState['tableOptions']['sorting']>,
    ) => {
      state.tableOptions.sorting = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPeers.pending, state => {
        state.status = Loading.Pending;
      })
      .addCase(
        fetchPeers.fulfilled,
        (
          state,
          {
            payload,
          }: PayloadAction<{
            paginatedResult: ApiData.Peer[];
            totalPeers: number;
          }>,
        ) => {
          state.status = Loading.Complete;
          state.peers = payload.paginatedResult;
          state.totalPeers = payload.totalPeers;
        },
      )
      .addCase(fetchPeers.rejected, state => {
        state.status = Loading.Failed;
      });
  },
});

export const { setPeerTableOptions, updatePeerPageNum, updatePeerSorting } =
  peerSlice.actions;
