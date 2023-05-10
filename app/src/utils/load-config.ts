/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Theme } from './types';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export interface AppConfig {
  isProduction: boolean;
  webServerUrl: string;
  logoUrl?: string;
  darkTheme: Theme;
  lightTheme: Theme;
  faviconUrl?: string | undefined;
  logoSize: number;
  title?: string | undefined;
  fontUrl?: string | undefined;
  primaryFontName?: string | undefined;
  secondaryFontName?: string | undefined;
}

/* eslint-disable prefer-destructuring */
const ENV = (window as any)?.ENV || {};
Object.keys(ENV).forEach(key => {
  ENV[key] = ENV[key].indexOf('<!--') !== -1 ? null : ENV[key];
});

export const loadConfig: () => AppConfig = () => {
  const {
    NODE_ENV,
    REACT_APP_MIDDLEWARE_URL: reactAppMiddlewareUrl,
    REACT_APP_ORG_LOGO_URL: reactAppLogoUrl,
    REACT_APP_ORG_LOGO_SIZE: reactAppLogoSize,
    REACT_APP_LIGHT_THEME: reactAppLightTheme,
    REACT_APP_DARK_THEME: reactAppDarkTheme,
    REACT_APP_ORG_NAME: reactAppName,
    REACT_APP_ORG_FAVICON_URL: reactAppFaviconUrl,
    REACT_APP_ORG_FONT_URL: reactAppFontUrl,
    REACT_APP_ORG_PRIMARY_FONT_NAME: reactAppPrimaryFontName,
    REACT_APP_ORG_SECONDARY_FONT_NAME: reactAppSecondaryFontName,
  } = process.env;
  const {
    MIDDLEWARE_URL: middlewareUrl,
    ORG_LOGO_URL: orgLogoUrl,
    ORG_LOGO_SIZE: orgLogoSize,
    DARK_THEME: prodDarkTheme,
    LIGHT_THEME: prodLightTheme,
    ORG_NAME: orgName,
    ORG_FAVICON_URL: orgFaviconUrl,
    ORG_FONT_URL: orgFontUrl,
    ORG_PRIMARY_FONT_NAME: orgPrimaryFontName,
    ORG_SECONDARY_FONT_NAME: orgSecondaryFontName,
  } = ENV;

  const isProduction = NODE_ENV === 'production';
  const webServerUrl = isProduction
    ? middlewareUrl
    : reactAppMiddlewareUrl || 'http://localhost:4000';

  const logoUrl = isProduction ? orgLogoUrl : reactAppLogoUrl || '';

  const logoSize = isProduction
    ? orgLogoSize > 100
      ? 100
      : Math.abs(orgLogoSize)
    : +reactAppLogoSize! || 0;

  const lightTheme = JSON.parse(
    (isProduction ? prodLightTheme : reactAppLightTheme) || '{}',
  );
  const darkTheme = JSON.parse(
    (isProduction ? prodDarkTheme : reactAppDarkTheme) || '{}',
  );

  const title = isProduction ? orgName : reactAppName || '';

  const faviconUrl = isProduction ? orgFaviconUrl : reactAppFaviconUrl || '';

  const fontUrl = isProduction ? orgFontUrl : reactAppFontUrl || '';

  const primaryFontName = isProduction
    ? orgPrimaryFontName
    : reactAppPrimaryFontName || '';

  const secondaryFontName = isProduction
    ? orgSecondaryFontName
    : reactAppSecondaryFontName || '';

  if (!webServerUrl) {
    throw new Error('Invalid Config: Missing MIDDLEWARE_URL');
  }

  return {
    isProduction,
    webServerUrl,
    logoUrl,
    logoSize,
    darkTheme,
    lightTheme,
    faviconUrl,
    title,
    fontUrl,
    primaryFontName,
    secondaryFontName,
  };
};
