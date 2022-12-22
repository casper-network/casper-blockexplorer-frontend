import { CasperServiceByJsonRPC } from "casper-js-sdk";
import { StatusCodes } from "http-status-codes";

import { Peer } from "../types";
import { ApiError } from "../utils";
import { getPeers, setPeers } from "./cache";
import { nodeManager } from "./node-manager";

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
    const rpc = new CasperServiceByJsonRPC(`http://${ip}:7777/rpc`);

    await rpc.getStatus();

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export const fetchPeers = async (update = false): Promise<Peer[]> => {
  const existPeers = getPeers();
  if (existPeers && !update) {
    return existPeers;
  }

  const rpcCall = async () => {
    const activeNode = nodeManager.getActiveNode();
    try {
      const node = new CasperServiceByJsonRPC(activeNode.url);
      const { peers } = await node.getPeers();
      return peers;
    } catch (error) {
      nodeManager.setDeadNode(activeNode.id);
      rpcCall();
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const peersToCheck = await rpcCall();

  // This is the worst case
  if (!peersToCheck)
    throw new ApiError(StatusCodes.NOT_FOUND, "All Peers are dead.");

  const peers: Peer[] = await Promise.all(
    peersToCheck.map(async (peer) => {
      const isAlive = await checkPeerIsAlive(peer.address.split(":")[0]);
      // TODO: Update uptime
      return { address: peer.address, isAlive, uptime: "" };
    })
  );

  if (update) {
    console.log("Force update peer list");
  }
  setPeers(peers);
  return peers;
};
