import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  fetchPeers,
  getPeerLoadingStatus,
  getPeers,
  getPeersTableOptions,
  Loading,
  useAppDispatch,
  useAppSelector,
} from 'src/store';
import {
  GradientHeading,
  PageHead,
  PageWrapper,
  PeersTable,
} from '../components';

export const Peers: React.FC = () => {
  const [isTableLoading, setIsTableLoading] = useState(false);

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  const peers = useAppSelector(getPeers);
  const peersTableOptions = useAppSelector(getPeersTableOptions);
  const peersLoadingStatus = useAppSelector(getPeerLoadingStatus);

  useEffect(() => {
    dispatch(fetchPeers(peersTableOptions));
  }, [dispatch, peersTableOptions]);

  useEffect(() => {
    if (isTableLoading) {
      setIsTableLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [peers]);

  const isLoading = peersLoadingStatus !== Loading.Complete && !peers.length;

  const pageTitle = `${t('peers')}`;

  return (
    <PageWrapper isLoading={isLoading}>
      <PageHead pageTitle={pageTitle} />
      <GradientHeading type="h2">{t('connected-peers')}</GradientHeading>
      {peers && (
        <PeersTable
          peers={peers}
          isTableLoading={isTableLoading}
          setIsTableLoading={setIsTableLoading}
        />
      )}
    </PageWrapper>
  );
};
