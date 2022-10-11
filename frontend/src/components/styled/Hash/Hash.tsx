import styled from '@emotion/styled';
import React from 'react';
import { fonts } from '../../../styled-theme';
import { MOBILE_BREAKPOINT } from '../../../constants';
import { useAppSelector, getBounds } from '../../../store';
import { truncateHash } from '../../../utils';

interface HashProps {
  readonly hash: string;
  readonly alwaysTruncate?: boolean;
}

export const Hash: React.FC<HashProps> = ({ hash, alwaysTruncate }) => {
  const bounds = useAppSelector(getBounds);

  const isMobileScreen = bounds && bounds.width < MOBILE_BREAKPOINT;

  if (alwaysTruncate || isMobileScreen) {
    return <StyledHash>{truncateHash(hash)}</StyledHash>;
  }

  return <StyledHash>{hash}</StyledHash>;
};

export const StyledHash = styled.span`
  font-family: ${fonts.jetBrains};
`;
