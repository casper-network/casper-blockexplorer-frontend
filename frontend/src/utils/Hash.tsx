import React from 'react';
import { getBounds, useAppSelector } from 'src/store';
import { truncateHash } from 'src/utils';
import { MOBILE_BREAKPOINT } from 'src/constants';

interface HashProps {
  readonly hash: string;
}

export const Hash: React.FC<HashProps> = ({ hash }) => {
  const bounds = useAppSelector(getBounds);

  if (bounds && bounds.width < MOBILE_BREAKPOINT) {
    return <span>{truncateHash(hash)}</span>;
  }

  return <span>{hash}</span>;
};
