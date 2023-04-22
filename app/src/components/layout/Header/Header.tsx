import React from 'react';
import { useAppSelector, getIsFirstVisit } from 'src/store';
import { useTranslation } from 'react-i18next';
import { useTheme } from '@emotion/react';
import { ConfigurableLogo, DefaultHeaderLogo } from '../LogoComponents';
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
  const { logoUrl, title } = loadConfig();

  const logo = logoUrl ? <ConfigurableLogo /> : <DefaultHeaderLogo />;

  const isFirstVisit = useAppSelector(getIsFirstVisit);

  const theme = useTheme();

  console.log({ theme });

  return (
    <HeaderComponent>
      <HeaderComponentsContainer isFirstVisit={isFirstVisit}>
        {logo}
        <Navbar />
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
