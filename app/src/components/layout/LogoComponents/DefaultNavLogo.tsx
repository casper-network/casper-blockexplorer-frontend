import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import { pxToRem } from 'src/styled-theme';
import { BlueLogo, ExpLogo } from '../../logos';

export const DefaultNavLogo: React.FC = () => {
  return (
    <DefaultNavLogoContainer>
      <NavLogoLink to="/">
        <BlueLogo />
        <ExplorerLogo />
      </NavLogoLink>
    </DefaultNavLogoContainer>
    // <NavLogoWrapper to="/">
    //   <BlueLogo />
    //   <ExplorerLogo />
    // </NavLogoWrapper>
  );
};

const NavLogoLink = styled(Link)`
  /* border: solid 5px hotpink; */
  display: flex;
  min-width: ${pxToRem(140)};
  max-width: ${pxToRem(140)};
`;

// ORIGINAL
export const DefaultNavLogoContainer = styled.div`
  /* border: solid 5px hotpink; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  text-decoration-line: none;
  min-width: ${pxToRem(140)};
  max-width: ${pxToRem(140)};
  padding: ${pxToRem(40)} 0;
  margin-left: ${pxToRem(20)};

  /* Firefox Version 110.0b3 (Versions 69+) */
  @supports selector(:-moz-is-html) {
    min-width: ${pxToRem(137)};
    max-width: ${pxToRem(137)};
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
