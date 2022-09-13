import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { Peer } from './types';

import { Header, BlockTable, Loader, PeerTable } from './components';
import { AccountPage, BlockPage, DeployPage } from './pages';

import { getPeers } from './client';
import {
  getBlocks,
  getBLockLoadingStatus,
  useAppDispatch,
  useAppSelector,
  Loading,
  fetchBlocks,
} from './store';

const Blocks: React.FC = () => {
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const blockLoadingStatus = useAppSelector(getBLockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (Loading.Idle === blockLoadingStatus) {
      dispatch(fetchBlocks());
    }
  }, []);

  return (
    <div>
      <div className="px-20 py-20">
        <h2 className="text-24 mb-25">Blocks</h2>
        {isLoading ? <Loader /> : <BlockTable blocks={blocks} showValidators />}
      </div>
    </div>
  );
};

const Peers = () => {
  const [peers, setPeers] = useState<Peer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  useAsyncEffect(async () => {
    const rawPeers = await getPeers();
    setPeers(rawPeers);
    setIsLoading(false);
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

const Home = () => {
  return (
    <div>
      <div>
        <Blocks />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div className="bg-light-grey grid min-h-screen grid-rows-layout">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/peers" element={<Peers />} />
          <Route path="/account/:id" element={<AccountPage />} />
          <Route path="/deploy/:id" element={<DeployPage />} />
          <Route path="/block/:id" element={<BlockPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
