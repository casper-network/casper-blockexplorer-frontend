import { Link } from 'react-router-dom';
import styled from '@emotion/styled';

export const Nav = styled.nav`
  @media (min-width: 1024px) {
    width: 25%;
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
