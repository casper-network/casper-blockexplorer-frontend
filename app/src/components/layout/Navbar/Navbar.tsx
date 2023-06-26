import React, { useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { NavbarItemLinkButton } from 'src/components/buttons';
import { Icon } from 'casper-ui-kit';
import { MOBILE_BREAKPOINT } from 'src/constants';
import { NavButton } from '../../buttons/NavButton';

import {
  NavComponentsContainer,
  Nav,
  NavItemsContainer,
  DesktopNav,
  DesktopNavItemsContainer,
  MobileNav,
  MobileNavItemsContainer,
  MobileNavItemLink,
} from './Navbar.styled';

interface NavbarProps {
  readonly isOpened: boolean;
  readonly isFirstVisit: boolean;
  readonly openNav: () => void;
  readonly closeNav: () => void;
  readonly windowWidth: number;
  readonly navItems: {
    title: string;
    path: string;
    key: string;
  }[];
}

export const Navbar: React.FC<NavbarProps> = ({
  isOpened,
  isFirstVisit,
  navItems,
  openNav,
  closeNav,
  windowWidth,
}) => {
  const { t } = useTranslation();

  const mobileNavMenuHandler = () => {
    if (!isOpened) {
      openNav();
    } else {
      closeNav();
    }
  };

  useEffect(() => {
    if (windowWidth > MOBILE_BREAKPOINT) {
      closeNav();
    }

    const escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isOpened) {
          closeNav();
        }
      }
    };

    document.addEventListener('keydown', escKeyHandler);

    return () => {
      document.removeEventListener('keydown', escKeyHandler);
    };
  }, [isOpened, windowWidth, closeNav]);

  const { pathname } = useLocation();

  const selectedRoute = useMemo(
    () => (pathname === '/' ? 'home' : pathname.slice(1)),
    [pathname],
  );

  return (
    <Nav data-testid="navigation" isFirstVisit={isFirstVisit}>
      <NavComponentsContainer>
        <NavButton type="button" onClick={mobileNavMenuHandler}>
          <Icon
            icon={isOpened ? 'CloseMenuIcon' : 'OpenMenuIcon'}
            height={35}
            width={35}
            strokeWidth={4}
          />
        </NavButton>
        <NavItemsContainer>
          {isOpened && (
            <MobileNav>
              <MobileNavItemsContainer>
                {navItems.map(({ path, title, key }) => {
                  return (
                    <li key={key}>
                      <MobileNavItemLink
                        to={path}
                        onClick={() => {
                          closeNav();
                        }}>
                        {t(title)}
                      </MobileNavItemLink>
                    </li>
                  );
                })}
              </MobileNavItemsContainer>
            </MobileNav>
          )}
          <DesktopNav>
            <DesktopNavItemsContainer>
              {navItems.map(({ path, title, key }) => {
                return (
                  <Link key={key} to={path}>
                    <NavbarItemLinkButton
                      isRouteSelected={title === selectedRoute}>
                      {t(title)}
                    </NavbarItemLinkButton>
                  </Link>
                );
              })}
            </DesktopNavItemsContainer>
          </DesktopNav>
        </NavItemsContainer>
      </NavComponentsContainer>
    </Nav>
  );
};
