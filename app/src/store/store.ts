import {
  CombinedState,
  configureStore,
  PreloadedState,
} from '@reduxjs/toolkit';
import { NoInfer } from 'react-redux';
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

export const storeWithPreloadedState = (
  preloadedState?: PreloadedState<CombinedState<NoInfer<any>>>,
) => {
  return configureStore({
    reducer: {
      app: appSlice.reducer,
      block: blockSlice.reducer,
      peer: peerSlice.reducer,
      validator: validatorSlice.reducer,
      network: networkSlice.reducer,
      account: accountSlice.reducer,
      deploy: deploySlice.reducer,
    },
    preloadedState,
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().prepend(
        validatorListener.middleware,
        peerListener.middleware,
        blockListener.middleware,
      ),
  });
};

export const store = storeWithPreloadedState();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
