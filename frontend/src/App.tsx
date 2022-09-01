import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import useAsyncEffect from 'use-async-effect';

import { Block, Peer } from './types';

import Account from './pages/Account';
import Deploy from './pages/Deploy';

import { getBlocks, getPeers } from './client';
import Header from './components/Header/Header';

const Blocks = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);

  useAsyncEffect(async () => {
    const blocks = await getBlocks();
    setBlocks(blocks);
  }, []);

  return (
    <div>
      <div className="overflow-hidden">
        <h2>Blocks</h2>
        <ul>
          {blocks.map(block => (
            <li key={block.height}>
              <pre>{JSON.stringify(block)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Peers = () => {
  const [peers, setPeers] = useState<Peer[]>([]);

  useAsyncEffect(async () => {
    const peers = await getPeers();
    setPeers(peers);
  }, []);

  return (
    <div>
      <div>
        <h2>Peers</h2>
        <ul>
          {peers.map(peer => (
            <li key={peer.id}>
              <pre>{JSON.stringify(peer)}</pre>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// const Search = () => {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState('');
//   // TODO: remove this when used
//   // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   const [error, setError] = useState('');

//   const submitValue = async () => {
//     const trimedValue = search.trim();

//     // TODO: Move this magic strings to some consts
//     if (trimedValue.length === 66 || trimedValue.length === 68) {
//       navigate(`/account/${trimedValue}`);
//     } else if (trimedValue.length === 64) {
//       console.log('deploy');
//       navigate(`/deploy/${trimedValue}`);
//     } else {
//       alert('Wrong value');
//     }
//   };

//   return (
//     <div>
//       <Header />
//       <h2>Search</h2>
//       <div>
//         {error}
//         <input
//           value={search}
//           onChange={ev => setSearch(ev.target.value)}
//           placeholder="PublicKey or DeployHash"
//         />
//         <button onClick={submitValue}>Search</button>
//       </div>
//     </div>
//   );
// };

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
