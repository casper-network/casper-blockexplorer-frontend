import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import { pxToRem } from 'src/styled-theme';
import { BlueLogo, ExpLogo } from '../../logos';

export const DefaultNavLogo: React.FC = () => (
  <NavLogoLink to="/">
    <BlueLogo />
    <ExplorerLogo />
  </NavLogoLink>
);

export const NavLogoLink = styled(Link)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-decoration-line: none;
  min-width: ${pxToRem(140)};
  max-width: ${pxToRem(140)};

  /* Firefox Version 110.0b3 (Versions 69+) */
  @supports selector(:-moz-is-html) {
    min-width: ${pxToRem(120)};
    max-width: ${pxToRem(120)};
  }

  :hover,
  :focus {
    text-decoration-line: none;
  }
`;

export const ExplorerLogo = styled(ExpLogo)`
  display: block;
  width: 100%;
`;
