import React from 'react';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';
import { standardizeNumber } from 'src/utils';
import { ApiData } from 'src/api/types';
import { ValidatorWeight } from 'casper-js-sdk';
import {
  H2,
  PageLink,
  H3,
  H3Data,
  DataContext,
} from '../HomeComponents.styled';
import { pxToRem } from '../../../../styled-theme';
import { PeersIcon } from '../../../icons';

interface PeersValidatorsInfoProps {
  readonly currentPeers: ApiData.Peer[];
  readonly currentValidators: ValidatorWeight[];
  readonly currentEraValidatorStatus: ApiData.CurrentEraValidatorStatus | null;
}

export const PeersValidatorsInfo: React.FC<PeersValidatorsInfoProps> = ({
  currentPeers,
  currentValidators,
  currentEraValidatorStatus,
}) => {
  const { t } = useTranslation();

  return (
    <Card>
      <Header>
        <PeersIcon />
        <H2>{t('validators')}</H2>
      </Header>
      <Info>
        <TextWrapper>
          <H3>{t('active-validators')}</H3>
          <PageLink to="/validators">{t('view-all')}</PageLink>
        </TextWrapper>
        <H3Data>{standardizeNumber(currentValidators.length)}</H3Data>
        <DataContext>
          {t('active-bids', {
            activeBids: standardizeNumber(
              currentEraValidatorStatus?.bidsCount ?? 0,
            ),
          })}
        </DataContext>
      </Info>
      <Info>
        <TextWrapper>
          <H3>{t('Connected Peers online')}</H3>
          <PageLink to="/peers">{t('view-all')}</PageLink>
        </TextWrapper>
        <H3Data>{currentPeers.length}</H3Data>
      </Info>
    </Card>
  );
};

const Card = styled.section`
  box-shadow: 0px 0.125rem 0.438 rgba(127, 128, 149, 0.15);
  border-radius: 0.5rem;
  background: #ffffff;
  border: 0.063rem solid #e3e3e9;
  box-shadow: 0px 2px 7px rgba(127, 128, 149, 0.15);
  margin-bottom: ${pxToRem(50)};
  padding: 0 2rem;
  width: 100%;
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 1.15rem 0;
  border-bottom: 0.094rem solid #f2f3f5;
`;

const Info = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  margin: 1.45rem 0;
`;

const TextWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;

  h3 {
    padding: unset;
  }
`;
