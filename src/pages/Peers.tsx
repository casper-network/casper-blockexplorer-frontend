import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchPeers,
  getPeerLoadingStatus,
  getPeers,
  Loading,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import {
  GradientHeading,
  PageHead,
  PageWrapper,
  PeerTable,
} from '../components';

export const Peers: React.FC = () => {
  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPeers());
  }, [dispatch]);

  const peers = useAppSelector(getPeers);
  const peersLoadingStatus = useAppSelector(getPeerLoadingStatus);

  const isLoading = peersLoadingStatus !== Loading.Complete;

  const pageTitle = `${t('peers')}`;

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('connected-peers')}</GradientHeading>
      {peers && <PeerTable peers={peers} />}
    </PageWrapper>
  );
};
