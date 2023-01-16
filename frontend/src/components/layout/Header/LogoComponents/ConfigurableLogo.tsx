import React from 'react';
import styled from '@emotion/styled';

import { loadConfig } from 'src/utils';
import { Link } from 'react-router-dom';
import { breakpoints, pxToRem } from 'src/styled-theme';

export const ConfigurableLogo: React.FC = () => {
  const { logoUrl } = loadConfig();
  return (
    <ConfigurableLogoLink to="/">
      <img src={logoUrl} alt="" />
    </ConfigurableLogoLink>
  );
};

export const ConfigurableLogoLink = styled(Link)`
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
    max-width: 18rem;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: 0;
  } ;
`;
