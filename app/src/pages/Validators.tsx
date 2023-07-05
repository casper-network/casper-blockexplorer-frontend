import React from 'react';
import { useTranslation } from 'react-i18next';
import { PageTableHeader } from '../components/layout/Header/Header.styled';
import { PageHead, PageWrapper, ValidatorTable } from '../components';

export const Validators: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = `${t('validators')}`;

  return (
    <PageWrapper>
      <PageHead pageTitle={pageTitle} />
      <PageTableHeader>{t('validators')}</PageTableHeader>
      <ValidatorTable />
    </PageWrapper>
  );
};
