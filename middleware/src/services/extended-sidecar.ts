import { Sort } from "../types";
import { Sidecar } from "./sidecar";

export class ExtendedSidecar extends Sidecar {
  public async getBlocks(
    from?: number,
    count = 20,
    orderByHeight = "DESC" as Sort
  ) {
    const result = [];

    const fromBlock = from || 0;
    const targetBlock =
      orderByHeight === "DESC" ? fromBlock - count : fromBlock + count;

    for (
      let i = fromBlock;
      orderByHeight === "DESC" ? i > targetBlock : i < targetBlock;
      orderByHeight === "DESC" ? i-- : i++
    ) {
      const block = await this.getBlock(i);
      result.push(block);
    }

    return result;
  }
}
