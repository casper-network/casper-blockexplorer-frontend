import { configureStore } from '@reduxjs/toolkit';
import {
  accountSlice,
  appSlice,
  blockListener,
  blockSlice,
  deploySlice,
  networkSlice,
  peerListener,
  peerSlice,
  validatorListener,
  validatorSlice,
} from './slices';

export const store = configureStore({
  reducer: {
    app: appSlice.reducer,
    block: blockSlice.reducer,
    peer: peerSlice.reducer,
    validator: validatorSlice.reducer,
    network: networkSlice.reducer,
    account: accountSlice.reducer,
    deploy: deploySlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({ serializableCheck: false }).prepend(
      validatorListener.middleware,
      peerListener.middleware,
      blockListener.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
