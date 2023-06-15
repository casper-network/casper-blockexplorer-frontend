import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { Button, defaultTheme, pxToRem } from 'casper-ui-kit';

export const Nav = styled.nav<{ isFirstVisit: boolean }>`
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  height: ${pxToRem(136)};

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    width: 100%;
  }
`;

export const LogoSearchFormWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${pxToRem(20)};
  width: 100%;
`;

export const NavComponentsContainer = styled.div`
  display: flex;
`;

export const NavItemsContainer = styled.div`
  display: flex;
  width: 100%;
`;

export const MobileNav = styled.nav`
  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
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
  background-color: ${props => props.theme.border};
  position: fixed;
  left: 0;
  top: 0;
`;

export const MobileNavItemLink = styled(Link)`
  color: ${props => props.theme.text.contrast};
  font-size: 1.375rem;
  padding: 0.3125rem;
  width: 100%;
  font-weight: 500;
  letter-spacing: 0.025em;

  :hover {
    transition: color ease-in 200ms;
    color: ${props => props.theme.text.warning};
    transition-property: color;
    text-decoration: none;
  }
`;

export const DesktopNav = styled.nav`
  display: none;

  @media (min-width: ${defaultTheme.typography.breakpoints.lg}) {
    display: flex;
  }
`;

export const DesktopNavItemsContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${pxToRem(40)};
  width: 100%;
  min-height: ${pxToRem(75)};
`;

export const DesktopNavItemLink = styled(Button)`
  transition: all 0.2s ease;
  padding: ${pxToRem(6)} ${pxToRem(20)};
  font-size: clamp(0.9rem, 1.2vw, 1.4rem);
  font-weight: 500;
  text-decoration: none;
  border-radius: ${pxToRem(8)};

  :focus {
    text-decoration: none;
  }

  :active,
  :hover {
    color: ${props => props.theme.background.primary};
    background-color: ${props => props.theme.border};
    padding: ${pxToRem(6)} ${pxToRem(20)};
    text-decoration: none;
    border: none;
  }
`;
