import React from 'react';
import { useAppRefresh } from '../../../hooks';

export const RefreshTimer: React.FC = () => {
  const { refreshTimer } = useAppRefresh();

  return <span>Refreshing in {refreshTimer} seconds..</span>;
};
