import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import { breakpoints, pxToRem } from 'src/styled-theme';
import { BlueLogo, RedBlackLogo, ExpLogo } from '../../logos';

interface DefaultHeaderProps {
  isMobile: boolean;
}

export const DefaultHeaderLogo: React.FC<DefaultHeaderProps> = ({
  isMobile,
}) => (
  <LogoContainer>
    <LogoLink to="/">
      <RedBlackCasperLogoWrapper>
        <RedBlackCasperLogo />
      </RedBlackCasperLogoWrapper>
      <BlueCasperLogoWrapper>
        <BlueCasperLogo />
      </BlueCasperLogoWrapper>
      <ExplorerLogoWrapper isMobile={isMobile}>
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
    max-width: ${pxToRem(124)};
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

export const ExplorerLogoWrapper = styled.div<{ isMobile: boolean }>`
  padding-top: ${({ isMobile }) => (isMobile ? `${pxToRem(1.75)}` : 0)};
  min-width: ${({ isMobile }) =>
    isMobile ? `${pxToRem(112)}` : `${pxToRem(108)}`};
  max-width: ${({ isMobile }) =>
    isMobile ? `${pxToRem(112)}` : `${pxToRem(108)}`};
`;

export const ExplorerLogo = styled(ExpLogo)`
  display: block;
  width: 100%;
`;
