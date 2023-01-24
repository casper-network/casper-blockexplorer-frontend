import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePeers } from 'src/hooks';
import {
  GradientHeading,
  PageHead,
  PageWrapper,
  PeerTable,
} from '../components';

export const Peers: React.FC = () => {
  const { t } = useTranslation();

  const { data: peers, isLoading } = usePeers();

  const pageTitle = `${t('peers')}`;

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('connected-peers')}</GradientHeading>
      {peers && <PeerTable peers={peers} />}
    </PageWrapper>
  );
};
