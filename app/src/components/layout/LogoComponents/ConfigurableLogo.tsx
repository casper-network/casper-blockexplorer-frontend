import React from 'react';
import styled from '@emotion/styled';

import { loadConfig } from 'src/utils';
import { Link } from 'react-router-dom';
import { pxToRem } from 'src/styled-theme';
import { useAppWidth } from 'src/hooks';
import { getIsFirstVisit, useAppSelector } from 'src/store';

export const ConfigurableLogo: React.FC = () => {
  const { logoUrl, logoSize } = loadConfig();
  const { isMobile } = useAppWidth();
  const isFirstVisit = useAppSelector(getIsFirstVisit);

  const envWidth = logoSize > 100 ? 100 : logoSize;

  return (
    <ConfigurableLogoContainer
      envWidth={envWidth}
      isMobile={isMobile}
      isFirstVisit={isFirstVisit}>
      <Link to="/">
        <ConfigLogo src={logoUrl} alt="configuration logo" />
      </Link>
    </ConfigurableLogoContainer>
  );
};

export const ConfigurableLogoContainer = styled.div<{
  isMobile: boolean;
  isFirstVisit: boolean;
  envWidth: number;
}>`
  width: ${({ envWidth }) => envWidth}%;
  min-width: ${({ isFirstVisit, isMobile }) =>
    isFirstVisit || isMobile ? `${pxToRem(0)}` : `${pxToRem(0)}`};
  max-width: ${({ isFirstVisit, isMobile }) =>
    isFirstVisit || isMobile ? `${pxToRem(345)}` : `${pxToRem(500)}`};
  padding: ${({ isMobile }) =>
    isMobile
      ? `${pxToRem(20)} 0 ${pxToRem(20)} ${pxToRem(10)}`
      : `${pxToRem(15)} 0`};

  :hover,
  :focus {
    text-decoration-line: none;
  }
`;

export const ConfigLogo = styled.img`
  width: 100%;
`;
