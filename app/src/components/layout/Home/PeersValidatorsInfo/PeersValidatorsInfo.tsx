import React from 'react';
import { useTranslation } from 'react-i18next';
import { standardizeNumber } from 'src/utils';
import { ApiData } from 'src/api/types';
import {
  getCurrentEraValidatorStatusStatus,
  getPeerLoadingStatus,
  getTotalPeers,
  Loading,
  useAppSelector,
} from 'src/store';
import Skeleton from 'react-loading-skeleton';
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
import 'react-loading-skeleton/dist/skeleton.css';

interface PeersValidatorsInfoProps {
  readonly currentEraValidatorStatus: ApiData.CurrentEraValidatorStatus | null;
}

export const PeersValidatorsInfo: React.FC<PeersValidatorsInfoProps> = ({
  currentEraValidatorStatus,
}) => {
  const { t } = useTranslation();

  const peersLoadingStatus = useAppSelector(getPeerLoadingStatus);
  const validatorsLoadingStatus = useAppSelector(
    getCurrentEraValidatorStatusStatus,
  );
  const currentTotalPeers = useAppSelector(getTotalPeers);

  const isLoadingPeers = peersLoadingStatus !== Loading.Complete;
  const isLoadingValidators = validatorsLoadingStatus !== Loading.Complete;

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
            {isLoadingValidators ? (
              <Skeleton width={60} duration={1} />
            ) : (
              standardizeNumber(currentEraValidatorStatus?.validatorsCount ?? 0)
            )}
          </H3Data>
          <DataContext>
            {isLoadingValidators ? (
              <Skeleton width="70%" duration={1} />
            ) : (
              t('active-bids', {
                activeBids: standardizeNumber(
                  currentEraValidatorStatus?.bidsCount ?? 0,
                ),
              })
            )}
          </DataContext>
        </Info>
        <Info>
          <TextWrapper>
            <H3>{t('Connected Peers online')}</H3>
            <PageLink to="/peers">{t('view-all')}</PageLink>
          </TextWrapper>
          <H3Data>
            {isLoadingPeers ? (
              <Skeleton width={60} duration={1} />
            ) : (
              currentTotalPeers
            )}
          </H3Data>
        </Info>
      </Details>
    </Card>
  );
};
