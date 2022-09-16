import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RectReadOnly } from 'react-use-measure';

export interface AppState {
  bounds?: RectReadOnly;
}

const initialState: AppState = {
  bounds: undefined,
};

export const appSlice = createSlice({
  name: 'bounds',
  initialState,
  reducers: {
    updateBounds: (state, action: PayloadAction<RectReadOnly>) => {
      state.bounds = action.payload;
    },
  },
});

export const { updateBounds } = appSlice.actions;
