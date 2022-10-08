import React from 'react';
import useAsyncEffect from 'use-async-effect';

import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

import { ReactComponent as BlocksIcon } from '../assets/icons/blocks-icon.svg';
import { ReactComponent as DeploysIcon } from '../assets/icons/deploys-icon.svg';
import { ReactComponent as ValidatorsIcon } from '../assets/icons/validators-icon.svg';
import { ReactComponent as PeersIcon } from '../assets/icons/peers-icon.svg';

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

  const firstListedBlockHeight =
    blockLoadingStatus === 'complete'
      ? blocks[0].height.toLocaleString()
      : 'n/a';
  const firstListedBlockEraID =
    blockLoadingStatus === 'complete'
      ? blocks[0].eraID.toLocaleString()
      : 'n/a';
  const firstListedBlockEraTimeStamp =
    blockLoadingStatus === 'complete' ? blocks[0].readableTimestamp : 'n/a';

  const peers = useAppSelector(getPeers);
  const peerLoadingStatus = useAppSelector(getPeerLoadingStatus);

  const PeersAreLoading = peerLoadingStatus !== Loading.Complete;

  const currentPeers =
    peerLoadingStatus === 'complete' ? peers.length.toLocaleString() : 'n/a';

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
      dispatch(fetchBlocks());
    }
    if (peerLoadingStatus === Loading.Idle) {
      dispatch(fetchPeers());
    }
  }, []);

  return (
    <PageWrapper isLoading={blocksAreLoading || PeersAreLoading}>
      <HomeContentContainer>
        <Blocks>
          <BlocksHeader>
            <IconH2Container>
              <BlocksIcon />
              <H2>Blocks</H2>
            </IconH2Container>
            <PageLink to="/blocks">View all</PageLink>
          </BlocksHeader>
          <BlockDetails>
            <H3>Block Height</H3>
            <H3Data>{firstListedBlockHeight}</H3Data>
            <DataContext>{firstListedBlockEraTimeStamp}</DataContext>
            <H3>Current Era</H3>
            <H3Data>{firstListedBlockEraID}</H3Data>
          </BlockDetails>
        </Blocks>
        <Deploys>
          <DeploysHeader>
            <IconH2Container>
              <DeploysIcon />
              <H2>Deploys</H2>
            </IconH2Container>
            <PageLink to="/deploys">View all</PageLink>
          </DeploysHeader>
          <DeployDetails>
            <H3>Total Deploys</H3>
            <H3Data>n/a</H3Data>
            <DataContext>n/a</DataContext>
            <H3>Today</H3>
            <H3Data>n/a</H3Data>
          </DeployDetails>
        </Deploys>
        <Validators>
          <ValidatorsHeader>
            <IconH2Container>
              <ValidatorsIcon />
              <H2>Validators</H2>
            </IconH2Container>
            <PageLink to="/validators">View all</PageLink>
          </ValidatorsHeader>
          <ValidatorDetails>
            <H3>Active Validators</H3>
            <H3Data>n/a</H3Data>
            <DataContext>out of 0 active bids</DataContext>
          </ValidatorDetails>
        </Validators>
        <Peers>
          <PeersHeader>
            <IconH2Container>
              <PeersIcon />
              <H2>Peers</H2>
            </IconH2Container>
            <PageLink to="/peers">View all</PageLink>
          </PeersHeader>
          <PeersDetails>
            <H3>Currently online</H3>
            <H3Data>{currentPeers}</H3Data>
            {/* <DataContext>1 minute ago</DataContext> */}
          </PeersDetails>
        </Peers>
      </HomeContentContainer>
    </PageWrapper>
  );
};

const HomeContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 18.563rem;
  @media (min-width: 768px) {
    min-width: 44.75rem;
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
  }
  @media (min-width: 1024px) {
    margin: 0 0 0 12.5rem;
    justify-content: start;
    max-width: 60rem;
  }
  @media (min-width: 1200px) {
    margin: 0 0 0 11.5rem;
    max-width: 60rem;
  }
  @media (min-width: 1340px) {
    margin: 0 auto;
    max-width: 75rem;
    padding-left: 17rem;
  }
`;
// *******************************************************************Blocks
const Blocks = styled.section`
  background: #ffffff;
  border: 0.063rem solid #e3e3e9;
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.438rem rgba(127, 128, 149, 0.15);
  padding-bottom: 1.5rem;
  margin-bottom: 3.25rem;
  @media (min-width: 768px) {
    margin-bottom: 4.25rem;
    margin-right: 3.125rem;
  }
  @media (min-width: 1024px) {
    width: 40%;
    margin: 0 7% 4rem 0;
  }
`;

const BlocksHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 2rem;
  @media (min-width: 1024px) {
  }
`;

const IconH2Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 84%;
  @media (min-width: 1024px) {
    max-width: 12.7rem;
  }
`;

const H2 = styled.h2`
  font-size: clamp(1.5rem, 2vw, 1.7rem);
  font-weight: 600;
  line-height: 1.875rem;
  max-width: 10.5rem;
  padding: 0 5rem 0 0.8rem;
`;

const PageLink = styled(Link)`
  color: #0325d1;
  font-size: clamp(0.67rem, 1.25vw, 1rem);
  font-weight: 500;
  min-width: 3.5rem;
  text-decoration: none;
  :hover,
  :focus {
    background-color: #0325d1;
    background-image: linear-gradient(
      90deg,
      #1c1e90,
      #693590,
      #d81d54,
      #d81e54,
      #fd6b52
    );
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    text-decoration: none;
  }
`;

const BlockDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-top: 0.094rem solid #f2f3f5;
  padding: 0 0;
  margin: 0 2rem;
  @media (min-width: 1024px) {
  }
`;

const H3 = styled.h3`
  font-weight: 500;
  font-size: 1rem;
  line-height: 1.188rem;
  padding: 1.45rem 0 0 0;
  @media (min-width: 1024px) {
  }
`;

const H3Data = styled.p`
  color: #0325d1;
  font-weight: 800;
  font-size: 2rem;
  padding: 0.55rem 0 0.2rem 0;
  @media (min-width: 1024px) {
  }
`;

const DataContext = styled.p`
  color: #7f8095;
  font-weight: 500;
  font-size: 1rem;
  @media (min-width: 1024px) {
  }
`;

// *******************************************************************Deploys

const Deploys = styled.section`
  box-shadow: 0px 0.125rem 0.438 rgba(127, 128, 149, 0.15);
  border-radius: 0.5rem;
  background: #ffffff;
  border: 0.063rem solid #e3e3e9;
  box-shadow: 0px 2px 7px rgba(127, 128, 149, 0.15);
  padding-bottom: 1.5rem;
  margin-bottom: 3.25rem;
  @media (min-width: 768px) {
    margin-bottom: 4.25rem;
  }
  @media (min-width: 1024px) {
    width: 40%;
    margin-bottom: 4rem;
  }
  /* @media (min-width: 1414px) {
    max-width: 35%;
  } */
`;

const DeploysHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 2rem;
`;

const DeployDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-top: 0.094rem solid #f2f3f5;
  padding: 0 0;
  margin: 0 2rem;
`;

// *******************************************************************Validators

const Validators = styled.section`
  box-shadow: 0 0.125rem 0.438rem rgba(127, 128, 149, 0.15);
  border-radius: 0.5rem;
  background: #ffffff;
  border: 0.063rem solid #e3e3e9;
  padding-bottom: 1.5rem;
  margin-bottom: 3.25rem;
  @media (min-width: 768px) {
    margin-bottom: 4.25rem;
    margin-right: 3.125rem;
  }
  @media (min-width: 1024px) {
    width: 40%;
    margin: 0 8% 6rem 0;
  }
`;

const ValidatorsHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 2rem;
`;

const ValidatorDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-top: 0.094rem solid #f2f3f5;
  padding: 0 0;
  margin: 0 2rem;
`;

// *******************************************************************Peers

const Peers = styled.section`
  box-shadow: 0px 0.125rem 0.438 rgba(127, 128, 149, 0.15);
  border-radius: 0.5rem;
  background: #ffffff;
  border: 0.063rem solid #e3e3e9;
  box-shadow: 0px 2px 7px rgba(127, 128, 149, 0.15);
  padding-bottom: 1.5rem;
  margin-bottom: 3.25rem;
  @media (min-width: 768px) {
    margin-bottom: 4.25rem;
  }
  @media (min-width: 1024px) {
    width: 40%;
    margin-bottom: 6rem;
  }
`;

const PeersHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 2rem;
`;

const PeersDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-top: 0.094rem solid #f2f3f5;
  padding: 0 0;
  margin: 0 2rem;
`;
