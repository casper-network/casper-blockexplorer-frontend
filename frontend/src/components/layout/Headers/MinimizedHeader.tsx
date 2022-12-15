import React from 'react';

import { BlueBlackLogo } from 'src/components/logos';
import { MinimizedSearchForm } from './Partials';
import { Navbar } from '../Navbar/Navbar';

import {
  HeaderComponent,
  HeaderComponentsContainer,
  LogoLink,
} from './MinimizedHeader.styled';

export const MinimizedHeader: React.FC = () => {
  return (
    <HeaderComponent>
      <HeaderComponentsContainer>
        <LogoLink to="/">
          <BlueBlackLogo />
        </LogoLink>
        <Navbar />
      </HeaderComponentsContainer>
      <MinimizedSearchForm />
    </HeaderComponent>
  );
};
