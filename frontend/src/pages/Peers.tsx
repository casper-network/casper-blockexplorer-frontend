import React from 'react';
import useAsyncEffect from 'use-async-effect';

import { Loader, PeerTable } from '../components';

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

  const peers = useAppSelector(getPeers);
  const peerLoadingStatus = useAppSelector(getPeerLoadingStatus);

  const isLoading = peerLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (Loading.Idle === peerLoadingStatus) {
      dispatch(fetchPeers());
    }
  }, []);

  return (
    <div>
      <div className="px-20 py-20">
        <h2 className="text-24 mb-25">Connected Peers</h2>
        {isLoading ? <Loader /> : <PeerTable peers={peers} />}
      </div>
    </div>
  );
};
