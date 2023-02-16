import { useCallback, useEffect } from 'react';
import { updateRefreshTimer, useAppDispatch, useAppSelector } from '../store';

export const useAppRefresh = () => {
  const dispatch = useAppDispatch();

  const { refreshTimer } = useAppSelector(state => state.app);

  useEffect(() => {
    const refreshInterval = setInterval(() => {
      if (!document.hidden) dispatch(updateRefreshTimer({}));
    }, 1000);

    return () => clearTimeout(refreshInterval);
  }, [dispatch]);

  const setTimer = useCallback(
    (value: number) => {
      dispatch(updateRefreshTimer({ value: Math.ceil(value) }));
    },
    [dispatch],
  );

  return { setTimer, value: refreshTimer };
};
