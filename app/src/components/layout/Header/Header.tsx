import React, { useState } from 'react';
import { useAppSelector, getIsFirstVisit } from 'src/store';
import { useTranslation } from 'react-i18next';
import { useScrollLock } from 'src/hooks/use-scroll-lock';
import { ConfigurableLogo, DefaultHeaderLogo } from '../LogoComponents';
import { loadConfig } from '../../../utils/load-config';

import { Navbar } from '../Navbar/Navbar';

import {
  HeaderComponent,
  HeaderComponentsContainer,
  HeroContainer,
  HeroHeading,
} from './Header.styled';
import { SearchForm } from './Partials';

export const navItems = [
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

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { logoUrl, title, logoSize } = loadConfig();
  const [isOpened, setIsOpened] = useState(false);
  const { lockScroll, unlockScroll } = useScrollLock();
  const windowWidth = window.innerWidth || 0;

  const openNav = () => {
    setIsOpened(true);
    lockScroll();
  };
  const closeNav = () => {
    setIsOpened(false);
    unlockScroll();
  };

  const logo = logoUrl ? (
    <ConfigurableLogo logoUrl={logoUrl} logoSize={logoSize} />
  ) : (
    <DefaultHeaderLogo />
  );

  const isFirstVisit = useAppSelector(getIsFirstVisit);

  return (
    <HeaderComponent>
      <HeaderComponentsContainer isFirstVisit={isFirstVisit}>
        {logo}
        <Navbar
          windowWidth={windowWidth}
          openNav={openNav}
          closeNav={closeNav}
          isOpened={isOpened}
          isFirstVisit={isFirstVisit}
          navItems={navItems}
        />
      </HeaderComponentsContainer>
      <SearchForm />
      <HeroContainer isFirstVisit={isFirstVisit}>
        <HeroHeading type="h1" aria-label="Casper Block Explorer">
          {t('discover-prompt-one')} {title} {t('discover-prompt-two')}
        </HeroHeading>
      </HeroContainer>
    </HeaderComponent>
  );
};
