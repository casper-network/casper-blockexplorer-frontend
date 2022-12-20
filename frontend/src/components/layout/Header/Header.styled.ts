import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GradientHeading } from '../../styled';
import { breakpoints, fontWeight, pxToRem } from '../../../styled-theme';

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

export const LogoLink = styled(Link)`
  padding-top: ${pxToRem(3)};
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration-line: none;

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: 1200px) {
    width: 2rem;
  }
`;

export const MinimizedHeaderLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration-line: none;
  padding-top: ${pxToRem(85)};
  position: relative;
  width: 7.5rem;

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${breakpoints.xxs}) {
    padding-top: 0;
  }
`;

export const BlueCasperLogo = styled.img`
  width: 90%;

  @media (min-width: ${breakpoints.lg}) {
    width: 100%;
  }
`;

export const LogoText = styled.span`
  font-family: lausanne;
  font-size: ${pxToRem(26)};
  font-weight: ${fontWeight.medium};
  letter-spacing: ${pxToRem(-1)};
  padding-top: ${pxToRem(6)};
  position: absolute;
  left: ${pxToRem(119)};
  white-space: nowrap;
  background-image: linear-gradient(
    90deg,
    #1c1e90,
    #693590,
    #d81d54,
    #d81e54,
    #fd6b52
  );
  background-size: 100%;
  background-clip: text;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
`;

export const HeroContainer = styled.div<{ isFirstVisit: boolean }>`
  display: flex;
  justify-content: center;
  padding-top: 2rem;

  ${({ isFirstVisit }) =>
    isFirstVisit
      ? `@media (min-width: ${breakpoints.lg}) {
    padding: 1.3rem 6rem 0rem 0rem;
    width: 100%;
    justify-content: center;
  }`
      : `@media (min-width: ${breakpoints.lg}) {
    padding: 8rem 6rem 0rem 0rem;
    width: 100%;
    justify-content: center;
  }`}
`;

export const HeroHeading = styled(GradientHeading)<{ isFirstVisit: boolean }>`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1;
  padding-right: 1rem;
  max-width: 18rem;

  @media (min-width: ${breakpoints.md}) {
    font-size: 3.5rem;
    line-height: 1;
    padding-right: 0.5rem;
    max-width: 34rem;
    background-size: 100%;
  }

  ${({ isFirstVisit }) =>
    isFirstVisit
      ? ` @media (min-width: ${breakpoints.lg}) {
    font-size: 3.2rem;
    line-height: 1;
    max-width: 42.5rem;
    padding-right: 12rem;
    background-size: 71%;
  }`
      : ` @media (min-width: ${breakpoints.lg}) {
    font-size: 4.3rem;
    line-height: 1;
    max-width: 42rem;
  }`}
`;
