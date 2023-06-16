/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export const loadConfig = () => {
  const {
    NODE_ENV,
    BASE_URL: envBaseUrl,
    MIDDLEWARE_URL: middlewareUrl,
    SOCKET_URL: socketUrl,
    ORG_LOGO_URL: orgLogoUrl,
    ORG_LOGO_SIZE: orgLogoSize,
    DARK_THEME: envDarkTheme,
    LIGHT_THEME: envLightTheme,
    ORG_NAME: envOrgName,
    ORG_FAVICON_URL: orgFaviconUrl,
    ORG_FONT_URL: orgFontUrl,
    ORG_PRIMARY_FONT_NAME: orgPrimaryFontName,
    ORG_SECONDARY_FONT_NAME: orgSecondaryFontName,
  } = process.env;

  const isTestEnv = NODE_ENV === 'test';
  const webServerUrl = isTestEnv ? middlewareUrl : 'http://localhost:4000';

  const socketConnectionUrl = isTestEnv
    ? socketUrl
    : 'http://127.0.0.1:4000/gateway';

  const logoUrl = isTestEnv ? orgLogoUrl : '';

  const logoSize = (() => {
    if (isTestEnv) {
      return Number(orgLogoSize) > 100 ? 100 : Math.abs(Number(orgLogoSize));
    }

    return 0;
  })();

  const lightTheme = isTestEnv ? envLightTheme : '{}';

  const darkTheme = isTestEnv ? envDarkTheme : '{}';

  const orgName = isTestEnv ? envOrgName : '';

  const faviconUrl = isTestEnv ? orgFaviconUrl : '';

  const fontUrl = isTestEnv ? orgFontUrl : '';

  const primaryFontName = isTestEnv ? orgPrimaryFontName : '';

  const secondaryFontName = isTestEnv ? orgSecondaryFontName : '';

  const baseUrl = isTestEnv ? envBaseUrl : 'http://localhost:3000';

  if (!webServerUrl) {
    throw new Error('Invalid Config: Missing MIDDLEWARE_URL');
  }

  if (!socketConnectionUrl) {
    throw new Error('Invalid Config: Missing SOCKET_URL');
  }

  if (!baseUrl) {
    throw new Error('Invalid Config: Missing BASE_URL');
  }

  return {
    isTestEnv,
    baseUrl,
    webServerUrl,
    socketConnectionUrl,
    logoUrl,
    logoSize,
    darkTheme,
    lightTheme,
    faviconUrl,
    orgName,
    fontUrl,
    primaryFontName,
    secondaryFontName,
  };
};
