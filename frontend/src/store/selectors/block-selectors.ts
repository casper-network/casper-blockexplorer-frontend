import { RootState } from '../store';

export const getBlocks = (state: RootState) => {
  return state.block.blocks;
};

export const getTotalBlocks = (state: RootState) => {
  return state.block.totalBlocks;
};

export const getBlockLoadingStatus = (state: RootState) => {
  return state.block.status;
};

export const getLatestBlockLoadingStatus = (state: RootState) => {
  return state.block.latestBlockLoadingStatus;
};

export const getLatestBlock = (state: RootState) => {
  return state.block.latestBlock;
};

export const getBlocksTableOptions = (state: RootState) => {
  return state.block.tableOptions;
};

export const getLatestBlockHeight: (
  state: RootState,
) => number | undefined = state => {
  return state.block.blocks[0]?.header.height;
};

export const getEarliestLoadedBlock: (
  state: RootState,
) => number | undefined = state => {
  return state.block.blocks[state.block.blocks.length - 1]?.header.height;
};
