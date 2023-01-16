import { expect } from "chai";

import { SIDE_CAR_REST_URL } from "../config";
import { Sidecar } from "./sidecar";

describe("Sidecar", () => {
  const sidecar = new Sidecar(SIDE_CAR_REST_URL);

  it("should return the latest block", async () => {
    const latestBlock = await sidecar.getTheLatestBlock();
    expect(latestBlock).to.have.keys(["block_hash", "block"]);
  });

  it("should return the block by height or hash", async () => {
    const firstBlockByHeight = await sidecar.getBlock(0);
    expect(firstBlockByHeight).to.have.keys(["block_hash", "block"]);

    const firstBlockHash = firstBlockByHeight.block_hash;

    const firstBlockByHash = await sidecar.getBlock(firstBlockHash);

    expect(firstBlockByHeight).deep.eq(firstBlockByHash);
  });
});
