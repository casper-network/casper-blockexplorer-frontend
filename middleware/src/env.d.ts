declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "development" | "production" | "test";
    PORT?: number;
    MIDDLEWARE_URL: string;
    NODE_URLS: string;
    NETWORK_NAME: string;
    PEERS_UPDATE_INTERVAL: number;
  }
}
