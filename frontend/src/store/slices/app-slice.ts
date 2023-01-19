import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RectReadOnly } from 'react-use-measure';
import { loadConfig } from 'src/utils';
import {
  REFRESH_TIMER_SECONDS,
  DEFAULT_APP_TITLE,
  DEFAULT_APP_FAVICON,
} from '../../constants';

export interface AppState {
  bounds?: RectReadOnly;
  refreshTimer: number;
  isFirstVisit: boolean;
  appTitle: string;
  appFavicon: string;
}

const { title, faviconUrl } = loadConfig();

const initialState: AppState = {
  bounds: undefined,
  refreshTimer: REFRESH_TIMER_SECONDS,
  isFirstVisit: false,
  appTitle: title || DEFAULT_APP_TITLE,
  appFavicon: faviconUrl || DEFAULT_APP_FAVICON,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateBounds: (state, action: PayloadAction<RectReadOnly>) => {
      state.bounds = action.payload;
    },
    updateRefreshTimer: state => {
      const updatedTime = state.refreshTimer - 1;

      if (updatedTime < 0) {
        state.refreshTimer = REFRESH_TIMER_SECONDS;
      } else {
        state.refreshTimer = updatedTime;
      }
    },
    setIsFirstVisit: (state, action: PayloadAction<boolean>) => {
      state.isFirstVisit = action.payload;
    },
  },
});

export const { updateBounds, updateRefreshTimer, setIsFirstVisit } =
  appSlice.actions;
