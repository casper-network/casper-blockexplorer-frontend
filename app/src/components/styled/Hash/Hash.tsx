import styled from '@emotion/styled';
import React from 'react';
import { fonts } from '../../../styled-theme';
import { truncateHash } from '../../../utils';
import { useAppWidth } from '../../../hooks';

interface HashProps {
  readonly hash: string;
  readonly alwaysTruncate?: boolean;
}

export const Hash: React.FC<HashProps> = ({ hash, alwaysTruncate }) => {
  const { isMobile } = useAppWidth();

  if (alwaysTruncate || isMobile) {
    return <StyledHash data-cy="hash-heading">{truncateHash(hash)}</StyledHash>;
  }

  return <StyledHash data-cy="hash-heading">{hash}</StyledHash>;
};

export const StyledHash = styled.span`
  font-family: ${fonts.secondaryFont};
`;
