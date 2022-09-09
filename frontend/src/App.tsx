import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { Block, Peer } from './types';

import { Header, BlockTable, Loader, PeerTable } from './components';
import { AccountPage, BlockPage, DeployPage } from './pages';

import { getBlocks, getPeers } from './client';

const Blocks: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useAsyncEffect(async () => {
    const rawBlocks = await getBlocks();
    setBlocks(rawBlocks);
    setIsLoading(false);
  }, []);

  return (
    <div>
      <div className="px-20 bg-light-grey py-20">
        <h2 className="pt-10 pb-30 pl-20">Blocks</h2>
        {isLoading ? <Loader /> : <BlockTable blocks={blocks} />}
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
      <div className="px-20 bg-light-grey py-20">
        <h2 className="pt-10 pb-30 pl-20">Connected Peers</h2>
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
  );
};

export default App;
