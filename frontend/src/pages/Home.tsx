import React from 'react';
import useAsyncEffect from 'use-async-effect';

import styled from '@emotion/styled';

import {
  BlocksInfo,
  DeploysInfo,
  ValidatorsInfo,
  PeersInfo,
} from './HomeComponents/index';

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
} from '../store';
import { useAppWidth } from '../hooks';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);

  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const { isMobile } = useAppWidth();

  const isLoading = blockLoadingStatus !== Loading.Complete;
  const blocksAreLoading = blockLoadingStatus !== Loading.Complete;

  const peers = useAppSelector(getPeers);

  const peerLoadingStatus = useAppSelector(getPeerLoadingStatus);

  const firstListedBlockHeight = !blocksAreLoading
    ? blocks[0].height.toLocaleString()
    : 'n/a';
  const firstListedBlockEraID = !blocksAreLoading
    ? blocks[0].eraID.toLocaleString()
    : 'n/a';
  const firstListedBlockEraTimeStamp = !blocksAreLoading
    ? blocks[0].readableTimestamp
    : 'n/a';

  const peersAreLoading = peerLoadingStatus !== Loading.Complete;

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
    <PageWrapper isLoading={blocksAreLoading || peersAreLoading}>
      <HomeContentContainer>
        <BlocksInfo
          blockHeight={firstListedBlockHeight}
          blockEraTimeStamp={firstListedBlockEraTimeStamp}
          blockEraID={firstListedBlockEraID}
        />
        <DeploysInfo />
        <ValidatorsInfo />
        <PeersInfo currentPeers={currentPeers} />
      </HomeContentContainer>
    </PageWrapper>
  );
};

const HomeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 17.2rem;

  @media (min-width: 768px) {
    min-width: 44.75rem;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }

  @media (min-width: 1024px) {
    min-width: 54.8rem;
    max-width: 65rem;
  }
`;
