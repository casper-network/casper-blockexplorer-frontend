import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper, PageHead, DeploysTable } from 'src/components';
import { PageTableHeader } from '../components/layout/Header/Header.styled';

export const Deploys: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = `${t('deploys')}`;

  return (
    <PageWrapper isLoading={false}>
      <PageHead pageTitle={pageTitle} />
      <PageTableHeader>{t('deploys')}</PageTableHeader>
      <DeploysTable />
    </PageWrapper>
  );
};
