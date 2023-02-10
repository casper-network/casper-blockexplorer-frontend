import { configureStore } from '@reduxjs/toolkit';
import { appSlice, blockSlice, peerSlice, validatorSlice } from './slices';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    block: blockSlice.reducer,
    peer: peerSlice.reducer,
    validator: validatorSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
