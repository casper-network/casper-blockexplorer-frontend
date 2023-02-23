import React from 'react';
import styled from '@emotion/styled';

import { loadConfig } from 'src/utils';
import { Link } from 'react-router-dom';
import { pxToRem } from 'src/styled-theme';
import { useAppWidth } from 'src/hooks';

export const ConfigurableLogo: React.FC = () => {
  const { logoUrl, logoSize } = loadConfig();
  const { isMobile } = useAppWidth();

  console.log(logoSize);

  const envWidth = logoSize > 100 ? 100 : logoSize;

  return (
    <ConfigurableLogoWrapper envWidth={envWidth} isMobile={isMobile}>
      <Link to="/">
        <ConfigLogo src={logoUrl} alt="configuration logo" />
      </Link>
    </ConfigurableLogoWrapper>
  );
};

export const ConfigurableLogoWrapper = styled.div<{
  isMobile: boolean;
  envWidth: number;
}>`
  /* border: solid 1px hotpink; */

  /* EXPERIMENTS  */

  width: ${({ envWidth }) => envWidth}%;
  max-width: ${({ isMobile }) =>
    isMobile ? `${pxToRem(350)}` : `${pxToRem(500)}`};

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
