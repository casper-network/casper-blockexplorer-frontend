/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import dotenv from 'dotenv';

dotenv.config({ path: `${__dirname}/../../.env` });

export const loadConfig = () => {
  const {
    NODE_ENV,
    MIDDLEWARE_URL: middlewareUrl,
    SOCKET_URL: socketUrl,
    ORG_LOGO_URL: orgLogoUrl,
    ORG_LOGO_SIZE: orgLogoSize,
    DARK_THEME: envDarkTheme,
    LIGHT_THEME: envLightTheme,
    ORG_NAME: orgName,
    ORG_FAVICON_URL: orgFaviconUrl,
    ORG_FONT_URL: orgFontUrl,
    ORG_PRIMARY_FONT_NAME: orgPrimaryFontName,
    ORG_SECONDARY_FONT_NAME: orgSecondaryFontName,
  } = process.env;

  const isProduction = NODE_ENV === 'production';
  const webServerUrl = isProduction ? middlewareUrl : 'http://localhost:4000';

  const socketConnectionUrl = isProduction
    ? socketUrl
    : 'http://127.0.0.1:4000/gateway';

  const logoUrl = isProduction ? orgLogoUrl : '';

  const logoSize = (() => {
    if (isProduction) {
      return Number(orgLogoSize) > 100 ? 100 : Math.abs(Number(orgLogoSize));
    }

    return 0;
  })();

  const lightTheme = envLightTheme ?? '{}';

  const darkTheme = envDarkTheme ?? '{}';

  const faviconUrl = isProduction ? orgFaviconUrl : '';

  const fontUrl = isProduction ? orgFontUrl : '';

  const primaryFontName = isProduction ? orgPrimaryFontName : '';

  const secondaryFontName = isProduction ? orgSecondaryFontName : '';

  if (!webServerUrl) {
    throw new Error('Invalid Config: Missing MIDDLEWARE_URL');
  }

  if (!socketConnectionUrl) {
    throw new Error('Invalid Config: Missing SOCKET_URL');
  }

  return {
    isProduction,
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
