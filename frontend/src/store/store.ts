import { configureStore } from '@reduxjs/toolkit';
import { blockSlice, peerSlice, appSlice } from './slices';

export const store = configureStore({
  reducer: {
    block: blockSlice.reducer,
    peer: peerSlice.reducer,
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
