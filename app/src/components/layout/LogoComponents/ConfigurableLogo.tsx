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
    <ConfigurableLogoWrapper
      envWidth={envWidth}
      isMobile={isMobile}
      isFirstVisit={isFirstVisit}>
      <Link to="/">
        <ConfigLogo src={logoUrl} alt="configuration logo" />
      </Link>
    </ConfigurableLogoWrapper>
  );
};

export const ConfigurableLogoWrapper = styled.div<{
  isMobile: boolean;
  isFirstVisit: boolean;
  envWidth: number;
}>`
  /* border: solid 1px hotpink; */

  /* REFACTOR  */

  width: ${({ envWidth }) => envWidth}%;
  min-width: ${({ isFirstVisit, isMobile }) =>
    isFirstVisit || isMobile ? `${pxToRem(200)}` : `${pxToRem(200)}`};
  max-width: ${({ isFirstVisit, isMobile }) =>
    isFirstVisit || isMobile ? `${pxToRem(320)}` : `${pxToRem(500)}`};
  padding: ${({ isMobile }) =>
    isMobile
      ? `${pxToRem(20)} 0 ${pxToRem(20)} ${pxToRem(10)}`
      : `${pxToRem(15)} 0`};
  /* padding:  ${({ isFirstVisit, isMobile }) =>
    isFirstVisit || isMobile ? `${pxToRem(320)}` : `${pxToRem(500)}`}; */

  /* ORIGINAL  */
  /*
  display: flex;
  justify-content: start;
  align-items: center;
  text-decoration-line: none;
   contain: content;
   min-width: ${pxToRem(200)};
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
