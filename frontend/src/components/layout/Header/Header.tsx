import React from 'react';

import { useTranslation } from 'react-i18next';
import { SearchForm } from './Partials';
import { Navbar } from '../Navbar/Navbar';

import {
  HeaderComponent,
  HeaderComponentsContainer,
  LogoLink,
  HeroContainer,
  HeroHeading,
  LogoText,
  MinimizedHeaderLink,
} from './Header.styled';

import { BlueBlackLogo, BlueLogo } from '../../logos';

interface HeaderProps {
  readonly isFirstVisit: boolean;
}

export const Header: React.FC<HeaderProps> = ({ isFirstVisit }) => {
  const { t } = useTranslation();

  return (
    <HeaderComponent>
      <HeaderComponentsContainer>
        {isFirstVisit ? (
          <LogoLink to="/">
            <BlueLogo />
          </LogoLink>
        ) : (
          <MinimizedHeaderLink to="/">
            <BlueBlackLogo />
            <LogoText>Block Explorer</LogoText>
          </MinimizedHeaderLink>
        )}
        <Navbar />
      </HeaderComponentsContainer>
      {isFirstVisit ? (
        <HeroContainer isFirstVisit={isFirstVisit}>
          <HeroHeading type="h1">{t('discover-casper')}</HeroHeading>
        </HeroContainer>
      ) : null}
      <SearchForm isFirstVisit={isFirstVisit} />
    </HeaderComponent>
  );
};
