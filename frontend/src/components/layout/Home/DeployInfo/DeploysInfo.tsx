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
import { breakpoints } from '../../../../styled-theme';
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
  border-top: 0.094rem solid #f2f3f5;
  padding: 0 0;
  margin: 0 2rem;
`;
