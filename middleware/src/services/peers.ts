import axios from "axios";

import { Peer, StatusResponse } from "../types";
import { getPeers, setPeers } from "./cache";

export const checkPeerIsAlive = async (ip: string) => {
  // Check if given ip is v4 ip
  if (
    /^(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}$/.test(
      ip
    )
  ) {
    throw Error(`Invalid IP address: ${ip}`);
  }
  try {
    await axios.post(`http://${ip}:7777/rpc`);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchPeers = async (update = false): Promise<StatusResponse> => {
  // TODO: Replace hardcoded
  const node = "http://65.21.229.213:8888/status";
  const {
    data: { peers: peersToCheck, ...rest },
  } = await axios.get<StatusResponse>(node);

  const existPeers = getPeers();
  if (existPeers && !update) {
    const result = { ...rest, peers: existPeers };
    return result;
  }

  const peers = (
    await Promise.all(
      peersToCheck.slice(0, 5).map(async (peer) => {
        const result = await checkPeerIsAlive(peer.address.split(":")[0]);
        if (result) return peer;
        return null;
      })
    )
  ).filter((p) => p !== null) as Peer[];

  const result = {
    ...rest,
    peers,
  };
  if (update) {
    console.log("Force update peer list");
  }
  setPeers(peers);
  return result;
};
