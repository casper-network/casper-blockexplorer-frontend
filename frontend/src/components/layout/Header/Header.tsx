import React from 'react';
import { useAppSelector, getIsFirstVisit } from 'src/store';

import { useTranslation } from 'react-i18next';
import { SearchForm } from './Partials';
import { Navbar } from '../Navbar/Navbar';

import {
  HeaderComponent,
  HeaderComponentsContainer,
  LogoLink,
  HeroContainer,
  HeroHeading,
  MinimizedHeaderLink,
} from './Header.styled';

import { BlkExpLogo, BlueBlackLogo, BlueLogo } from '../../logos';

export const Header: React.FC = () => {
  const { t } = useTranslation();

  const isFirstVisit = useAppSelector(getIsFirstVisit);

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
            <BlkExpLogo />
          </MinimizedHeaderLink>
        )}
        <Navbar />
      </HeaderComponentsContainer>
      {isFirstVisit ? (
        <HeroContainer>
          <HeroHeading type="h1">{t('discover-casper')}</HeroHeading>
        </HeroContainer>
      ) : null}
      <SearchForm />
    </HeaderComponent>
  );
};
