import React from 'react';
import styled from '@emotion/styled';

import { loadConfig } from 'src/utils';
import { Link } from 'react-router-dom';
import { pxToRem } from 'src/styled-theme';
import { useAppWidth } from 'src/hooks';

export const ConfigurableLogo: React.FC = () => {
  const { logoUrl } = loadConfig();
  const { isMobile } = useAppWidth();

  return (
    <Link to="/">
      <ConfigurableLogoLink isMobile={isMobile}>
        <ConfigLogo src={logoUrl} alt="configuration logo" />
      </ConfigurableLogoLink>
    </Link>
  );
};

export const ConfigurableLogoLink = styled.div<{ isMobile: boolean }>`
  border: solid 5px hotpink;
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration-line: none;
  contain: content;

  /* EXPERIMENTS  */

  width: 100%;
  min-width: ${({ isMobile }) =>
    // these pix values are the target
    isMobile ? `${pxToRem(320)}` : `${pxToRem(320)}`};
  max-width: ${({ isMobile }) =>
    isMobile ? `${pxToRem(100)}` : `${pxToRem(100)}`};

  /* ORIGINAL  */

  /* min-width: ${pxToRem(200)};
  max-height: ${({ isMobile }) =>
    isMobile ? `${pxToRem(55)}` : `${pxToRem(45)}`};
  max-width: ${({ isMobile }) =>
    isMobile ? `${pxToRem(250)}` : `${pxToRem(200)}`};
  padding-top: ${({ isMobile }) => (isMobile ? `${pxToRem(7)}` : '0')}; */

  :hover,
  :focus {
    text-decoration-line: none;
  }
`;

export const ConfigLogo = styled.img`
  width: 100%;
`;
