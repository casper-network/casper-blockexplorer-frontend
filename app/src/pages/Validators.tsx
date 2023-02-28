import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  GradientHeading,
  PageHead,
  PageWrapper,
  ValidatorTable,
} from '../components';

export const Validators: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = `${t('validators')}`;

  return (
    <PageWrapper isLoading={false}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('active-validators')}</GradientHeading>
      <ValidatorTable
      // validators={validators}
      // isTableLoading={isTableLoading || isPageLoading}
      // setIsTableLoading={setIsTableLoading}
      />
    </PageWrapper>
  );
};
