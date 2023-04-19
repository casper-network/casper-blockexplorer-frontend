import React from 'react';
import styled from '@emotion/styled';
import { Button } from 'src/components/base';
import { fontWeight, pxToRem } from 'src/styled-theme';

export interface NavbarItemLinkButtonProps {
  readonly isRouteSelected: boolean;
  readonly children: React.ReactNode;
}

export const NavbarItemLinkButton: React.FC<NavbarItemLinkButtonProps> = ({
  children,
  isRouteSelected,
}) => (
  <DesktopNavItemLink type="button" isRouteSelected={isRouteSelected}>
    {children}
  </DesktopNavItemLink>
);

const DesktopNavItemLink = styled(Button)<{
  isRouteSelected: boolean;
}>`
  color: #000;
  background-color: transparent;
  transition: all 0.2s ease;
  padding: ${pxToRem(6)} ${pxToRem(20)};
  font-size: clamp(0.9rem, 1.2vw, 1.4rem);
  font-weight: ${({ isRouteSelected }) =>
    isRouteSelected ? fontWeight.medium : fontWeight.normal};
  text-decoration: none;
  border-bottom: ${({ isRouteSelected }) =>
    `2px solid ${isRouteSelected ? '#BCFC07' : 'transparent'}`};
  border-radius: 0;
  padding: 0;
  padding-bottom: 0.25rem;

  /* 
  :focus {
    text-decoration: none;
  } */

  /* :active,
  :hover {
    padding: ${pxToRem(6)} ${pxToRem(20)};
    text-decoration: none;
  } */
`;
