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
  <LogoContainer isMobile={isMobile}>
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

  // ORIGINAL
  // <LogoLink to="/">
  //   <LogoContainer>
  //     <RedBlackCasperLogoWrapper>
  //       <RedBlackCasperLogo />
  //     </RedBlackCasperLogoWrapper>
  //     <BlueCasperLogoWrapper>
  //       <BlueCasperLogo />
  //     </BlueCasperLogoWrapper>
  //     <ExplorerLogoWrapper isMobile={isMobile}>
  //       <ExplorerLogo />
  //     </ExplorerLogoWrapper>
  //   </LogoContainer>
  // </LogoLink>
);

export const LogoContainer = styled.div<{ isMobile: boolean }>`
  /* border: solid 5px red; */

  /* safari adj */
  width: ${pxToRem(188)};

  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration-line: none;

  padding: ${({ isMobile }) =>
    isMobile
      ? `${pxToRem(30)} ${pxToRem(23)}`
      : `${pxToRem(30)} ${pxToRem(0)}`};

  /* ORIGINAL */
  /* display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration-line: none;
  min-width: ${pxToRem(140)};
  max-width: ${pxToRem(140)}; */
  /* padding-top: ${pxToRem(4)}; */

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${breakpoints.lg}) {
    /* padding: 0; */
    /* max-width: ${pxToRem(240)}; */
  } ;
`;

export const LogoLink = styled(Link)`
  /* border: solid 5px orange; */
  display: flex;
  /* justify-content: flex-start; */
  align-items: center;
  text-decoration-line: none;
  margin: 0;
  padding: 0;

  // ORIGINAL
  /* border: solid 5px hotpink;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration-line: none;
  margin: 0;
  padding: ${pxToRem(30)} ${pxToRem(20)}; */
`;

export const RedBlackCasperLogoWrapper = styled.div`
  /* border: 1px green solid; */
  display: none;
  @media (min-width: ${breakpoints.lg}) {
    display: block;
    min-width: ${pxToRem(124)};
    max-width: ${pxToRem(124)};

    /* Firefox Version 110.0b3 (Versions 69+) */
    @supports selector(:-moz-is-html) {
      /* min-width: ${pxToRem(137)};
      max-width: ${pxToRem(137)}; */
    }
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
  /* border: 1px pink solid; */
  display: flex;
  flex-direction: row;
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
  /* border: 1px red solid; */

  padding-top: ${({ isMobile }) => (isMobile ? `${pxToRem(1.75)}` : 0)};
  min-width: ${({ isMobile }) =>
    isMobile ? `${pxToRem(112)}` : `${pxToRem(108)}`};
  max-width: ${({ isMobile }) =>
    isMobile ? `${pxToRem(112)}` : `${pxToRem(108)}`};

  /* Firefox Version 110.0b3 (Versions 69+) */
  /* @supports selector(:-moz-is-html) { */
  /* min-width: ${pxToRem(110)};
    max-width: ${pxToRem(110)}; */
  /* } */
`;

export const ExplorerLogo = styled(ExpLogo)`
  display: block;
  width: 100%;
`;
