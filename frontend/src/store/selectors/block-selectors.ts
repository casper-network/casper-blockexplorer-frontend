import { RootState } from '../store';

export const getBlocks = (state: RootState) => {
  return state.block.blocks;
};

export const getBlockLoadingStatus = (state: RootState) => {
  return state.block.status;
};

export const getLoadingMoreBlocksStatus = (state: RootState) => {
  return state.block.isLoadingMoreBlocks;
};

export const getLatestBlockHeight: (
  state: RootState,
) => number | undefined = state => {
  return state.block.blocks[0]?.height;
};

export const getEarliestLoadedBlock: (
  state: RootState,
) => number | undefined = state => {
  return state.block.blocks[state.block.blocks.length - 1]?.height;
};
