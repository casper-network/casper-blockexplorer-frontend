/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { Theme } from './types';

/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export interface AppConfig {
  isProduction: boolean;
  webServerUrl: string;
  logoUrl?: string;
  theme: Theme;
  faviconUrl?: string | undefined;

  // REFACTOR
  logoSize: number;
  // logoSize?: number | undefined;

  // CONTINUE ORIGINAL
  title?: string | undefined;
  fontUrl?: string | undefined;
  primaryFontName?: string | undefined;
  secondaryFontName?: string | undefined;
  defaultPagination: number;
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

    // REFACTOR
    REACT_APP_ORG_LOGO_SIZE: reactAppLogoSize,
    // ORG_LOGO_SIZE=100
    // CONTINUE ORIGINAL

    REACT_APP_THEME: reactAppTheme,
    REACT_APP_ORG_NAME: reactAppName,
    REACT_APP_ORG_FAVICON_URL: reactAppFaviconUrl,
    REACT_APP_ORG_FONT_URL: reactAppFontUrl,
    REACT_APP_ORG_PRIMARY_FONT_NAME: reactAppPrimaryFontName,
    REACT_APP_ORG_SECONDARY_FONT_NAME: reactAppSecondaryFontName,
    REACT_APP_DEFAULT_PAGINATION: reactAppDefaultPagination,
  } = process.env;
  const {
    MIDDLEWARE_URL: middlewareUrl,
    ORG_LOGO_URL: orgLogoUrl,

    // REFACTOR
    ORG_LOGO_SIZE: orgLogoSize,
    // ORG_LOGO_SIZE=100

    // CONTINUE ORIGINAL

    THEME: prodTheme,
    ORG_NAME: orgName,
    ORG_FAVICON_URL: orgFaviconUrl,
    ORG_FONT_URL: orgFontUrl,
    ORG_PRIMARY_FONT_NAME: orgPrimaryFontName,
    ORG_SECONDARY_FONT_NAME: orgSecondaryFontName,
    DEFAULT_PAGINATION: prodDefaultPagination,
  } = ENV;

  const isProduction = NODE_ENV === 'production';

  const webServerUrl = isProduction
    ? middlewareUrl
    : reactAppMiddlewareUrl || 'http://localhost:4000';

  const logoUrl = isProduction ? orgLogoUrl : reactAppLogoUrl || '';

  // REFACTOR
  const logoSize = isProduction ? orgLogoSize : reactAppLogoSize || 55;
  // ORG_LOGO_SIZE=100

  // CONTINUE ORIGINAL
  const theme = isProduction
    ? JSON.parse(prodTheme || '{}')
    : JSON.parse(reactAppTheme || '{}');

  const title = isProduction ? orgName : reactAppName || '';

  const faviconUrl = isProduction ? orgFaviconUrl : reactAppFaviconUrl || '';

  const fontUrl = isProduction ? orgFontUrl : reactAppFontUrl || '';

  const primaryFontName = isProduction
    ? orgPrimaryFontName
    : reactAppPrimaryFontName || '';

  const secondaryFontName = isProduction
    ? orgSecondaryFontName
    : reactAppSecondaryFontName || '';

  const defaultPagination = isProduction
    ? prodDefaultPagination
    : reactAppDefaultPagination || 10;

  if (!webServerUrl) {
    throw new Error('Invalid Config: Missing MIDDLEWARE_URL');
  }

  return {
    isProduction,
    webServerUrl,
    logoUrl,

    // REFACTOR
    logoSize,

    // CONTINUE ORIGINAL
    theme,
    faviconUrl,
    title,
    fontUrl,
    primaryFontName,
    secondaryFontName,
    defaultPagination,
  };
};
