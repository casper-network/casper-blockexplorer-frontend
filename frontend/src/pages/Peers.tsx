import React from 'react';
import { Helmet } from 'react-helmet';
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
  appTitle,
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

  const title = useAppSelector(appTitle);

  const peersTitle = `${t('peers')} | ${title}`;

  return (
    <PageWrapper isLoading={isLoading}>
      <Helmet>
        <title>{peersTitle}</title>
      </Helmet>
      <GradientHeading type="h2">{t('connected-peers')}</GradientHeading>
      <PeerTable peers={peers} />
    </PageWrapper>
  );
};
