import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import { breakpoints, pxToRem } from 'src/styled-theme';
import { BlueLogo, RedBlackLogo, ExpLogo } from '../../logos';

export const DefaultHeaderLogo: React.FC = () => (
  <LogoContainer>
    <LogoLink to="/">
      <RedBlackCasperLogoWrapper>
        <RedBlackCasperLogo />
      </RedBlackCasperLogoWrapper>
      <BlueCasperLogoWrapper>
        <BlueCasperLogo />
      </BlueCasperLogoWrapper>
      <ExplorerLogoWrapper>
        <ExplorerLogo />
      </ExplorerLogoWrapper>
    </LogoLink>
  </LogoContainer>
);

export const LogoContainer = styled.div`
  width: ${pxToRem(188)};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration-line: none;
  padding: ${pxToRem(30)} ${pxToRem(23)};

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: ${pxToRem(30)} ${pxToRem(0)};
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration-line: none;
  margin: 0;
  padding: 0;
`;

export const RedBlackCasperLogoWrapper = styled.div`
  display: none;
  @media (min-width: ${breakpoints.lg}) {
    display: block;
    min-width: ${pxToRem(124)};
  }
`;

export const RedBlackCasperLogo = styled(RedBlackLogo)`
  display: none;

  @media (min-width: ${breakpoints.lg}) {
    display: block;
    width: 100%;
  }
`;

export const BlueCasperLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: ${pxToRem(2)};
`;

export const BlueCasperLogo = styled(BlueLogo)`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const ExplorerLogoWrapper = styled.div`
  padding-top: ${pxToRem(1.75)};
  min-width: ${pxToRem(112)};

  @media (min-width: ${breakpoints.lg}) {
    padding-top: 0;
    width: ${pxToRem(108)};
  }
`;

export const ExplorerLogo = styled(ExpLogo)`
  display: block;
  width: 100%;
`;
