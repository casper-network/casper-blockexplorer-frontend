import { configureStore } from '@reduxjs/toolkit';
import { blockSlice, peerSlice } from './slices';

export const store = configureStore({
  reducer: {
    block: blockSlice.reducer,
    peer: peerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
