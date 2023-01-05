import { config } from "dotenv";

config();

if (!process.env.NODE_URLS) {
  throw Error("Missing NODE_URLS env variable");
}

export const PORT = process.env.PORT || 4000;
export const NODE_URLS = process.env.NODE_URLS;
export const PEERS_UPDATE_INTERVAL = process.env.PEERS_UPDATE_INTERVAL || 120;
export const NODE_ENV = process.env.NODE_ENV || "production";
