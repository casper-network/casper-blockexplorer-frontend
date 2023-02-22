import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { breakpoints, colors, pxToRem } from '../../../styled-theme';

export const Nav = styled.nav<{ isFirstVisit: boolean }>`
  /* border: solid 10px purple; */
  display: flex;
  justify-content: flex-end;
  width: fit-content;
  @media (min-width: ${breakpoints.lg}) {
    width: 100%;
  }
`;

export const LogoSearchFormWrapper = styled.div`
  /* border: solid 10px green; */
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${pxToRem(20)};
  width: 100%;

  /* EXPERIMENT */
  /* REFACTOR */
  /* flex-wrap: wrap; */
  /* padding: 100px 0; */

  /* ORIGINAL */
  justify-content: space-between;
  padding-left: ${pxToRem(20)};
`;

export const NavComponentsContainer = styled.div`
  /* border: solid 5px yellow; */
  display: flex;
`;

export const NavItemsContainer = styled.div`
  /* border: solid 5px pink; */
  display: flex;
  width: 100%;
`;

export const MobileNav = styled.nav`
  @media (min-width: ${breakpoints.lg}) {
    display: none;
  }
`;

export const MobileNavItemsContainer = styled.ul`
  border: solid 5px red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  align-items: center;
  gap: 1.25rem;
  z-index: 10;
  background-color: ${colors.primary};
  position: fixed;
  left: 0;
  top: 0;
`;

export const MobileNavItemLink = styled(Link)`
  border: solid 5px yellow;
  color: ${colors.white};
  font-size: 1.375rem;
  padding: 0.3125rem;
  width: 100%;
  font-weight: 500;
  letter-spacing: 0.025em;

  :hover {
    transition: color ease-in 200ms;
    color: ${colors.darkWarning};
    transition-property: color;
    text-decoration: none;
  }
`;

export const DesktopNav = styled.nav`
  display: none;

  @media (min-width: ${breakpoints.lg}) {
    display: flex;
  }
`;

export const DesktopNavItemsContainer = styled.ul`
  border: solid 5px red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: ${pxToRem(4)};
  width: 100%;
  min-height: 3.3rem;
`;

export const DesktopNavItemLink = styled(Link)`
  /* border: solid 5px green; */
  transition: all 0.2s ease;
  color: ${colors.primary};
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
    color: ${colors.white};
    background-color: ${colors.primary};
    padding: ${pxToRem(6)} ${pxToRem(20)};
    text-decoration: none;
  }
`;
