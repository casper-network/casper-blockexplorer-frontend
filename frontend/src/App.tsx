import React, { StrictMode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Header } from './components';
import { AccountPage, BlockPage, DeployPage, Home, Peers } from './pages';

const App = () => {
  return (
    <StrictMode>
      <div className="bg-light-grey grid min-h-screen grid-rows-layout">
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peers" element={<Peers />} />
            <Route path="/account/:id" element={<AccountPage />} />
            <Route path="/deploy/:id" element={<DeployPage />} />
            <Route path="/block/:id" element={<BlockPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </StrictMode>
  );
};

export default App;
