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
  } = process.env;
  const { MIDDLEWARE_URL: middlewareUrl, ORG_LOGO_URL: orgLogoUrl } = ENV;

  const isProduction = NODE_ENV === 'production';

  const webServerUrl = isProduction
    ? middlewareUrl
    : reactAppMiddlewareUrl || 'http://localhost:4000/rpc';

  // const logoUrl = isProduction ? orgLogoUrl : reactAppLogoUrl || '';
  // const faviconUrl = isProduction? orgLogoUrl : reactAppLogoUrl || '';
  // const titleText = isProduction ? orgTitle : reactAppTitle || '';

  // const logoUrl = '';
  // const faviconUrl = '';
  // const title = '';

  const logoUrl = 'https://chengduchain.com/assets/img/chengduchain-logo.svg';
  const faviconUrl =
    'https://chengduchain.com/assets/img/chengdu-chain-icon-white.svg';
  const title = 'Chengdu Explorer';

  //  This png works for all the major browsers (Safari, Firefox, Chromium browsers)

  // const faviconUrl = 'chengdu-chain-icon-white.png';

  // I wonder if the url solution would work if chengdu-chain-icon-white.png were hosted at https://chengduchain.com/assets/img, ?

  // Unfortunately, I cannot get this to work with all the browsers

  // const faviconUrl =
  //   'https://files.slack.com/files-pri/TDVFB45LG-F04K9ULT46T/chengduchain-favicon-white.png';

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
