import React from 'react';
import styled from '@emotion/styled';

import { useTranslation } from 'react-i18next';
import {
  IconH2Container,
  H2,
  PageLink,
  H3,
  H3Data,
  DataContext,
} from '../HomeComponents.styled';
import { breakpoints, colors } from '../../../../styled-theme';
import { DeploysIcon } from '../../../icons';

export const DeploysInfo: React.FC = () => {
  const { t } = useTranslation();

  return (
    <DeploysInfoDisplay>
      <DeploysHeader>
        <IconH2Container>
          <DeploysIcon />
          <H2>{t('deploys')}</H2>
        </IconH2Container>
        <PageLink to="/deploys">{t('view-all')}</PageLink>
      </DeploysHeader>
      <DeployDetails>
        <H3>{t('total-deploys')}</H3>
        <H3Data>{t('n/a')}</H3Data>
        <DataContext>{t('n/a')}</DataContext>
        <H3>{t('today')}</H3>
        <H3Data>{t('n/a')}</H3Data>
      </DeployDetails>
    </DeploysInfoDisplay>
  );
};

const DeploysInfoDisplay = styled.section`
  display: none;
  border-radius: 0.5rem;
  background: ${colors.white};
  border: 0.063rem solid ${colors.mediumSupporting};
  box-shadow: 0px 2px 7px ${colors.boxShadow};
  padding-bottom: 1.5rem;

  @media (min-width: ${breakpoints.md}) {
    min-width: 44.5%;
  }

  @media (min-width: ${breakpoints.lg}) {
    min-width: 40%;
  }
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
  border-top: 0.094rem solid ${colors.secondary};
  padding: 0 0;
  margin: 0 2rem;
`;
