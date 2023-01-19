import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import { breakpoints, pxToRem } from 'src/styled-theme';
import { BlueLogo, BlueBlackLogo, ExpLogo } from '../../logos';

export const DefaultHeaderLogo: React.FC = () => (
  <LogoLink to="/">
    <BlueBlackCasperLogo />
    <BlueCasperLogo />
    <ExplorerLogo />
  </LogoLink>
);

export const LogoLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration-line: none;
  width: 100%;
  padding-top: ${pxToRem(4)};

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${breakpoints.xxs}) {
    padding-top: ${pxToRem(3)};
    max-width: 16.75rem;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: 0;
  } ;
`;

export const BlueCasperLogo = styled(BlueLogo)`
  width: 10%;
  margin-right: 5px;

  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const BlueBlackCasperLogo = styled(BlueBlackLogo)`
  display: none;
  width: 20%;

  @media (min-width: ${breakpoints.lg}) {
    display: block;
    width: 45%;
  }
`;

export const ExplorerLogo = styled(ExpLogo)`
  display: block;
  padding-top: ${pxToRem(1.75)};
  width: 40%;
`;
