import React from 'react';
import styled from '@emotion/styled';

import { useLatestBlock, usePeers, useValidators } from 'src/hooks';
import { useAppSelector } from 'src/store';
import {
  BlocksInfo,
  DeploysInfo,
  PeersValidatorsInfo,
} from '../components/layout/Home';
import { PageWrapper } from '../components';
import { breakpoints, pxToRem } from '../styled-theme';
import { standardizeNumber } from '../utils';

export const Home: React.FC = () => {
  const { data: latestBlock, isLoading: isLoadingLatestBlock } =
    useLatestBlock();
  const { data: peers, isLoading: isLoadingPeers } = usePeers();
  const { data: validators, isLoading: isLoadingValidators } = useValidators();
  const { isFirstVisit } = useAppSelector(state => state.app);

  const isLoading =
    isLoadingLatestBlock || isLoadingPeers || isLoadingValidators;

  return (
    <PageWrapper isLoading={isLoading}>
      <HomeContentContainer isFirstVisit={isFirstVisit}>
        {latestBlock && <BlocksInfo block={latestBlock} />}
        <DeploysInfo />
        {peers && (
          <PeersValidatorsInfo
            currentPeers={peers}
            currentValidators={standardizeNumber(validators?.length || 0)}
          />
        )}
      </HomeContentContainer>
    </PageWrapper>
  );
};

const HomeContentContainer = styled.div<{ isFirstVisit: boolean }>`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 17.2rem;
  padding-top: 0;

  @media (min-width: ${breakpoints.md}) {
    min-width: 39rem;
    flex-direction: row;
    justify-content: center;
    gap: ${pxToRem(60)};
    padding-top: ${pxToRem(32)};
  }

  @media (min-width: ${breakpoints.md}) {
    width: 68.25%;
    max-width: ${pxToRem(793)};
    padding-top: ${({ isFirstVisit }) =>
      isFirstVisit ? '0' : `${pxToRem(30)}`};
  }
`;
