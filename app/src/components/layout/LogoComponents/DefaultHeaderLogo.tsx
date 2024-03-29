import React from 'react';
import styled from '@emotion/styled';
import { defaultTheme, Logo, pxToRem } from 'casper-ui-kit';
import { Link } from 'react-router-dom';
import { useTheme } from '@emotion/react';
import {
  RedBlackLogo,
  CasperExplorerLogoLight,
  CasperExplorerLogoDark,
} from '../../logos';

export const DefaultHeaderLogo: React.FC = () => {
  const { type: themeType } = useTheme();

  return (
    <LogoContainer>
      <LogoLink to="/" aria-label="home">
        {themeType === 'light' ? (
          <CasperExplorerLogoLight />
        ) : (
          <CasperExplorerLogoDark />
        )}
      </LogoLink>
    </LogoContainer>
  );
};

export const LogoContainer = styled.div`
  width: ${pxToRem(188)};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  text-decoration-line: none;

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
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
  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    display: block;
    min-width: ${pxToRem(124)};
  }
`;

export const RedBlackCasperLogo = styled(RedBlackLogo)`
  display: none;

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    display: block;
    width: 100%;
  }
`;

export const BlueCasperLogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: ${pxToRem(2)};
`;

export const BlueCasperLogo = styled(Logo)`
  width: 100%;
  margin: 0 auto;

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    display: none;
  }
`;

export const ExplorerLogoWrapper = styled.div`
  padding-top: ${pxToRem(1.75)};
  min-width: ${pxToRem(112)};

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    padding-top: 0;
    width: ${pxToRem(108)};
  }
`;

export const ExplorerLogo = styled(Logo)`
  display: block;
  width: 100%;
`;
