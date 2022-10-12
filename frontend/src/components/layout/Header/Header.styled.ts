import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { GradientHeading } from '../../styled';

export const HeaderComponent = styled.header`
  width: 100%;
  background-color: #fff;
`;

export const HeaderComponentsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  max-width: 112.5rem;
  padding: 1.75rem 1.7rem 1.75rem 2.17rem;

  @media (min-width: 1024px) {
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

  @media (min-width: 1024px) {
    width: 2rem;
  }
`;

export const BlueCasperLogo = styled.img`
  width: 90%;

  @media (min-width: 1024px) {
    width: 100%;
  }
`;

export const Nav = styled.nav`
  @media (min-width: 1024px) {
    width: 42%;
    max-width: 29.7rem;
  }
`;

export const NavComponentsContainer = styled.div`
  display: flex;
`;

export const NavButtonContainer = styled.div`
  z-index: 30;
`;

export const NavButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin: 0 auto;
  padding: 0;
  width: 90%;
  border-style: none;

  @media (min-width: 1024px) {
    display: none;
  }
`;

export const NavItemsContainer = styled.div`
  width: 100%;
`;

export const MobileNav = styled.nav`
  @media (min-width: 1024px) {
    display: none;
  }
`;

export const MobileNavItemsContainer = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  align-items: center;
  gap: 1.25rem;
  z-index: 10;
  background-color: #0325d1;
  position: absolute;
  left: 0;
  top: 0;
`;

export const MobileNavItemLink = styled(Link)`
  color: white;
  font-size: 1.375rem;
  padding: 0.3125rem;
  width: 100%;
  font-weight: 500;
  letter-spacing: 0.025em;
  :hover {
    transition: color ease-in 200ms;
    color: #d51e4a;
    transition-property: color;
    text-decoration: none;
  }
`;

export const DesktopNav = styled.nav`
  display: none;

  @media (min-width: 1024px) {
    display: flex;
  }
`;

export const DesktopNavItemsContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const DesktopNavItemLink = styled(Link)`
  color: #0325d1;
  font-size: clamp(0.9rem, 1.2vw, 1.4rem);
  font-weight: 500;
  text-decoration: none;
  width: 100%;
  :hover,
  :focus {
    background-color: #0325d1;
    transition: ease-in;
    background-image: linear-gradient(
      90deg,
      #1c1e90,
      #693590,
      #d81d54,
      #d81e54,
      #fd6b52
    );
    background-size: 100%;
    -webkit-background-clip: text;
    -moz-background-clip: text;
    -webkit-text-fill-color: transparent;
    -moz-text-fill-color: transparent;
    text-decoration: none;
  }
`;

export const HeroContainer = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 0.25rem;

  @media (min-width: 1024px) {
    padding: 8rem 6rem 0rem 0rem;
    width: 100%;
    justify-content: center;
  }
`;

export const HeroHeading = styled(GradientHeading)`
  font-size: 2.8rem;
  font-weight: 700;
  line-height: 2.57rem;
  padding-right: 1rem;
  max-width: 18rem;

  @media (min-width: 768px) {
    font-size: 3.5rem;
    line-height: 3.5rem;
    padding-right: 0.5rem;
    max-width: 34rem;
  }

  @media (min-width: 1024px) {
    font-size: 4.3rem;
    line-height: 4.3rem;
    max-width: 42rem;
  }
`;
