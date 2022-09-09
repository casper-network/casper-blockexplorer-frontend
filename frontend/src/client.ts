import { CasperServiceByJsonRPC, CLPublicKey } from 'casper-js-sdk';
import { Block, Deploy, DeployStatus, Peer } from './types';

const rpcClient = new CasperServiceByJsonRPC('/node-rpc/');

const DEFAULT_NUM_TO_SHOW = 20;

export const getBlockByHeight: (height: number) => Promise<Block> = async (
  height: number,
) => {
  return rpcClient.getBlockInfoByHeight(height).then(getBlockResult => {
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
    } = (block as any).body;

    // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands
    const deployCount = deployHashes?.length ?? 0 + transferHashes?.length ?? 0;

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

export const getCurrentBlockHeight: () => Promise<number> = async () => {
  const { block } = await rpcClient.getLatestBlockInfo();
  return block!.header.height;
};

export const getBlocks: (
  fromHeight?: number,
  numToShow?: number,
) => Promise<Block[]> = async (fromHeight, numToShow = DEFAULT_NUM_TO_SHOW) => {
  const currentHeight = fromHeight || (await getCurrentBlockHeight());

  const blocks: Block[] = [];

  for (let i = currentHeight; i > currentHeight - numToShow; i--) {
    await getBlockByHeight(i)
      .then(block => {
        blocks.push(block);
      })
      .catch(err => {
        console.log('Block By Height Error: ', err);
      });
  }

  return blocks;
};

export const getAccount = async (publicKeyHex: string) => {
  const stateRootHash = await rpcClient.getStateRootHash();
  const accountHash = CLPublicKey.fromHex(publicKeyHex).toAccountHashStr();
  const result = await rpcClient.getBlockState(stateRootHash, accountHash, []);

  return result;
};

export const getBalance: (
  uref: string,
) => Promise<string | null> = async uref => {
  const stateRootHash = await rpcClient.getStateRootHash();
  const balance = await rpcClient.getAccountBalance(stateRootHash, uref);

  if (balance) {
    return balance.toString();
  }

  return null;
};

export const getDeploy: (
  deployHash: string,
) => Promise<Deploy | undefined> = async deployHash => {
  const { deploy, execution_results: executionResults } =
    await rpcClient.getDeployInfo(deployHash);

  const { header, approvals } = deploy;

  const { timestamp } = header;

  const { block_hash: blockHash, result: executionResult } =
    executionResults[0];

  const { signer: publicKey } = approvals[0];

  const status = executionResult.Success
    ? DeployStatus.Success
    : DeployStatus.Failed;

  return {
    timestamp,
    deployHash,
    blockHash,
    publicKey,
    status,
  };
};

export const getBlock: (
  blockHash: string,
) => Promise<Block | undefined> = async blockHash => {
  const blockResult = await rpcClient.getBlockInfo(blockHash);

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
  } = (rawBlockData as any).body;

  // eslint-disable-next-line no-unsafe-optional-chaining, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/restrict-plus-operands
  const deployCount = deployHashes?.length ?? 0 + transferHashes?.length ?? 0;

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

export const getPeers: () => Promise<Peer[]> = async () => {
  const { peers } = await rpcClient.getPeers();

  return peers.map(p => ({ id: p.node_id, address: p.address }));
};

export default rpcClient;
