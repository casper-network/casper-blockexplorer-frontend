import React, { StrictMode, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useMeasure from 'react-use-measure';

import { Header } from './components';
import { AccountPage, BlockPage, DeployPage, Home, Peers } from './pages';
import { updateBounds, fetchBlocks, fetchPeers, useAppDispatch } from './store';

// currently two minutes
const REFRESH_INTERVAL = 1000 * 60 * 2;

const App = () => {
  const [ref, bounds] = useMeasure();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(updateBounds(bounds));

    const refreshAppData = () => {
      dispatch(fetchBlocks);
      dispatch(fetchPeers);
    };

    const interval = setInterval(() => {
      refreshAppData();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [bounds, dispatch]);

  return (
    <StrictMode>
      <div
        ref={ref}
        className="bg-light-grey grid min-h-screen grid-rows-layout">
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
