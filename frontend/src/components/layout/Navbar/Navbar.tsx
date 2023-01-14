import React, { useState, useEffect } from 'react';
import { useAppSelector, getIsFirstVisit } from 'src/store';

import { useTranslation } from 'react-i18next';
import { BlueLogo } from 'src/components/logos';
import { useAppWidth } from 'src/hooks';
import { NavButton } from '../../buttons/NavButton';
import { SearchForm } from '../Header/Partials';

import {
  LogoSearchFormWrapper,
  NavLogoLink,
  ExplorerLogo,
  NavComponentsContainer,
  Nav,
  NavItemsContainer,
  DesktopNav,
  DesktopNavItemsContainer,
  DesktopNavItemLink,
  MobileNav,
  MobileNavItemsContainer,
  MobileNavItemLink,
} from './Navbar.styled';

import { OpenMenuIcon, CloseMenuIcon } from '../../icons';

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
];

export const Navbar: React.FC = () => {
  const isFirstVisit = useAppSelector(getIsFirstVisit);
  const [isOpened, setIsOpened] = useState(false);
  const { t } = useTranslation();

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

  const returnVisitDesktop = (
    <LogoSearchFormWrapper>
      <NavLogoLink to="/">
        <BlueLogo />
        <ExplorerLogo />
      </NavLogoLink>
      <SearchForm />
    </LogoSearchFormWrapper>
  );
  return (
    <Nav data-testid="navigation" isFirstVisit={isFirstVisit}>
      {!isFirstVisit && !isMobile && returnVisitDesktop}
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
                  <li key={key}>
                    <DesktopNavItemLink to={path}>
                      {t(title)}
                    </DesktopNavItemLink>
                  </li>
                );
              })}
            </DesktopNavItemsContainer>
          </DesktopNav>
        </NavItemsContainer>
      </NavComponentsContainer>
    </Nav>
  );
};
