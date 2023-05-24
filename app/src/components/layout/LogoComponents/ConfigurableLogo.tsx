import React from 'react';
import styled from '@emotion/styled';

import { loadConfig } from 'src/utils';
import { Link } from 'react-router-dom';
import { defaultTheme, pxToRem } from 'casper-ui-kit';

export const ConfigurableLogo: React.FC = () => {
  const { logoUrl, logoSize } = loadConfig();

  return (
    <ConfigurableLogoContainer logoSize={logoSize}>
      <Link to="/">
        <ConfigLogo src={logoUrl} alt="configuration logo" />
      </Link>
    </ConfigurableLogoContainer>
  );
};

export const ConfigurableLogoContainer = styled.div<{
  logoSize: number;
}>`
  padding: ${pxToRem(15)} 0;
  width: ${({ logoSize }) => logoSize}%;
  min-width: ${pxToRem(200)};
  max-width: ${pxToRem(345)};
  margin: auto 0;

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    padding: ${pxToRem(15)} 0;
    max-width: ${pxToRem(345)};
  }
`;

export const ConfigLogo = styled.img`
  width: 100%;
`;
