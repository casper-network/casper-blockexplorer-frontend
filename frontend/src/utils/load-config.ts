/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
export interface AppConfig {
  isProduction: boolean;
  webServerUrl: string;
  logoUrl?: string;
  title?: string;
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
  } = process.env;
  const { MIDDLEWARE_URL: middlewareUrl, ORG_LOGO_URL: orgLogoUrl } = ENV;

  const isProduction = NODE_ENV === 'production';

  const webServerUrl = isProduction
    ? middlewareUrl
    : reactAppMiddlewareUrl || 'http://localhost:4000/rpc';

  // const logoUrl = isProduction ? orgLogoUrl : reactAppLogoUrl || '';

  const logoUrl = 'https://chengduchain.com/assets/img/chengduchain-logo.svg';

  // const titleText = isProduction ? orgTitle : reactAppTitle || '';
  const title = 'Chengdu Explorer';

  if (!webServerUrl) {
    throw new Error('Invalid Config: Missing MIDDLEWARE_URL');
  }

  return {
    isProduction,
    webServerUrl,
    logoUrl,
    title,
  };
};
