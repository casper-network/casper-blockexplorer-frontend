import styled from '@emotion/styled';
import { breakpoints } from '../../../styled-theme';

export const HideOnMobile = styled.div`
  display: none;

  @media only screen and (min-width: ${breakpoints.lg}) {
    display: block;
  }
`;

export const HideOnDesktop = styled.div`
  display: block;

  @media only screen and (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;
