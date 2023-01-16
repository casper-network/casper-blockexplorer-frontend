import axios from "axios";

import { Sort } from "../types";
import { Sidecar } from "./sidecar";

export class ExtendedSidecar extends Sidecar {
  public async getBlocks(
    from?: number,
    count = 20,
    orderByHeight = "DESC" as Sort
  ) {
    const blocks = [];

    let latestBlockHeight = (await this.getTheLatestBlock()).block.header
      .height;

    const fromBlock = from !== undefined ? from : latestBlockHeight;
    const targetBlock =
      orderByHeight === "DESC" ? fromBlock - count : fromBlock + count;

    for (
      let i = fromBlock;
      orderByHeight === "DESC" ? i > targetBlock : i < targetBlock;
      orderByHeight === "DESC" ? i-- : i++
    ) {
      try {
        const { block } = await this.getBlock(i);
        blocks.push(block);
      } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 404) {
          break;
        }
      }
    }

    latestBlockHeight = (await this.getTheLatestBlock()).block.header.height;

    const total = latestBlockHeight + 1;

    return { blocks, total };
  }
}
