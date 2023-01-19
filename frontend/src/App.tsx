import React, { StrictMode, useEffect } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import useMeasure from 'react-use-measure';

import { Footer, Header } from './components';
import './i18n';

import {
  AccountPage,
  BlockPage,
  Blocks,
  DeployPage,
  Home,
  Peers,
} from './pages';
import {
  updateBounds,
  useAppDispatch,
  fetchStatus,
  setIsFirstVisit,
  appTitle,
  useAppSelector,
  appFavicon,
} from './store';
import { useAppRefresh } from './hooks';

const App = () => {
  const [ref, bounds] = useMeasure();

  const dispatch = useAppDispatch();

  useAppRefresh();

  useEffect(() => {
    dispatch(updateBounds(bounds));
  }, [bounds, dispatch]);

  useEffect(() => {
    dispatch(fetchStatus());
  }, [dispatch]);

  const usersVisitationStatus = localStorage.getItem('users-status');

  useEffect(() => {
    if (usersVisitationStatus === null) {
      dispatch(setIsFirstVisit(true));
    }
    localStorage.setItem('users-status', JSON.stringify('user-has-visited'));
  }, [usersVisitationStatus, dispatch]);

  const title = useAppSelector(appTitle);
  const favicon = useAppSelector(appFavicon);

  return (
    <StrictMode>
      <React.Suspense fallback="loading...">
        <Helmet>
          {favicon ? (
            <link rel="icon" href={favicon} />
          ) : (
            <>
              <link rel="icon" href="%PUBLIC_URL%/favicon.ico" />
              <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
              />
              <meta name="theme-color" content="#000000" />
              <meta
                name="description"
                content="Casper Labs CSPR Block Explorer"
              />
              <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" />
            </>
          )}
          <title>{title}</title>
        </Helmet>
        <AppWrapper ref={ref}>
          <BrowserRouter>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/peers" element={<Peers />} />
              <Route path="/account/:id" element={<AccountPage />} />
              <Route path="/deploy/:id" element={<DeployPage />} />
              <Route path="/block/:id" element={<BlockPage />} />
              <Route path="/blocks" element={<Blocks />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </AppWrapper>
      </React.Suspense>
    </StrictMode>
  );
};

const AppWrapper = styled.div`
  background-color: white;
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
`;

export default App;
