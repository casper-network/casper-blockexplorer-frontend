import styled from '@emotion/styled';
import { defaultTheme } from 'casper-ui-kit';

export const HideOnMobile = styled.div`
  display: none;

  @media only screen and (min-width: ${defaultTheme.breakpoints.lg}) {
    display: block;
  }
`;

export const HideOnDesktop = styled.div`
  display: block;

  @media only screen and (min-width: ${defaultTheme.breakpoints.lg}) {
    display: none;
  }
`;
