import React from 'react';
import { useAppWidth } from 'src/hooks';
import { useAppSelector, getIsFirstVisit } from 'src/store';
import { useTranslation } from 'react-i18next';
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
  const { isDropdownMenu, isMobile } = useAppWidth();
  const { logoUrl } = loadConfig();

  const logo = logoUrl ? (
    <ConfigurableLogo />
  ) : (
    <DefaultHeaderLogo isMobile={isMobile} />
  );

  const isFirstVisit = useAppSelector(getIsFirstVisit);

  return (
    <div>
      {isFirstVisit ? (
        <HeaderComponent>
          <HeaderComponentsContainer
            isFirstVisit={isFirstVisit}
            isMobile={isMobile}>
            {logo}
            <Navbar />
          </HeaderComponentsContainer>
          {isDropdownMenu && <SearchForm />}
          <HeroContainer isFirstVisit={isFirstVisit}>
            <HeroHeading type="h1" aria-label="Casper Block Explorer">
              {t('discover-casper')}
            </HeroHeading>
          </HeroContainer>
          {!isDropdownMenu && <SearchForm />}
        </HeaderComponent>
      ) : (
        <HeaderComponent>
          {!isMobile ? (
            <HeaderComponentsContainer
              isFirstVisit={isFirstVisit}
              isMobile={isMobile}>
              <Navbar />
            </HeaderComponentsContainer>
          ) : (
            <div>
              <HeaderComponentsContainer
                isFirstVisit={isFirstVisit}
                isMobile={isMobile}>
                {logo}
                <Navbar />
              </HeaderComponentsContainer>
              <SearchForm />
            </div>
          )}
        </HeaderComponent>
      )}
    </div>
  );
};
