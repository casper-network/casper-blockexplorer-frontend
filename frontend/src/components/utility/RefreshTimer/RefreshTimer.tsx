import React from 'react';
import { useAppRefresh } from 'src/hooks';

export const RefreshTimer: React.FC = () => {
  const { refreshTimer } = useAppRefresh();

  return <span>Refreshing in {refreshTimer} seconds..</span>;
};
