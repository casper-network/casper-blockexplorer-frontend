import React from 'react';
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
  Card,
  Header,
  Details,
  Info,
  TextWrapper,
} from '../HomeComponents.styled';
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
      <Details>
        <Info>
          <TextWrapper>
            <H3>{t('active-validators')}</H3>
            <PageLink to="/validators">{t('view-all')}</PageLink>
          </TextWrapper>
          <H3Data>
            {/* TODO: is this right - or should be from currentValidators? */}
            {standardizeNumber(currentEraValidatorStatus?.validatorsCount ?? 0)}
          </H3Data>
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
      </Details>
    </Card>
  );
};
