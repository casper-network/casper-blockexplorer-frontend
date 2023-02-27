import styled from '@emotion/styled';
import { GradientHeading } from '../../styled';
import { breakpoints, colors, pxToRem } from '../../../styled-theme';

export const HeaderComponent = styled.header`
  width: 100%;
  background-color: ${colors.white};
`;

export const HeaderComponentsContainer = styled.div<{
  isFirstVisit: boolean;
  isMobile: boolean;
}>`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: ${pxToRem(1400)};
  width: 100%;
  margin: 0;
  padding-right: 0.8rem;

  @media (min-width: ${breakpoints.lg}) {
    width: 98%;
    margin: 0 auto;
    padding-right: 0;
  }
`;

export const HeroContainer = styled.div<{ isFirstVisit: boolean }>`
  display: ${({ isFirstVisit }) => (isFirstVisit ? 'flex' : 'none')};
  justify-content: center;
  padding: 0;

  @media (min-width: ${breakpoints.md}) {
    padding-top: 2.5rem;
    justify-content: start;
    width: 64.5%;
    min-width: ${pxToRem(628)};
    max-width: ${pxToRem(792)};
    margin: 0 auto;
  }

  @media (min-width: ${breakpoints.lg}) {
    width: 58%;
  }
`;

export const HeroHeading = styled(GradientHeading)`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1;
  padding-right: 1rem;
  max-width: 18rem;

  @media (min-width: ${breakpoints.md}) {
    font-size: 3.2rem;
    line-height: 1;
    padding-right: 0rem;
    max-width: 31rem;
    background-size: 100%;
  }
`;
