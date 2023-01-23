import {
  CasperServiceByJsonRPC,
  CLPublicKey,
  GetStatusResult,
  ValidatorWeight,
} from "casper-js-sdk";
import { StatusCodes } from "http-status-codes";
import NodeCache from "node-cache";

import { BLOCK_GENERATE_INTERVAL, DEFAULT_PAGINATION_COUNT } from "../config";
import { Sort } from "../types";
import { Block } from "../types/on-chain";
import { ApiError, isValidPublicKey } from "../utils";

export class RpcClient {
  private cache: NodeCache;
  constructor(private readonly rpcClient: CasperServiceByJsonRPC) {
    this.cache = new NodeCache();
  }

  async getStatus() {
    const existStatus = this.cache.get<GetStatusResult>("status");
    if (existStatus) return existStatus;

    const status = await this.rpcClient.getStatus();

    this.cache.set("status", status);

    return status;
  }

  async getLatestBlock() {
    const existLatestBlock = this.cache.get<Block>(`latestBlock`);
    if (existLatestBlock) return existLatestBlock;

    const { block } = await this.rpcClient.getLatestBlockInfo();
    if (!block) throw new ApiError(StatusCodes.NOT_FOUND, "Not found block");

    this.cache.set(`latestBlock`, block, BLOCK_GENERATE_INTERVAL);

    return block as unknown as Block;
  }

  async getBlock(blockHash: string) {
    const existBlock = this.cache.get<Block>(`block:${blockHash}`);
    if (existBlock) return existBlock;

    const { block } = await this.rpcClient.getBlockInfo(blockHash);
    if (!block) throw new ApiError(StatusCodes.NOT_FOUND, "Not found block");

    this.cache.set(`block:${blockHash}`, block);

    return block as unknown as Block;
  }

  async getBlockByHeight(height: number) {
    const exsitBlock = this.cache.get<Block>(`block:${height}`);
    if (exsitBlock) return exsitBlock;

    const { block } = await this.rpcClient.getBlockInfoByHeight(height);

    if (!block) throw new ApiError(StatusCodes.NOT_FOUND, "Not found block");

    this.cache.set(`block:${height}`, block);

    return block as unknown as Block;
  }

  async getBlocks(
    from?: number,
    count = DEFAULT_PAGINATION_COUNT,
    orderByHeight = "DESC" as Sort
  ) {
    let latestBlockHeight = (await this.getLatestBlock()).header.height;

    const fromBlock = from !== undefined ? from : latestBlockHeight;
    const targetBlock =
      orderByHeight === "DESC" ? fromBlock - count : fromBlock + count;

    const blocks: Block[] = [];

    for (
      let i = fromBlock;
      orderByHeight === "DESC" ? i > targetBlock : i < targetBlock;
      orderByHeight === "DESC" ? i-- : i++
    ) {
      try {
        const block = await this.getBlockByHeight(i);
        blocks.push(block);
      } catch (error) {
        break;
      }
    }

    latestBlockHeight = (await this.getLatestBlock()).header.height;

    const total = latestBlockHeight + 1;

    return { blocks, total };
  }

  async getDeploy(deployHash: string) {
    const { deploy, execution_results } = await this.rpcClient.getDeployInfo(
      deployHash
    );

    return { ...deploy, execution_results };
  }

  getAccount = async (accountHashOrPublicKey: string) => {
    const stateRootHash = await this.rpcClient.getStateRootHash();
    const accountHash = isValidPublicKey(accountHashOrPublicKey)
      ? CLPublicKey.fromHex(accountHashOrPublicKey).toAccountHashStr()
      : `account-hash-${accountHashOrPublicKey}`;

    const { Account: account } = await this.rpcClient.getBlockState(
      stateRootHash,
      accountHash,
      []
    );

    if (!account)
      throw new ApiError(StatusCodes.NOT_FOUND, "Not found account");
    return account;
  };

  async getValidators() {
    const existValidators = this.cache.get<ValidatorWeight[]>("validators");
    if (existValidators) return existValidators;

    const {
      header: { era_id: latestEraId },
    } = await this.getLatestBlock();

    const validtorsInfo = await this.rpcClient.getValidatorsInfo();

    const currentEraValidators =
      validtorsInfo.auction_state.era_validators.find(
        ({ era_id }) => era_id === latestEraId
      );

    const validatorWeights = currentEraValidators?.validator_weights;

    this.cache.set("validators", validatorWeights);

    return validatorWeights;
  }
}
