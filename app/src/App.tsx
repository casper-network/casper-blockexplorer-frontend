import React, { StrictMode, useEffect, useState } from 'react';
import styled from '@emotion/styled';

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import useMeasure from 'react-use-measure';
import { ThemeProvider } from '@emotion/react';

import './i18n';
import { Footer, Header, ThemeToggler } from './components';
import {
  AccountPage,
  BlockPage,
  Blocks,
  DeployPage,
  Home,
  Peers,
  Validators,
} from './pages';
import {
  updateBounds,
  useAppDispatch,
  setIsFirstVisit,
  useAppSelector,
  appFontUrl,
  getLatestBlock,
  fetchLatestBlock,
} from './store';

import { useAppRefresh } from './hooks';
import { loadConfig, getTimeUntilRefetchBlocks } from './utils';
import { colors } from './styled-theme';
import { darkTheme, lightTheme } from './theme';

const { title, faviconUrl } = loadConfig();

const App = () => {
  const [ref, bounds] = useMeasure();
  const [isLightTheme, setIsLightTheme] = useState(true);

  const dispatch = useAppDispatch();

  const latestBlock = useAppSelector(getLatestBlock);

  const { setTimer } = useAppRefresh();

  useEffect(() => {
    dispatch(updateBounds(bounds));
  }, [bounds, dispatch]);

  useEffect(() => {
    if (!latestBlock) {
      dispatch(fetchLatestBlock());
    } else {
      const timeUntilBlocksRefetch = getTimeUntilRefetchBlocks(
        latestBlock.header.timestamp,
      );

      setTimer(timeUntilBlocksRefetch);
    }
  }, [latestBlock, setTimer, dispatch]);

  const usersVisitationStatus = localStorage.getItem('users-status');

  useEffect(() => {
    if (usersVisitationStatus === null) {
      dispatch(setIsFirstVisit(true));
    }
    localStorage.setItem('users-status', JSON.stringify('user-has-visited'));
  }, [usersVisitationStatus, dispatch]);

  const font = useAppSelector(appFontUrl);

  return (
    <HelmetProvider>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <StrictMode>
          <React.Suspense>
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
            <AppWrapper ref={ref}>
              <BrowserRouter>
                <Header />
                <button
                  onClick={() => setIsLightTheme(prev => !prev)}
                  type="button">
                  toggle theme!!!
                </button>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/peers" element={<Peers />} />
                  <Route path="/validators" element={<Validators />} />
                  <Route path="/account/:id" element={<AccountPage />} />
                  <Route path="/deploy/:id" element={<DeployPage />} />
                  <Route path="/block/:id" element={<BlockPage />} />
                  <Route path="/blocks" element={<Blocks />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer />
                <ThemeToggler
                  isLightTheme={isLightTheme}
                  setIsLightTheme={setIsLightTheme}
                />
              </BrowserRouter>
            </AppWrapper>
          </React.Suspense>
        </StrictMode>
      </ThemeProvider>
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
