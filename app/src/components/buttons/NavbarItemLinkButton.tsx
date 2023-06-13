import React from 'react';
import styled from '@emotion/styled';
import { pxToRem, defaultTheme } from 'casper-ui-kit';
import { UiKitButton } from '../base/UiKitButton/UiKitButton';

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

const DesktopNavItemLink = styled(UiKitButton)<{
  isRouteSelected: boolean;
}>`
  color: ${props => props.theme.text.primary};
  background-color: transparent;
  padding: ${pxToRem(6)} ${pxToRem(20)};
  font-size: 1.25rem;
  font-weight: ${({ isRouteSelected }) =>
    isRouteSelected
      ? defaultTheme.typography.fontWeights.medium
      : defaultTheme.typography.fontWeights.normal};
  text-decoration: none;
  border-bottom: ${({ isRouteSelected, theme }) => {
    const selectedColor = theme.selected.primary ?? '';

    return `2px solid ${isRouteSelected ? selectedColor : 'transparent'}`;
  }};
  border-radius: 0;
  padding: 0;
  padding-bottom: 0.25rem;

  :active,
  :focus {
    border-bottom: ${({ isRouteSelected, theme }) => {
      const selectedColor = theme.selected.primary ?? '';

      return `2px solid ${isRouteSelected ? selectedColor : 'transparent'}`;
    }};
  }
`;

const NavItemWrapper = styled.div`
  min-width: ${pxToRem(90)};
  text-align: center;
`;
