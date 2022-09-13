import { RootState } from '../store';

export const getBlocks = (state: RootState) => {
  return state.block.blocks;
};

export const getBLockLoadingStatus = (state: RootState) => {
  return state.block.status;
};
