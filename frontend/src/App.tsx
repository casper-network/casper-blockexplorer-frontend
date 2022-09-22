import React, { StrictMode, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useMeasure from 'react-use-measure';

import { DemoHeader, Footer } from './components';
import { AccountPage, BlockPage, DeployPage, Home, Peers } from './pages';
import {
  updateBounds,
  useAppDispatch,
  refreshBlocks,
  useAppSelector,
  getLatestBlockHeight,
  refreshBlockTimes,
  updateRefreshTimer,
  getRefreshTimer,
} from './store';

const App = () => {
  const [ref, bounds] = useMeasure();

  const dispatch = useAppDispatch();
  const latestBlockHeight = useAppSelector(getLatestBlockHeight);
  const refreshTimer = useAppSelector(getRefreshTimer);

  const shouldRefreshBlocks = refreshTimer === 0;

  useEffect(() => {
    dispatch(updateBounds(bounds));

    const refreshAppData = () => {
      // latestBlockHeight will not exist until first application load
      if (latestBlockHeight && shouldRefreshBlocks) {
        dispatch(refreshBlockTimes());
        dispatch(refreshBlocks(latestBlockHeight));
      }
    };

    const refreshInterval = setInterval(() => {
      refreshAppData();
      dispatch(updateRefreshTimer());
    }, 1000);

    return () => {
      clearTimeout(refreshInterval);
    };
  }, [bounds, dispatch, latestBlockHeight, shouldRefreshBlocks]);

  return (
    <StrictMode>
      <div
        ref={ref}
        className="bg-light-grey grid min-h-screen grid-rows-layout">
        <BrowserRouter>
          <DemoHeader />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/peers" element={<Peers />} />
            <Route path="/account/:id" element={<AccountPage />} />
            <Route path="/deploy/:id" element={<DeployPage />} />
            <Route path="/block/:id" element={<BlockPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
        <Footer />
      </div>
    </StrictMode>
  );
};

export default App;
