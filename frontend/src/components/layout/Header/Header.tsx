import React from 'react';
import { useAppSelector, getIsFirstVisit } from 'src/store';
import { useTranslation } from 'react-i18next';
import { ConfigurableLogo, DefaultLogo } from './LogoComponents';
import { loadConfig } from '../../../utils/load-config';

import { SearchForm } from './Partials';
import { Navbar } from '../Navbar/Navbar';

import {
  HeaderComponent,
  HeaderComponentsContainer,
  HeroContainer,
  HeroHeading,
} from './Header.styled';

export const Header: React.FC = () => {
  const { t } = useTranslation();
  const { logoUrl } = loadConfig();

  const logo = logoUrl ? <ConfigurableLogo /> : <DefaultLogo />;

  const isFirstVisit = useAppSelector(getIsFirstVisit);

  return (
    <HeaderComponent>
      <HeaderComponentsContainer>
        {logo}
        <Navbar />
      </HeaderComponentsContainer>
      <HeroContainer isFirstVisit={isFirstVisit}>
        <HeroHeading type="h1" aria-label="Casper Block Explorer">
          {t('discover-casper')}
        </HeroHeading>
      </HeroContainer>
      <SearchForm />
    </HeaderComponent>
  );
};
