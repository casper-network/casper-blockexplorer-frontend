import React from 'react';
import styled from '@emotion/styled';

import { useTranslation } from 'react-i18next';
import {
  IconH2Container,
  H2,
  PageLink,
  H3,
  H3Data,
} from '../HomeComponents.styled';
import { breakpoints } from '../../../../styled-theme';
import { PeersIcon } from '../../../icons';

interface PeersValidatorsInfoProps {
  readonly currentPeers: string;
  readonly currentValidators: string;
}

export const PeersValidatorsInfo: React.FC<PeersValidatorsInfoProps> = ({
  currentPeers,
  currentValidators,
}) => {
  const { t } = useTranslation();

  return (
    <PeersInfoDisplay>
      <PeersHeader>
        <IconH2Container>
          <PeersIcon />
          <H2>{t('peers')}</H2>
        </IconH2Container>
        <PageLink to="/peers">{t('view-all')}</PageLink>
      </PeersHeader>
      <PeersDetails>
        <H3>{t('peers-currently-online')}:</H3>
        <H3Data>{currentPeers}</H3Data>
      </PeersDetails>
      <ValidatorsDetails>
        <H3>{t('validators-currently-online')}:</H3>
        <H3Data>{currentValidators}</H3Data>
      </ValidatorsDetails>
    </PeersInfoDisplay>
  );
};

const PeersInfoDisplay = styled.section`
  box-shadow: 0px 0.125rem 0.438 rgba(127, 128, 149, 0.15);
  border-radius: 0.5rem;
  background: #ffffff;
  border: 0.063rem solid #e3e3e9;
  box-shadow: 0px 2px 7px rgba(127, 128, 149, 0.15);
  padding-bottom: 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    min-width: 44.5%;
  }

  @media (min-width: ${breakpoints.lg}) {
    min-width: 35%;
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

const ValidatorsDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  padding: 0 0;
  margin: 0 2rem;
`;
