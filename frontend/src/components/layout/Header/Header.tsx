import React from 'react';

import { SearchForm } from './Partials';

import {
  HeaderComponent,
  HeaderComponentsContainer,
  LogoLink,
  HeroContainer,
  HeroHeading,
} from './Header.styled';

import { BlueLogo } from '../../logos';

export const Header: React.FC = () => {
  return (
    <HeaderComponent>
      <HeaderComponentsContainer>
        <LogoLink to="/">
          <BlueLogo />
        </LogoLink>
      </HeaderComponentsContainer>
      <HeroContainer>
        <HeroHeading type="h1">Discover the Casper Blockchain.</HeroHeading>
      </HeroContainer>
      <SearchForm />
    </HeaderComponent>
  );
};
