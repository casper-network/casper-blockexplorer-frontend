import { config } from "dotenv";

config();

const REQUIRED_ENVS = [
  "NODE_URLS",
  "SIDE_CAR_REST_URL",
  "SIDE_CAR_EVENTSTREAM_URL",
];

REQUIRED_ENVS.forEach((requiredEnv) => {
  if (!Object.keys(process.env).includes(requiredEnv))
    throw Error(`Missing ${requiredEnv} env variable`);
});

export const PORT = process.env.PORT || 4000;
export const NODE_URLS = process.env.NODE_URLS;
export const SIDE_CAR_REST_URL = process.env.SIDE_CAR_REST_URL as string;
export const SIDE_CAR_EVENTSTREAM_URL = process.env
  .SIDE_CAR_EVENTSTREAM_URL as string;
export const PEERS_UPDATE_INTERVAL = process.env.PEERS_UPDATE_INTERVAL || 120;
export const NODE_ENV = process.env.NODE_ENV || "production";
