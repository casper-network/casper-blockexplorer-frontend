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
    <ConfigurableLogoLink to="/" isMobile={isMobile}>
      <ConfigLogo src={logoUrl} alt="configuration logo" />
    </ConfigurableLogoLink>
  );
};

export const ConfigurableLogoLink = styled(Link)<{ isMobile: boolean }>`
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration-line: none;
  contain: content;
  min-width: ${pxToRem(200)};
  max-height: ${({ isMobile }) =>
    isMobile ? `${pxToRem(55)}` : `${pxToRem(45)}`};
  max-width: ${({ isMobile }) =>
    isMobile ? 'fit-content' : `${pxToRem(200)}`};
  padding-top: ${({ isMobile }) => (isMobile ? `${pxToRem(7)}` : '0')};

  :hover,
  :focus {
    text-decoration-line: none;
  }
`;

export const ConfigLogo = styled.img`
  width: 100%;
`;
