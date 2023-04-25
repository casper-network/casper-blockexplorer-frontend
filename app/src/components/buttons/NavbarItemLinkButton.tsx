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
  <NavItemWrapper>
    <DesktopNavItemLink type="button" isRouteSelected={isRouteSelected}>
      {children}
    </DesktopNavItemLink>
  </NavItemWrapper>
);

const DesktopNavItemLink = styled(Button)<{
  isRouteSelected: boolean;
}>`
  color: #000;
  background-color: transparent;
  padding: ${pxToRem(6)} ${pxToRem(20)};
  font-size: 1.25rem;
  font-weight: ${({ isRouteSelected }) =>
    isRouteSelected ? fontWeight.medium : fontWeight.normal};
  text-decoration: none;
  border-bottom: ${({ isRouteSelected }) =>
    `2px solid ${isRouteSelected ? '#BCFC07' : 'transparent'}`};
  border-radius: 0;
  padding: 0;
  padding-bottom: 0.25rem;
`;

const NavItemWrapper = styled.div`
  min-width: ${pxToRem(90)};
  text-align: center;
`;
