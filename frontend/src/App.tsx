import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { Header, BlockTable, Loader, PeerTable } from './components';
import { AccountPage, BlockPage, DeployPage } from './pages';

import {
  getBlocks,
  getBlockLoadingStatus,
  getPeers,
  getPeerLoadingStatus,
  useAppDispatch,
  useAppSelector,
  Loading,
  fetchBlocks,
  fetchPeers,
} from './store';

const Blocks: React.FC = () => {
  const dispatch = useAppDispatch();

  const blocks = useAppSelector(getBlocks);
  const blockLoadingStatus = useAppSelector(getBlockLoadingStatus);

  const isLoading = blockLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (blockLoadingStatus === Loading.Idle) {
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
  const dispatch = useAppDispatch();

  const peers = useAppSelector(getPeers);
  const peerLoadingStatus = useAppSelector(getPeerLoadingStatus);

  const isLoading = peerLoadingStatus !== Loading.Complete;

  useAsyncEffect(async () => {
    if (peerLoadingStatus === Loading.Idle) {
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
