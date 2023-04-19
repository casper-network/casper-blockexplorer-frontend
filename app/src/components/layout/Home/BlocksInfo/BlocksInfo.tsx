import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate, standardizeNumber } from 'src/utils';
import { ApiData } from 'src/api/types';
import {
  getLatestBlockLoadingStatus,
  Loading,
  useAppSelector,
} from 'src/store';
import Skeleton from 'react-loading-skeleton';
import {
  IconH2Container,
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
import { BlocksIcon } from '../../../icons';

interface BlockInfoProps {
  block: ApiData.Block | null;
}

export const BlocksInfo: React.FC<BlockInfoProps> = ({ block }) => {
  const { t } = useTranslation();

  const latestBlockLoadingStatus = useAppSelector(getLatestBlockLoadingStatus);

  const isLoadingBlocks = latestBlockLoadingStatus !== Loading.Complete;

  return (
    <Card>
      <Header>
        <IconH2Container>
          <BlocksIcon color="black" />
          <H2>{t('blocks')}</H2>
        </IconH2Container>
        <PageLink to="/blocks">{t('view-all')}</PageLink>
      </Header>
      <Details>
        <Info>
          <TextWrapper>
            <H3>{t('block-height')}</H3>
          </TextWrapper>
          <H3Data>
            {isLoadingBlocks ? (
              <Skeleton width={120} duration={1} />
            ) : (
              standardizeNumber(block?.header.height ?? 0)
            )}
          </H3Data>
          <DataContext>
            {isLoadingBlocks ? (
              <Skeleton width="80%" duration={1} />
            ) : (
              formatDate(new Date(block?.header.timestamp ?? ''))
            )}
          </DataContext>
        </Info>
        <Info>
          <TextWrapper>
            <H3>{t('current-era')}</H3>
          </TextWrapper>
          <H3Data>
            {isLoadingBlocks ? (
              <Skeleton width={90} duration={1} />
            ) : (
              standardizeNumber(block?.header.era_id ?? 0)
            )}
          </H3Data>
        </Info>
      </Details>
    </Card>
  );
};
