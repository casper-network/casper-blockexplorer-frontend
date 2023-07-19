import React from 'react';
import { useTranslation } from 'react-i18next';
import { Icon } from 'casper-ui-kit';
import { useTheme } from '@emotion/react';
import { darkTheme, lightTheme } from 'src/theme';
import {
  IconH2Container,
  H2,
  PageLink,
  H3,
  H3Data,
  DataContext,
  Header,
  Details,
  TextWrapper,
  Info,
  Card,
} from '../HomeComponents.styled';

export const DeploysInfo: React.FC = () => {
  const { t } = useTranslation();
  const { type: themeType } = useTheme();

  return (
    <Card data-cy="deploys-info">
      <Header>
        <IconH2Container>
          {
            <Icon
              icon="DeployIcon"
              width={49}
              height={25}
              color="none"
              stroke={
                themeType === 'light'
                  ? lightTheme.text.primary
                  : darkTheme.text.primary
              }
            />
          }

          <H2>{t('deploys')}</H2>
        </IconH2Container>
        <PageLink to="/deploys">{t('view-all')}</PageLink>
      </Header>
      <Details>
        <Info>
          <TextWrapper>
            <H3>{t('total-deploys')}</H3>
          </TextWrapper>
          <H3Data>{t('n/a')}</H3Data>
          <DataContext>{t('n/a')}</DataContext>
        </Info>
        <Info>
          <TextWrapper>
            <H3>{t('today')}</H3>
          </TextWrapper>
          <H3Data>{t('n/a')}</H3Data>
        </Info>
      </Details>
    </Card>
  );
};
