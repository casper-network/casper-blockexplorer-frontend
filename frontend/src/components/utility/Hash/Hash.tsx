import React from 'react';
import { MOBILE_BREAKPOINT } from '../../../constants';
import { useAppSelector, getBounds } from '../../../store';
import { truncateHash } from '../../../utils/truncate-hash';

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
