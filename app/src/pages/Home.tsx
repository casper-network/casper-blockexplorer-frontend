import React, { useEffect } from 'react';
import styled from '@emotion/styled';
import {
  getLatestBlock,
  useAppSelector,
  useAppDispatch,
  fetchLatestBlock,
  fetchPeers,
  fetchCurrentEraValidatorStatus,
  getCurrentEraValidatorStatus,
  getPeersTableOptions,
  initializeSocket,
} from 'src/store';
import { defaultTheme, pxToRem } from 'casper-ui-kit';
import {
  BlocksInfo,
  DeploysInfo,
  PeersValidatorsInfo,
} from '../components/layout/Home';
import { PageWrapper } from '../components';

export const Home: React.FC = () => {
  const dispatch = useAppDispatch();
  const peersTableOptions = useAppSelector(getPeersTableOptions);

  useEffect(() => {
    dispatch(fetchLatestBlock());
    dispatch(fetchPeers(peersTableOptions));
    dispatch(fetchCurrentEraValidatorStatus());
  }, [dispatch, peersTableOptions]);

  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  const latestBlock = useAppSelector(getLatestBlock);

  const currentEraValidatorStatus = useAppSelector(
    getCurrentEraValidatorStatus,
  );

  const { isFirstVisit } = useAppSelector(state => state.app);

  return (
    <PageWrapper isLoading={false}>
      <HomeContentContainer isFirstVisit={isFirstVisit}>
        <BlocksInfo block={latestBlock} />
        <DeploysInfo />
        <PeersValidatorsInfo
          currentEraValidatorStatus={currentEraValidatorStatus}
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
  padding-top: 2rem;

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    min-width: 39rem;
    flex-direction: row;
    justify-content: center;
    gap: ${pxToRem(60)};
    padding-top: ${pxToRem(36)};
  }

  @media (min-width: ${defaultTheme.typography.breakpoints.md}) {
    width: 68.25%;
    max-width: ${pxToRem(793)};
    padding-top: ${({ isFirstVisit }) =>
      isFirstVisit ? '0' : `${pxToRem(30)}`};
  }
`;
