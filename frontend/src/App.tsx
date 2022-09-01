import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { Block, Peer } from './types';

import Account from './pages/Account';
import Deploy from './pages/Deploy';

import { Header, BlockTable } from './components';

import { getBlocks, getPeers } from './client';
import { Loader } from './components/Loader/Loader';

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
      <div className="px-32">
        <h2>Blocks</h2>
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
      <div>
        <h2>Peers</h2>
        {isLoading ? (
          <Loader />
        ) : (
          <ul>
            {peers.map(peer => (
              <li key={peer.id}>
                <pre>{JSON.stringify(peer)}</pre>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div>
      <div>
        <Blocks />
        <Peers />
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
        <Route path="/account/:id" element={<Account />} />
        <Route path="/deploy/:id" element={<Deploy />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
