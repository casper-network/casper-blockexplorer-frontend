import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';

import { Logo, pxToRem } from 'casper-ui-kit';

export const DefaultNavLogo: React.FC = () => {
  return (
    <DefaultNavLogoContainer>
      <NavLogoLink to="/">
        <Logo title="Blue Casper Logo" logo="BlueCasperLogo" />
        <ExplorerLogo
          logo="BlockExplorerGradientLogo"
          title="Block Explorer Gradient Logo"
        />
      </NavLogoLink>
    </DefaultNavLogoContainer>
  );
};

const NavLogoLink = styled(Link)`
  display: flex;
  width: ${pxToRem(140)};
`;

export const DefaultNavLogoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-decoration-line: none;
  width: ${pxToRem(140)};
  padding: ${pxToRem(40)} 0;
  margin-left: ${pxToRem(20)};

  /* Firefox Version 110.0b3 (Versions 69+) */
  @supports selector(:-moz-is-html) {
    width: ${pxToRem(137)};
  }

  :hover,
  :focus {
    text-decoration-line: none;
  }
`;

export const ExplorerLogo = styled(Logo)`
  display: block;
  width: 100%;
`;
