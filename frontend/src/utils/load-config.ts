export interface AppConfig {
  isProduction: boolean;
  middlewareUrl: string;
  orgName: string;
  disableLogo: boolean;
  orgLogoUrl?: string;
}

export const loadConfig: () => AppConfig = () => {
  const {
    NODE_ENV,
    REACT_APP_MIDDLEWARE_URL: middlewareUrl,
    REACT_APP_ORG_NAME: orgName = 'Casper',
    REACT_APP_ORG_LOGO_URL: orgLogoUrl,
    REACT_APP_DISABLE_LOGO: disableLogoString,
  } = process.env;

  const isProduction = NODE_ENV === 'production';

  const disableLogo = disableLogoString === 'true';

  // temporary; remove after sidecar integration
  if (!middlewareUrl) {
    throw new Error('Invalid Config: Missing MIDDLEWARE_URL');
  }

  return {
    isProduction,
    middlewareUrl,
    orgName,
    orgLogoUrl,
    disableLogo,
  };
};
