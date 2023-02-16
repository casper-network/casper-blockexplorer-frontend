import React from 'react';
import { useAppSelector } from 'src/store';

export const RefreshTimer: React.FC = () => {
  const { refreshTimer } = useAppSelector(state => state.app);

  const refreshTimeText = `${
    refreshTimer > 0 ? `in ${refreshTimer} seconds` : 'now'
  }...`;

  return <span>Refreshing {refreshTimeText}</span>;
};
