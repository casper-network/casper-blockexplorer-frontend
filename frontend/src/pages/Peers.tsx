import React from 'react';
import { useTranslation } from 'react-i18next';
import { usePeers } from 'src/hooks';
import { GradientHeading, PageWrapper, PeerTable } from '../components';

export const Peers: React.FC = () => {
  const { t } = useTranslation();

  const { data: peers, isLoading } = usePeers();

  return (
    <PageWrapper isLoading={isLoading}>
      <GradientHeading type="h2">{t('connected-peers')}</GradientHeading>
      {peers && <PeerTable peers={peers} />}
    </PageWrapper>
  );
};
