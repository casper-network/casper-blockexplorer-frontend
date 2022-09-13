import { CasperServiceByJsonRPC, CLPublicKey } from 'casper-js-sdk';
import { Block, Deploy, DeployStatus, Peer } from '../types';

const DEFAULT_NUM_TO_SHOW = 20;

// temporary add to deal with incorrect types from the SDK
// TODO: update the SDK types to be more accurate
interface BlockBody {
  proposer: string;
  deploy_hashes?: string[];
  transfer_hashes?: string[];
}

export class RpcApi {
  constructor(
    private readonly rpcClient: CasperServiceByJsonRPC,
    private readonly defaultPagination: number,
  ) {}

  getBlock: (blockHash: string) => Promise<Block | undefined> =
    async blockHash => {
      const blockResult = await this.rpcClient.getBlockInfo(blockHash);

      const { block: rawBlockData } = blockResult;

      if (!rawBlockData) return;

      const { hash, header } = rawBlockData;

      const {
        timestamp,
        height,
        era_id: eraID,
        state_root_hash: stateRootHash,
        parent_hash: parentHash,
      } = header;

      // there are a few incorrect types coming from the SDK here..
      const {
        proposer: validatorPublicKey,
        deploy_hashes: deployHashes,
        transfer_hashes: transferHashes,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      } = (rawBlockData as any).body as BlockBody;

      const countHashes = deployHashes || transferHashes;
      const deployCount = countHashes ? countHashes.length : 0;

      const tailoredBlock = {
        timestamp,
        height,
        eraID,
        hash,
        validatorPublicKey,
        deployCount,
        transferHashes,
        deployHashes,
        stateRootHash,
        parentHash,
      };

      return tailoredBlock;
    };

  getPeers: () => Promise<Peer[]> = async () => {
    const { peers } = await this.rpcClient.getPeers();

    return peers.map(p => ({ id: p.node_id, address: p.address }));
  };

  getDeploy: (deployHash: string) => Promise<Deploy | undefined> =
    async deployHash => {
      const { deploy, execution_results: executionResults } =
        await this.rpcClient.getDeployInfo(deployHash);

      const { header, approvals } = deploy;

      const { timestamp, gas_price: gasPrice } = header;

      const { block_hash: blockHash, result: executionResult } =
        executionResults[0];

      const { signature: publicKey } = approvals[0];

      const status = executionResult.Success
        ? DeployStatus.Success
        : DeployStatus.Failed;

      const cost = executionResult.Success
        ? executionResult.Success.cost
        : executionResult.Failure?.cost ?? 0;

      return {
        timestamp,
        deployHash,
        blockHash,
        publicKey,
        paymentAmount: gasPrice.toString(),
        cost: cost.toString(),
        status,
      };
    };

  getAccount = async (publicKeyHex: string) => {
    const stateRootHash = await this.rpcClient.getStateRootHash();
    const accountHash = CLPublicKey.fromHex(publicKeyHex).toAccountHashStr();

    const { Account: account } = await this.rpcClient.getBlockState(
      stateRootHash,
      accountHash,
      [],
    );

    if (!account) return;

    return {
      rawAccountHash: accountHash,
      trimmedAccountHash: accountHash.slice(13),
      publicKey: publicKeyHex,
      mainPurse: account.mainPurse,
    };
  };

  getBalance: (uref: string) => Promise<string | null> = async uref => {
    const stateRootHash = await this.rpcClient.getStateRootHash();
    const balance = await this.rpcClient.getAccountBalance(stateRootHash, uref);

    if (balance) {
      return balance.toString();
    }

    return null;
  };

  getCurrentBlockHeight: () => Promise<number> = async () => {
    const { block } = await this.rpcClient.getLatestBlockInfo();
    return block!.header.height;
  };

  getBlockByHeight: (height: number) => Promise<Block> = async (
    height: number,
  ) => {
    return this.rpcClient.getBlockInfoByHeight(height).then(getBlockResult => {
      const { block } = getBlockResult;

      if (!block) throw Error('Missing block');

      const { hash, header } = block;

      const {
        timestamp,
        era_id: eraID,
        state_root_hash: stateRootHash,
        parent_hash: parentHash,
      } = header;

      // there are a few incorrect types coming from the SDK here..
      const {
        proposer: validatorPublicKey,
        deploy_hashes: deployHashes,
        transfer_hashes: transferHashes,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      } = (block as any).body as BlockBody;

      const countHashes = deployHashes || transferHashes;
      const deployCount = countHashes ? countHashes.length : 0;

      return {
        hash,
        height,
        eraID,
        deployCount,
        timestamp: Date.parse(timestamp.toString()),
        validatorPublicKey,
        stateRootHash,
        parentHash,
      } as Block;
    });
  };

  getBlocks: (fromHeight?: number, numToShow?: number) => Promise<Block[]> =
    async (fromHeight, numToShow = this.defaultPagination) => {
      const currentHeight = fromHeight || (await this.getCurrentBlockHeight());

      const blocks: Block[] = [];

      for (let i = currentHeight; i > currentHeight - numToShow; i--) {
        await this.getBlockByHeight(i)
          .then(block => {
            blocks.push(block);
          })
          .catch(err => {
            console.error('Block By Height Error: ', err);
          });
      }

      return blocks;
    };
}

const casperJsonRpcService = new CasperServiceByJsonRPC('/node-rpc/');

export const casperApi = new RpcApi(casperJsonRpcService, DEFAULT_NUM_TO_SHOW);
