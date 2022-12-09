export interface AppConfig {
  isProduction: boolean;
  webServerUrl: string;
}

export const loadConfig: () => AppConfig = () => {
  const { NODE_ENV, REACT_APP_MIDDLEWARE_URL: webServerUrl } = process.env;

  const isProduction = NODE_ENV === 'production';

  if (!webServerUrl) {
    throw new Error('Invalid Config: Missing MIDDLEWARE_URL');
  }

  return {
    isProduction,
    webServerUrl,
  };
};
