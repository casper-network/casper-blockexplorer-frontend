import styled from '@emotion/styled';
import { GradientHeading } from '../../styled';
import { breakpoints, colors, pxToRem } from '../../../styled-theme';

export const HeaderComponent = styled.header`
  /* border: solid 5px pink; */
  width: 100%;
  background-color: ${colors.white};
`;

export const HeaderComponentsContainer = styled.div<{
  isFirstVisit: boolean;
  isMobile: boolean;
}>`
  /* border: solid 1px blue; */
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: ${pxToRem(1400)};
  width: ${({ isMobile }) => (isMobile ? '100%' : '98%')};
  margin: ${({ isMobile }) => (isMobile ? '0' : '0 auto')};

  /* REFACTOR */
  /* padding: ${({ isMobile }) => (isMobile ? '0 0.8rem 0 0' : '0 0 0 0')}; */
  padding-right: ${({ isMobile }) => (isMobile ? '0.8rem' : '0')};

  /* ORIGINAL */
  /* padding: 1.75rem 1.7rem 1.7rem 2.17rem; */

  /* @media (min-width: ${breakpoints.lg}) {

    padding: 3.5rem 2rem 1.75rem 2rem;
  } */
`;

export const HeroContainer = styled.div<{ isFirstVisit: boolean }>`
  /* border: solid 5px orange; */
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
