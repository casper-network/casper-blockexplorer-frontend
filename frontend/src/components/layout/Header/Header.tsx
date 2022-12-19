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
} from './Header.styled';

import { BlueLogo } from '../../logos';
import { LanguageSelector } from '../LanguageSwitcher';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  return (
    <HeaderComponent>
      <HeaderComponentsContainer>
        <LogoLink to="/">
          <BlueLogo />
        </LogoLink>
        <LanguageSelector />
        <Navbar />
      </HeaderComponentsContainer>
      <HeroContainer>
        <HeroHeading type="h1">{t('discover-casper')}</HeroHeading>
      </HeroContainer>
      <SearchForm />
    </HeaderComponent>
  );
};
