import React from 'react';
import styled from '@emotion/styled';
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
} from '../HomeComponents.styled';
import { colors, pxToRem } from '../../../../styled-theme';
import { BlocksIcon } from '../../../icons';

interface BlockInfoProps {
  block: ApiData.Block;
}

export const BlocksInfo: React.FC<BlockInfoProps> = ({ block }) => {
  const { t } = useTranslation();

  return (
    <BlockInfoDisplay>
      <BlocksHeader>
        <IconH2Container>
          <BlocksIcon />
          <H2>{t('blocks')}</H2>
        </IconH2Container>
        <PageLink to="/blocks">{t('view-all')}</PageLink>
      </BlocksHeader>
      <BlockDetails>
        <H3>{t('block-height')}</H3>
        <H3Data>{block.header.height}</H3Data>
        <DataContext>
          {formatDate(new Date(block.header.timestamp))}
        </DataContext>
        <H3>{t('current-era')}</H3>
        <H3Data>{block.header.era_id}</H3Data>
      </BlockDetails>
    </BlockInfoDisplay>
  );
};

const BlockInfoDisplay = styled.section`
  background: ${colors.white};
  border: 0.063rem solid ${colors.mediumSupporting};
  border-radius: 0.5rem;
  box-shadow: 0 0.125rem 0.438rem ${colors.boxShadow};
  padding-bottom: 1.5rem;
  margin-bottom: ${pxToRem(50)};
  width: 100%;
`;

const BlocksHeader = styled.header`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 1.15rem 2rem;
`;

const BlockDetails = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: start;
  border-top: 0.094rem solid ${colors.secondary};
  padding: 0 0;
  margin: 0 2rem;
`;
