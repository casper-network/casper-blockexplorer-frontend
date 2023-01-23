/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

export interface AppConfig {
  isProduction: boolean;
  webServerUrl: string;
  logoUrl?: string;
  faviconUrl?: string | undefined;
  title?: string | undefined;
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
    REACT_APP_ORG_NAME: reactAppName,
    REACT_APP_ORG_FAVICON_URL: reactAppFaviconUrl,
  } = process.env;
  const {
    MIDDLEWARE_URL: middlewareUrl,
    ORG_LOGO_URL: orgLogoUrl,
    ORG_NAME: orgName,
    ORG_FAVICON_URL: orgFaviconUrl,
  } = ENV;

  const isProduction = NODE_ENV === 'production';

  const webServerUrl = isProduction
    ? middlewareUrl
    : reactAppMiddlewareUrl || 'http://localhost:4000/rpc';

  const logoUrl = isProduction ? orgLogoUrl : reactAppLogoUrl || '';
  const faviconUrl = isProduction ? orgFaviconUrl : reactAppFaviconUrl || '';
  const title = isProduction ? orgName : reactAppName || '';

  if (!webServerUrl) {
    throw new Error('Invalid Config: Missing MIDDLEWARE_URL');
  }

  return {
    isProduction,
    webServerUrl,
    logoUrl,
    faviconUrl,
    title,
  };
};
