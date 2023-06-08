import { defineConfig } from 'cypress';
import path from 'path';
import { loadConfig } from 'utils';

const config = loadConfig();

const {
  webServerUrl,
  socketConnectionUrl,
  logoUrl,
  logoSize,
  darkTheme,
  lightTheme,
  orgName,
  faviconUrl,
  fontUrl,
  primaryFontName,
  secondaryFontName,
} = config;

export default defineConfig({
  e2e: {
    specPattern: path.resolve(__dirname, 'cypress/e2e/**/*.cy.ts'),
    baseUrl: 'http://localhost:3000',
    env: {
      MIDDLEWARE_URL: webServerUrl,
      SOCKET_URL: socketConnectionUrl,
      ORG_LOGO_URL: logoUrl,
      ORG_LOGO_SIZE: logoSize,
      DARK_THEME: darkTheme,
      LIGHT_THEME: lightTheme,
      ORG_NAME: orgName,
      ORG_FAVICON_URL: faviconUrl,
      ORG_FONT_URL: fontUrl,
      ORG_PRIMARY_FONT_NAME: primaryFontName,
      ORG_SECONDARY_FONT_NAME: secondaryFontName,
    },
  },
});
