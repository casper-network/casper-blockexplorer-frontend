import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTableHeader } from '../components/layout/Header/Header.styled';
import { PageHead, PageWrapper, PeersTable } from '../components';

export const Peers: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = `${t('peers')}`;

  return (
    <PageWrapper>
      <PageHead pageTitle={pageTitle} />
      <PageTableHeader>{t('connected-peers')}</PageTableHeader>
      <PeersTable />
    </PageWrapper>
  );
};
