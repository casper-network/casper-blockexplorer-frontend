import React from 'react';
import { useTranslation } from 'react-i18next';
import useAsyncEffect from 'use-async-effect';

import { GradientHeading, PageWrapper, PeerTable } from '../components';

import {
  getPeers,
  getPeerLoadingStatus,
  useAppDispatch,
  useAppSelector,
  Loading,
  fetchPeers,
} from '../store';

export const Peers: React.FC = () => {
  const dispatch = useAppDispatch();

  const { t } = useTranslation();

  const peers = useAppSelector(getPeers);
  const peerLoadingStatus = useAppSelector(getPeerLoadingStatus);

  const isLoading = peerLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (peerLoadingStatus === Loading.Idle) {
      dispatch(fetchPeers());
    }
  }, []);

  return (
    <PageWrapper isLoading={isLoading}>
      <GradientHeading type="h2">{t('connected-peers')}</GradientHeading>
      <PeerTable peers={peers} />
    </PageWrapper>
  );
};
