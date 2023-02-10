import { configureStore } from '@reduxjs/toolkit';
import { appSlice, blockSlice } from './slices';
import { peerSlice } from './slices/peer-slice';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    block: blockSlice.reducer,
    peer: peerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
