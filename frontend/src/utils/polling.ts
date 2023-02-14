import {
  BLOCK_TIME_PADDING_SECONDS,
  REFRESH_TIMER_SECONDS,
} from 'src/constants';

export const getTimeUntilRefetchBlocks = (blockTimestamp: string) => {
  const latestBlockTimeInSeconds = new Date(blockTimestamp).getTime() / 1000;
  const timeNowInSeconds = new Date().getTime() / 1000;

  const blockCreatedTimeAgo = timeNowInSeconds - latestBlockTimeInSeconds;
  const timeUntilBlocksRefetch =
    REFRESH_TIMER_SECONDS + BLOCK_TIME_PADDING_SECONDS - blockCreatedTimeAgo;

  return timeUntilBlocksRefetch;
};
