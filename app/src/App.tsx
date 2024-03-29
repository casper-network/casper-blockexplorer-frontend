import React, { StrictMode, useEffect, useMemo, useState } from 'react';
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
  Deploys,
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
  getSocket,
  updateLatestBlock,
  initializeSocket,
  updateCurrentEraValidatorsStatus,
  updateTotalPeers,
  updateDeploysWithLatest,
  fetchNetworkStatus,
  getNetworkStatus,
} from './store';

import { loadConfig } from './utils';
import { darkTheme, lightTheme } from './theme';
import { ApiData } from './api/types';

const { title, faviconUrl } = loadConfig();

const App = () => {
  const [ref, bounds] = useMeasure();

  const isLightThemeConfig = useMemo(() => {
    let isLightModeConfig = localStorage.getItem('isLightMode');

    if (isLightModeConfig !== null) {
      isLightModeConfig = JSON.parse(isLightModeConfig) as string;

      if (typeof isLightModeConfig === 'boolean') {
        return isLightModeConfig;
      }
    }

    return true;
  }, []);

  const [isLightTheme, setIsLightTheme] = useState(isLightThemeConfig);

  const dispatch = useAppDispatch();

  const socket = useAppSelector(getSocket);
  const networkStatus = useAppSelector(getNetworkStatus);

  useEffect(() => {
    dispatch(fetchNetworkStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(initializeSocket());
  }, [dispatch]);

  useEffect(() => {
    if (socket) {
      socket.on('latest_block', (latestBlockString: string) => {
        const parsedLatestBlock = JSON.parse(latestBlockString) as {
          latestBlock: ApiData.Block;
        }[];

        const [{ latestBlock }] = parsedLatestBlock;

        dispatch(updateLatestBlock(latestBlock));
      });

      socket.on(
        'current_era_validator_status',
        (currentEraValidatorStatusString: string) => {
          const parsedCurrentEraValidatorStatus = JSON.parse(
            currentEraValidatorStatusString,
          ) as {
            currentEraValidatorStatus: ApiData.CurrentEraValidatorStatus;
          }[];

          const [{ currentEraValidatorStatus }] =
            parsedCurrentEraValidatorStatus;

          dispatch(updateCurrentEraValidatorsStatus(currentEraValidatorStatus));
        },
      );

      socket.on('peers', (peersString: string) => {
        const parsedPeers = JSON.parse(peersString) as {
          peers: { totalPeers: number };
        }[];

        const [
          {
            peers: { totalPeers },
          },
        ] = parsedPeers;

        dispatch(updateTotalPeers(totalPeers));
      });

      socket.on('latest_deploy', (latestDeployString: string) => {
        const parsedLatestDeploy = JSON.parse(latestDeployString) as {
          latestDeploy: ApiData.ProcessedSidecarDeploy;
        }[];

        const [{ latestDeploy }] = parsedLatestDeploy;

        dispatch(updateDeploysWithLatest(latestDeploy));
      });
    }
  }, [socket, dispatch]);

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

  return (
    <HelmetProvider>
      <ThemeProvider theme={isLightTheme ? lightTheme : darkTheme}>
        <StrictMode>
          <React.Suspense>
            <Helmet>
              {faviconUrl ? (
                <link rel="icon" href={faviconUrl} />
              ) : (
                <link rel="icon" href="./favicon.ico" />
              )}

              <link rel="preconnect" href="https://fonts.googleapis.com" />
              <link rel="preconnect" href="https://fonts.gstatic.com" />
              <link href={font} rel="stylesheet" />
              <title>{title}</title>
            </Helmet>
            <AppWrapper ref={ref}>
              <BrowserRouter>
                <Header />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/peers" element={<Peers />} />
                  <Route path="/validators" element={<Validators />} />
                  <Route path="/account/:id" element={<AccountPage />} />
                  <Route path="/deploy/:id" element={<DeployPage />} />
                  <Route path="/block/:id" element={<BlockPage />} />
                  <Route path="/blocks" element={<Blocks />} />
                  <Route path="/deploys" element={<Deploys />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
                <Footer networkStatus={networkStatus} title={title} />
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
  background-color: ${props => props.theme.background.primary};
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr;
`;

export default App;
