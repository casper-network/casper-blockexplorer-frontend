import React from 'react';
import styled from '@emotion/styled';

import { Link } from 'react-router-dom';
import { defaultTheme, pxToRem } from 'casper-ui-kit';

interface ConfigurableLogoProps {
  readonly logoSize: number;
  readonly logoUrl: string;
}

export const ConfigurableLogo: React.FC<ConfigurableLogoProps> = ({
  logoSize,
  logoUrl,
}) => {
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

  @media (min-width: ${defaultTheme.breakpoints.lg}) {
    padding: ${pxToRem(15)} 0;
    max-width: ${pxToRem(345)};
  }
`;

export const ConfigLogo = styled.img`
  width: 100%;
`;
