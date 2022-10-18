import React from 'react';

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

export const Header: React.FC = () => {
  return (
    <HeaderComponent>
      <HeaderComponentsContainer>
        <LogoLink to="/">
          <BlueLogo />
        </LogoLink>
        <Navbar />
      </HeaderComponentsContainer>
      <HeroContainer>
        <HeroHeading>Discover the Casper Blockchain.</HeroHeading>
      </HeroContainer>
      <SearchForm />
    </HeaderComponent>
  );
};
