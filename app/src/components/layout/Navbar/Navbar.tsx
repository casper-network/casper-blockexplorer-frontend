import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, getIsFirstVisit } from 'src/store';
import { useTranslation } from 'react-i18next';

import { NavbarItemLinkButton } from 'src/components/buttons';
import { Icon } from 'casper-ui-kit';
import { useScrollLock } from 'src/hooks/use-scroll-lock';
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

const navItems = [
  {
    title: 'home',
    path: '/',
    key: 'home',
  },
  {
    title: 'blocks',
    path: '/blocks',
    key: 'blocks',
  },
  {
    title: 'peers',
    path: '/peers',
    key: 'peers',
  },
  {
    title: 'validators',
    path: '/validators',
    key: 'validators',
  },
];

// TODO: we might want to assign a max width for the header/nav
export const Navbar: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const isFirstVisit = useAppSelector(getIsFirstVisit);
  const { t } = useTranslation();

  const { lockScroll, unlockScroll } = useScrollLock();

  const navButtonHandler = () => {
    if (!isOpened) {
      setIsOpened(true);
      lockScroll();
    } else {
      setIsOpened(false);
      unlockScroll();
    }
  };

  const windowWidth = window.innerWidth || 0;

  useEffect(() => {
    if (windowWidth > MOBILE_BREAKPOINT) {
      setIsOpened(false);
      unlockScroll();
    }

    const escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isOpened) {
          setIsOpened(false);
          unlockScroll();
        }
      }
    };

    document.addEventListener('keydown', escKeyHandler);

    return () => {
      document.removeEventListener('keydown', escKeyHandler);
    };
  }, [isOpened, windowWidth, unlockScroll]);

  const { pathname } = useLocation();

  const selectedRoute = useMemo(
    () => (pathname === '/' ? 'home' : pathname.slice(1)),
    [pathname],
  );

  return (
    <Nav data-testid="navigation" isFirstVisit={isFirstVisit}>
      <NavComponentsContainer>
        <NavButton type="button" onClick={navButtonHandler} color="transparent">
          <Icon
            icon={isOpened ? 'CloseMenuIcon' : 'OpenMenuIcon'}
            height={30}
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
                          setIsOpened(false);
                          unlockScroll();
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
