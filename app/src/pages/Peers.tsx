import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  GradientHeading,
  PageHead,
  PageWrapper,
  PeersTable,
} from '../components';

export const Peers: React.FC = () => {
  const { t } = useTranslation();

  const pageTitle = `${t('peers')}`;

  return (
    <PageWrapper isLoading={false}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('connected-peers')}</GradientHeading>
      <PeersTable />
    </PageWrapper>
  );
};
