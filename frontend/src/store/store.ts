import { configureStore } from '@reduxjs/toolkit';
import { networkSlice, appSlice } from './slices';

export const store = configureStore({
  reducer: {
    networkStatus: networkSlice.reducer,
    app: appSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
