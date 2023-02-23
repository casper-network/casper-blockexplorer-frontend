import React, { useEffect } from 'react';
import styled from '@emotion/styled';
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
  getValidatorLoadingStatus,
  fetchCurrentEraValidatorStatus,
  getCurrentEraValidatorStatus,
} from 'src/store';
import {
  BlocksInfo,
  DeploysInfo,
  PeersValidatorsInfo,
} from '../components/layout/Home';
import { PageWrapper } from '../components';
import { breakpoints, pxToRem } from '../styled-theme';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLatestBlock());
    dispatch(fetchPeers());
    dispatch(fetchCurrentEraValidatorStatus());
  }, [dispatch]);

  const latestBlock = useAppSelector(getLatestBlock);
  const latestBlockLoadingStatus = useAppSelector(getLatestBlockLoadingStatus);

  const peers = useAppSelector(getPeers);
  const peersLoadingStatus = useAppSelector(getPeerLoadingStatus);

  const validatorsLoadingStatus = useAppSelector(getValidatorLoadingStatus);

  const currentEraValidatorStatus = useAppSelector(
    getCurrentEraValidatorStatus,
  );

  const { isFirstVisit } = useAppSelector(state => state.app);

  const isLoading =
    latestBlockLoadingStatus !== Loading.Complete ||
    peersLoadingStatus !== Loading.Complete ||
    validatorsLoadingStatus !== Loading.Complete;

  return (
    <PageWrapper isLoading={isLoading}>
      <HomeContentContainer isFirstVisit={isFirstVisit}>
        {latestBlock && <BlocksInfo block={latestBlock} />}
        <DeploysInfo />
        {peers && currentEraValidatorStatus && (
          <PeersValidatorsInfo
            currentPeers={peers}
            currentEraValidatorStatus={currentEraValidatorStatus}
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
