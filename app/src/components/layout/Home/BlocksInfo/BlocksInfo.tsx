import React from 'react';
import { useTranslation } from 'react-i18next';
import { formatDate } from 'src/utils';
import { ApiData } from 'src/api/types';
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
import { getLatestBlockLoadingStatus, useAppSelector } from 'src/store';

interface BlockInfoProps {
  block: ApiData.Block | null;
}

export const BlocksInfo: React.FC<BlockInfoProps> = ({ block }) => {
  const { t } = useTranslation();

  const latestBlockLoadingStatus = useAppSelector(getLatestBlockLoadingStatus);

  return (
    <Card>
      <Header>
        <IconH2Container>
          <BlocksIcon />
          <H2>{t('blocks')}</H2>
        </IconH2Container>
        <PageLink to="/blocks">{t('view-all')}</PageLink>
      </Header>
      <Details>
        <Info>
          <TextWrapper>
            <H3>{t('block-height')}</H3>
          </TextWrapper>
          <H3Data>{block?.header.height ?? 0}</H3Data>
          <DataContext>
            {block?.header.timestamp
              ? formatDate(new Date(block.header.timestamp))
              : ''}
          </DataContext>
        </Info>
        <Info>
          <TextWrapper>
            <H3>{t('current-era')}</H3>
          </TextWrapper>
          <H3Data>{block?.header.era_id ?? 0}</H3Data>
        </Info>
      </Details>
    </Card>
  );
};
