import { RootState } from '../store';

export const getBounds = (state: RootState) => {
  return state.app.bounds;
};
