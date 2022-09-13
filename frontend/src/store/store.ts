import { configureStore } from '@reduxjs/toolkit';
import { blockSlice } from './slices';

export const store = configureStore({
  reducer: {
    block: blockSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
