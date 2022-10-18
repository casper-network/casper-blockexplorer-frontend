import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { breakpoints } from '../../../styled-theme';

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
  }
`;

export const LogoLink = styled(Link)`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-decoration-line: none;

  :hover,
  :focus {
    text-decoration-line: none;
  }

  @media (min-width: ${breakpoints.lg}) {
    width: 2rem;
  }
`;

export const BlueCasperLogo = styled.img`
  width: 90%;

  @media (min-width: ${breakpoints.lg}) {
    width: 100%;
  }
`;

export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 2rem;

  @media (min-width: ${breakpoints.lg}) {
    padding: 8rem 6rem 0rem 0rem;
    width: 100%;
    justify-content: center;
  }
`;

export const HeroHeading = styled.div`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 1;
  padding-right: 1rem;
  max-width: 18rem;
  background: linear-gradient(
    95.02deg,
    #1c1e90 0.62%,
    #693590 48.99%,
    #d81d54 70.51%,
    #d81e54 70.85%,
    #fd6b52 116.85%
  );
  background-size: 100%;
  -webkit-background-clip: text;
  -moz-background-clip: text;
  -webkit-text-fill-color: transparent;
  -moz-text-fill-color: transparent;
  background-color: transparent;

  @media (min-width: ${breakpoints.md}) {
    font-size: 3.5rem;
    line-height: 1;
    padding-right: 0.5rem;
    max-width: 34rem;
  }

  @media (min-width: ${breakpoints.lg}) {
    font-size: 4.3rem;
    line-height: 1;
    max-width: 42rem;
  }
`;
