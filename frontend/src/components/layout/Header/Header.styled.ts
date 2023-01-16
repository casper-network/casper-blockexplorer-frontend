import styled from '@emotion/styled';
import { GradientHeading } from '../../styled';
import { breakpoints, pxToRem } from '../../../styled-theme';

export const HeaderComponent = styled.header`
  width: 100%;
  background-color: #fff;
`;

export const HeaderComponentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 1.75rem 1.7rem 0rem 2.17rem;

  @media (min-width: ${breakpoints.lg}) {
    justify-content: space-between;
    padding: 3.5rem 7% 1.75rem 7%;
    transform: 3.5rem 5.3rem 1.75rem 5.3rem;
  }
`;

export const HeroContainer = styled.div<{ isFirstVisit: boolean }>`
  display: ${({ isFirstVisit }) => (isFirstVisit ? 'flex' : 'none')};
  justify-content: center;
  padding-top: 2rem;

  @media (min-width: ${breakpoints.lg}) {
    justify-content: start;
    width: 64.5%;
    max-width: ${pxToRem(792)};
    margin: 0 auto;
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
    padding-right: 3rem;
    max-width: 34rem;
    background-size: 100%;
  }

  @media (min-width: ${breakpoints.lg}) {
    font-size: 3.2rem;
    line-height: 1;
    text-align: left;
    max-width: 42.5rem;
    padding-right: 11rem;
    background-size: 71%;
  }
`;
