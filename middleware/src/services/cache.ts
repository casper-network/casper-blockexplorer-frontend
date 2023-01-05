import NodeCache from "node-cache";

import { PEERS_UPDATE_INTERVAL } from "../config";
import { Peer } from "../types";
import { fetchPeers } from "./peers";

const cache = new NodeCache({ checkperiod: PEERS_UPDATE_INTERVAL });

cache.on("expired", async (key: string, _value) => {
  if (key === "peers") {
    const peers = await fetchPeers();
    setPeers(peers);
  }
});

/**
 * Save list of the active peers from cache
 * @param peers list of `Peer` to store to cache
 */
export const setPeers = (peers: Peer[]) => {
  cache.set("peers", peers, PEERS_UPDATE_INTERVAL);
};

/**
 * Reads list of the active peers from cache
 * @returns list of `Peer` or undefined
 */
export const getPeers = () => {
  return cache.get<Peer[]>("peers");
};
