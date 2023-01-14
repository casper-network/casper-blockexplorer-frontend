import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GradientHeading } from '../../styled';
import { breakpoints, pxToRem } from '../../../styled-theme';

import { BlueBlackLogo, BlueLogo, ExpLogo } from '../../logos';

export const HeaderComponent = styled.header`
  width: 100%;
  background-color: #fff;
`;

export const HeaderComponentsContainer = styled.div<{ isFirstVisit: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  padding: 1.75rem 1.7rem 1.7rem 2.17rem;

  @media (min-width: ${breakpoints.lg}) {
    padding: 3.5rem 7% 1.75rem 7%;
    transform: 3.5rem 5.3rem 1.75rem 5.3rem;
  }
`;

export const LogoLink = styled(Link)<{ isFirstVisit: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  text-decoration-line: none;
  width: 100%;

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${breakpoints.xxs}) {
    width: 9rem;
  }

  @media (min-width: ${breakpoints.lg}) {
    padding: 0;
    width: ${({ isFirstVisit }) => (isFirstVisit ? '15rem' : '9rem')};
  } ;
`;

export const BlueCasperLogo = styled(BlueLogo)`
  width: 20%;
  margin-right: 5px;

  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const BlueBlackCasperLogo = styled(BlueBlackLogo)`
  display: none;
  width: 20%;

  @media (min-width: ${breakpoints.lg}) {
    display: block;
    width: 90%;
  }
`;

export const ExplorerLogo = styled(ExpLogo)`
  display: block;
  width: 80%;
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
