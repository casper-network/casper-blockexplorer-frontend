import React from 'react';
import useAsyncEffect from 'use-async-effect';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';

import { casperApi } from '../api';
import {
  BlocksInfo,
  DeploysInfo,
  PeersValidatorsInfo,
} from '../components/layout/Home';

import { PageWrapper } from '../components';

import {
  getBlocks,
  getBlockLoadingStatus,
  getPeers,
  getPeerLoadingStatus,
  useAppDispatch,
  useAppSelector,
  Loading,
  fetchBlocks,
  fetchPeers,
  getIsFirstVisit,
} from '../store';
import { breakpoints, pxToRem } from '../styled-theme';
import { standardizeNumber } from '../utils';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const peers = useAppSelector(getPeers);

  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);
  const peerLoadingStatus = useAppSelector(getPeerLoadingStatus);
  const isFirstVisit = useAppSelector(getIsFirstVisit);

  const blocksAreLoading = blockLoadingStatus !== Loading.Complete;
  const peersAreLoading = peerLoadingStatus !== Loading.Complete;
  const { data: validators, isLoading: validtorIsLoading } = useQuery(
    ['validators'],
    () => casperApi.getValidators(),
  );
  const isLoading = blocksAreLoading || peersAreLoading || validtorIsLoading;

  const firstListedBlockHeight = !blocksAreLoading
    ? blocks[0].height.toLocaleString()
    : 'n/a';
  const firstListedBlockEraID = !blocksAreLoading
    ? blocks[0].eraID.toLocaleString()
    : 'n/a';
  const firstListedBlockEraTimeStamp = !blocksAreLoading
    ? blocks[0].readableTimestamp
    : 'n/a';

  const currentPeers = !peersAreLoading ? peers.length.toLocaleString() : 'n/a';

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks());
    }
    if (peerLoadingStatus === Loading.Idle) {
      dispatch(fetchPeers());
    }
  }, []);

  return (
    <PageWrapper isLoading={isLoading}>
      <HomeContentContainer isFirstVisit={isFirstVisit}>
        <BlocksInfo
          blockHeight={firstListedBlockHeight}
          blockEraTimeStamp={firstListedBlockEraTimeStamp}
          blockEraID={firstListedBlockEraID}
        />
        <DeploysInfo />
        <PeersValidatorsInfo
          currentPeers={currentPeers}
          currentValidators={standardizeNumber(validators?.length || 0)}
        />
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
