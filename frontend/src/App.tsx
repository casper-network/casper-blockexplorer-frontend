import React, { StrictMode, useEffect } from 'react';
import styled from '@emotion/styled';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import useMeasure from 'react-use-measure';
import './i18n';

import { Footer, Header } from './components';
import {
  AccountPage,
  BlockPage,
  // Blocks,
  DeployPage,
  Home,
  Peers,
} from './pages';
import {
  updateBounds,
  useAppDispatch,
  setIsFirstVisit,
  useAppSelector,
  appFontUrl,
  appPrimaryFontName,
} from './store';

import { useAppRefresh } from './hooks';
import { loadConfig } from './utils';
import { colors } from './styled-theme';
import { BlocksNew } from './pages/BlocksNew';

const { title, faviconUrl } = loadConfig();

const App = () => {
  const [ref, bounds] = useMeasure();

  const dispatch = useAppDispatch();

  useAppRefresh();

  useEffect(() => {
    dispatch(updateBounds(bounds));
  }, [bounds, dispatch]);

  const usersVisitationStatus = localStorage.getItem('users-status');

  useEffect(() => {
    if (usersVisitationStatus === null) {
      dispatch(setIsFirstVisit(true));
    }
    localStorage.setItem('users-status', JSON.stringify('user-has-visited'));
  }, [usersVisitationStatus, dispatch]);

  const font = useAppSelector(appFontUrl);
  const primaryFontName = useAppSelector(appPrimaryFontName);

  return (
    <HelmetProvider>
      <StrictMode>
        <React.Suspense fallback="loading...">
          <Helmet>
            {faviconUrl ? (
              <link rel="icon" href={faviconUrl} />
            ) : (
              <link rel="icon" href="%PUBLIC_URL%/favicon" />
            )}

            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href={font} rel="stylesheet" />
            <title>{title}</title>
          </Helmet>
          <AppWrapper ref={ref} style={{ fontFamily: primaryFontName }}>
            <BrowserRouter>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/peers" element={<Peers />} />
                <Route path="/account/:id" element={<AccountPage />} />
                <Route path="/deploy/:id" element={<DeployPage />} />
                <Route path="/block/:id" element={<BlockPage />} />
                <Route path="/blocks" element={<BlocksNew />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              <Footer />
            </BrowserRouter>
          </AppWrapper>
        </React.Suspense>
      </StrictMode>
    </HelmetProvider>
  );
};

const AppWrapper = styled.div`
  background-color: ${colors.white};
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
`;

export default App;
