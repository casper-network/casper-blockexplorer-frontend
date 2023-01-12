import React from 'react';
import { useAppWidth } from 'src/hooks';
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
  BlueBlackCasperLogo,
  BlueCasperLogo,
  ExplorerLogo,
} from './Header.styled';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { isDropdownMenu } = useAppWidth();

  const isFirstVisit = useAppSelector(getIsFirstVisit);

  return (
    <HeaderComponent>
      <HeaderComponentsContainer>
        <LogoLink to="/">
          <BlueBlackCasperLogo />
          <BlueCasperLogo />
          <ExplorerLogo />
        </LogoLink>
        <Navbar />
      </HeaderComponentsContainer>
      {isDropdownMenu ? <SearchForm /> : null}
      <HeroContainer isFirstVisit={isFirstVisit}>
        <HeroHeading type="h1" aria-label="Casper Block Explorer">
          {t('discover-casper')}
        </HeroHeading>
      </HeroContainer>
      {!isDropdownMenu ? <SearchForm /> : null}
    </HeaderComponent>
  );
};
