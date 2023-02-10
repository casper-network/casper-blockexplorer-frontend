import React, { useEffect } from 'react';
import styled from '@emotion/styled';

import { useValidators } from 'src/hooks';
import {
  getLatestBlockLoadingStatus,
  getLatestBlock,
  useAppSelector,
  Loading,
  useAppDispatch,
  fetchLatestBlock,
  fetchPeers,
  getPeers,
  getPeerLoadingStatus,
} from 'src/store';
import {
  BlocksInfo,
  DeploysInfo,
  PeersValidatorsInfo,
} from '../components/layout/Home';
import { PageWrapper } from '../components';
import { breakpoints, pxToRem } from '../styled-theme';
import { standardizeNumber } from '../utils';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLatestBlock());
    dispatch(fetchPeers());
  }, []);

  const latestBlock = useAppSelector(getLatestBlock);
  const latestBlockLoadingStatus = useAppSelector(getLatestBlockLoadingStatus);

  const peers = useAppSelector(getPeers);
  const peersLoadingStatus = useAppSelector(getPeerLoadingStatus);

  console.log({ peers });

  const { data: validators, isLoading: isLoadingValidators } = useValidators();
  const { isFirstVisit } = useAppSelector(state => state.app);

  const isLoading =
    latestBlockLoadingStatus !== Loading.Complete ||
    peersLoadingStatus !== Loading.Complete ||
    isLoadingValidators;

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
