/* eslint-disable no-console */
/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RectReadOnly } from 'react-use-measure';
import { io, Socket } from 'socket.io-client';
import { loadConfig } from 'src/utils';
import {
  REFRESH_TIMER_SECONDS,
  DEFAULT_FONT_URL,
  DEFAULT_PRIMARY_FONT_FAMILIES,
  DEFAULT_SECONDARY_FONT_FAMILIES,
} from '../../constants';

export interface AppState {
  bounds?: RectReadOnly;
  refreshTimer: number;
  isFirstVisit: boolean;
  appFontUrl: string;
  appPrimaryFontName: string;
  appSecondaryFontName: string;
  socket?: Socket;
}

const { fontUrl, primaryFontName, secondaryFontName, socketConnectionUrl } =
  loadConfig();

const initialState: AppState = {
  bounds: undefined,
  refreshTimer: REFRESH_TIMER_SECONDS,
  isFirstVisit: false,
  appFontUrl: fontUrl || DEFAULT_FONT_URL,
  appPrimaryFontName: primaryFontName || DEFAULT_PRIMARY_FONT_FAMILIES,
  appSecondaryFontName: secondaryFontName || DEFAULT_SECONDARY_FONT_FAMILIES,
  socket: undefined,
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    updateBounds: (state, action: PayloadAction<RectReadOnly>) => {
      state.bounds = action.payload;
    },
    updateRefreshTimer: (state, action: PayloadAction<{ value?: number }>) => {
      const { value } = action.payload;

      if (value !== undefined) {
        state.refreshTimer = value;
        return;
      }

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
    initializeSocket: state => {
      if (!state.socket) {
        const socket = io(socketConnectionUrl, {
          transports: ['websocket', 'polling'],
        });

        socket.on('connect', () => {
          console.log(`connected with socket id: ${socket.id}.`);
        });

        if (socket.connected === false) {
          console.log('socket connection does not exist.');
        }

        state.socket = socket as any;
      } else {
        state.socket.connect();
      }
    },
  },
});

export const {
  updateBounds,
  updateRefreshTimer,
  setIsFirstVisit,
  initializeSocket,
} = appSlice.actions;
