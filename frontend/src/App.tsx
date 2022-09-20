import React, { StrictMode, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import useMeasure from 'react-use-measure';

import { Header } from './components';
import { AccountPage, BlockPage, DeployPage, Home, Peers } from './pages';
import {
  updateBounds,
  useAppDispatch,
  refreshBlocks,
  useAppSelector,
  getLatestBlockHeight,
  refreshBlockTimes,
} from './store';

const REFRESH_INTERVAL = 1000 * 30;

const App = () => {
  const [ref, bounds] = useMeasure();

  const dispatch = useAppDispatch();
  const latestBlockHeight = useAppSelector(getLatestBlockHeight);

  useEffect(() => {
    dispatch(updateBounds(bounds));

    const refreshAppData = () => {
      dispatch(refreshBlockTimes());

      // will not exist until first application load
      if (latestBlockHeight) {
        dispatch(refreshBlocks(latestBlockHeight));
      }
    };

    const interval = setInterval(() => {
      refreshAppData();
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [bounds, dispatch, latestBlockHeight]);

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
