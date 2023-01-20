import React from 'react';
import { Helmet } from 'react-helmet-async';
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
  appFavicon,
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
  const favicon = useAppSelector(appFavicon);

  const peersTitle = `${t('peers')} | ${title}`;

  return (
    <PageWrapper isLoading={isLoading}>
      <Helmet>
        <link rel="icon" href={favicon} />
        <title>{peersTitle}</title>
      </Helmet>
      <GradientHeading type="h2">{t('connected-peers')}</GradientHeading>
      <PeerTable peers={peers} />
    </PageWrapper>
  );
};
