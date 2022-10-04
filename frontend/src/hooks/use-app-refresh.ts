import { useEffect } from 'react';
import {
  getLatestBlockHeight,
  getRefreshTimer,
  refreshBlocks,
  refreshBlockTimes,
  updateRefreshTimer,
  useAppDispatch,
  useAppSelector,
} from '../store';

export const useAppRefresh = () => {
  const dispatch = useAppDispatch();
  const latestBlockHeight = useAppSelector(getLatestBlockHeight);
  const refreshTimer = useAppSelector(getRefreshTimer);

  const shouldRefreshBlocks = refreshTimer === 0;

  useEffect(() => {
    const refreshAppData = () => {
      // latestBlockHeight will not exist until first application load
      if (latestBlockHeight && shouldRefreshBlocks) {
        dispatch(refreshBlockTimes());
        dispatch(refreshBlocks(latestBlockHeight));
      }
    };

    const refreshInterval = setInterval(() => {
      refreshAppData();
      dispatch(updateRefreshTimer());
    }, 1000);

    return () => {
      clearTimeout(refreshInterval);
    };
  }, [dispatch, latestBlockHeight, shouldRefreshBlocks]);

  return {
    refreshTimer,
  };
};
