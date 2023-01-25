import React from 'react';
import styled from '@emotion/styled';

import { useTranslation } from 'react-i18next';
import { Peer } from 'src/api';
import {
  IconH2Container,
  H2,
  PageLink,
  H3,
  H3Data,
} from '../HomeComponents.styled';

import { colors, pxToRem } from '../../../../styled-theme';

import { PeersIcon } from '../../../icons';

interface PeersValidatorsInfoProps {
  readonly currentPeers: Peer[];
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
        <H3Data>{currentPeers.length}</H3Data>
      </PeersDetails>
      <ValidatorsDetails>
        <H3>{t('validators-currently-online')}:</H3>
        <H3Data>{currentValidators}</H3Data>
      </ValidatorsDetails>
    </PeersInfoDisplay>
  );
};

const PeersInfoDisplay = styled.section`
  box-shadow: 0px 0.125rem 0.438 ${colors.boxShadow};
  border-radius: 0.5rem;
  background: ${colors.white};
  border: 0.063rem solid ${colors.mediumSupporting};
  box-shadow: 0px 2px 7px ${colors.boxShadow};
  margin-bottom: ${pxToRem(50)};
  width: 100%;
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
  border-top: 0.094rem solid ${colors.secondary};
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
