import React from 'react';
import styled from '@emotion/styled';

import { loadConfig } from 'src/utils';
import { Link } from 'react-router-dom';
import { getIsFirstVisit, useAppSelector } from 'src/store';
import { defaultTheme, pxToRem } from 'casper-ui-kit';

export const ConfigurableLogo: React.FC = () => {
  const { logoUrl, logoSize } = loadConfig();
  const isFirstVisit = useAppSelector(getIsFirstVisit);

  return (
    <ConfigurableLogoContainer logoSize={logoSize} isFirstVisit={isFirstVisit}>
      <Link to="/">
        <ConfigLogo src={logoUrl} alt="configuration logo" />
      </Link>
    </ConfigurableLogoContainer>
  );
};

export const ConfigurableLogoContainer = styled.div<{
  isFirstVisit: boolean;
  logoSize: number;
}>`
  width: ${({ logoSize }) => logoSize}%;
  min-width: 0;
  max-width: ${pxToRem(345)};

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    padding: ${pxToRem(15)} 0;
    max-width: ${({ isFirstVisit }) =>
      isFirstVisit ? `${pxToRem(345)}` : `${pxToRem(500)}`};
  }
`;

export const ConfigLogo = styled.img`
  width: 100%;
`;
