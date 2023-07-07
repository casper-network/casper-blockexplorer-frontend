import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageWrapper, PageHead, BlocksTable } from 'src/components';
import { PageTableHeader } from '../components/layout/Header/Header.styled';

export const Blocks: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = `${t('blocks')}`;

  return (
    <PageWrapper>
      <PageHead pageTitle={pageTitle} />
      <PageTableHeader>{t('blocks')}</PageTableHeader>
      <BlocksTable />
    </PageWrapper>
  );
};
