import React from 'react';
import styled from '@emotion/styled';
import { Button } from 'src/components/base';
import { pxToRem, colors } from 'src/styled-theme';

export interface NavbarItemLinkButtonProps {
  readonly title: string;
  readonly children: React.ReactNode;
  readonly selectedRoute: string;
}

export const NavbarItemLinkButton: React.FC<NavbarItemLinkButtonProps> = ({
  selectedRoute,
  title,
  children,
}) => (
  <DesktopNavItemLink type="button" selectedRoute={selectedRoute} title={title}>
    {children}
  </DesktopNavItemLink>
);

const DesktopNavItemLink = styled(Button)<{
  selectedRoute: string;
  title: string;
}>`
  color: ${({ selectedRoute, title }) =>
    selectedRoute === `${title}` ? `${colors.white}` : `${colors.primary}`};
  background-color: ${({ selectedRoute, title }) =>
    selectedRoute === `${title}` ? `${colors.primary}` : 'transparent'};
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
    color: ${({ selectedRoute, title }) =>
      selectedRoute === `${title}` ? `${colors.white}` : `${colors.primary}`};
    background-color: ${({ selectedRoute, title }) =>
      selectedRoute === `${title}`
        ? `${colors.primary}`
        : `${colors.secondary}`};
    padding: ${pxToRem(6)} ${pxToRem(20)};
    text-decoration: none;
  }
`;
