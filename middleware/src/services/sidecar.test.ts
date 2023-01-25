import { expect } from "chai";

import { SIDECAR_REST_URL } from "../config";
import { Sidecar } from "./sidecar";

(SIDECAR_REST_URL ? describe : describe.skip)("Sidecar", () => {
  const sidecar = new Sidecar(SIDECAR_REST_URL || "");

  it("should return the latest block", async () => {
    const latestBlock = await sidecar.getLatestBlock();
    expect(latestBlock).to.have.keys(["hash", "header", "body", "proofs"]);
  });

  it("should return the block by height or hash", async () => {
    const firstBlockByHeight = await sidecar.getBlock(0);
    expect(firstBlockByHeight).to.have.keys([
      "hash",
      "header",
      "body",
      "proofs",
    ]);

    const firstBlockHash = firstBlockByHeight.hash;

    const firstBlockByHash = await sidecar.getBlock(firstBlockHash);

    expect(firstBlockByHeight).deep.eq(firstBlockByHash);
  });
});
