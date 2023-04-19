import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector, getIsFirstVisit } from 'src/store';
import { useTranslation } from 'react-i18next';
import { useAppWidth } from 'src/hooks';
import { loadConfig } from 'src/utils';

import { NavbarItemLinkButton } from 'src/components/buttons';
import { NavButton } from '../../buttons/NavButton';

import {
  LogoSearchFormWrapper,
  NavComponentsContainer,
  Nav,
  NavItemsContainer,
  DesktopNav,
  DesktopNavItemsContainer,
  MobileNav,
  MobileNavItemsContainer,
  MobileNavItemLink,
} from './Navbar.styled';

import { OpenMenuIcon, CloseMenuIcon } from '../../icons';
import { ConfigurableLogo, DefaultNavLogo } from '../LogoComponents';

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

export const Navbar: React.FC = () => {
  const [isOpened, setIsOpened] = useState(false);

  const isFirstVisit = useAppSelector(getIsFirstVisit);
  const { t } = useTranslation();
  const { logoUrl } = loadConfig();

  const { isMobile } = useAppWidth();

  useEffect(() => {
    const escKeyHandler = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        if (isOpened) {
          setIsOpened(false);
        }
      }
    };

    document.addEventListener('keydown', escKeyHandler);

    return () => {
      document.removeEventListener('keydown', escKeyHandler);
    };
  }, [isOpened]);

  const { pathname } = useLocation();

  const selectedRoute = pathname === '/' ? 'home' : pathname.slice(1);

  const logo = logoUrl ? <ConfigurableLogo /> : <DefaultNavLogo />;

  const returnVisitDesktopNavDisplay = (
    <LogoSearchFormWrapper>{logo}</LogoSearchFormWrapper>
  );

  return (
    <Nav data-testid="navigation" isFirstVisit={isFirstVisit}>
      {/* {!isFirstVisit && !isMobile && returnVisitDesktopNavDisplay} */}
      <NavComponentsContainer>
        <NavButton
          type="button"
          onClick={() => setIsOpened(!isOpened)}
          color="transparent">
          {isOpened ? <CloseMenuIcon /> : <OpenMenuIcon />}
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
                        onClick={() => setIsOpened(false)}>
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
                      title={title}
                      selectedRoute={selectedRoute}>
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
