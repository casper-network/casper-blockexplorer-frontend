import { RootState } from '../store';

export const getBlocks = (state: RootState) => {
  return state.block.blocks;
};

export const getBlockLoadingStatus = (state: RootState) => {
  return state.block.status;
};
