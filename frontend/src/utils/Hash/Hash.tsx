import React from 'react';
import { MOBILE_BREAKPOINT } from 'src/constants';
import { useAppSelector, getBounds } from 'src/store';
import { truncateHash } from '../truncate-hash';

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
