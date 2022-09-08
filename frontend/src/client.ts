import { CasperServiceByJsonRPC, CLPublicKey } from 'casper-js-sdk';
import { Block } from './types';

const rpcClient = new CasperServiceByJsonRPC('/node-rpc/');

const DEFAULT_NUM_TO_SHOW = 20;

export const getBlockByHeight = async (height: number) => {
  return await rpcClient.getBlockInfoByHeight(height).then(getBlockResult => {
    const { block } = getBlockResult as any;
    if (!block) throw Error('Missing block');

    return {
      height: block.header.height,
      eraID: block.header.era_id,
      deployCount: block.body.deploy_hashes.length ?? 0 + block.body.transfer_hashes.length ?? 0,
      timestamp: Date.parse(block.header.timestamp.toString()),
      hash: block.hash,
      validatorPublicKey: block.body.proposer,
    };
  });
};

export const getCurrentBlockHeight = async () => {
  const { block } = await rpcClient.getLatestBlockInfo();
  return block!.header.height;
}

export const getBlocks = async (fromHeight?: number, numToShow = DEFAULT_NUM_TO_SHOW) => {
  const currentHeight = fromHeight || await getCurrentBlockHeight();

  const blocks: Block[] = [];

  for (let i = currentHeight; i > currentHeight - numToShow; i--) {
    await getBlockByHeight(i)
      .then(block => {
        blocks.push(block as Block);
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

export const getBalance = async (uref: string) => {
  const stateRootHash = await rpcClient.getStateRootHash();
  const balance = await rpcClient.getAccountBalance(stateRootHash, uref);
  if (balance) {
    return balance.toString();
  }
  return null;
}

export const getDeploy = async (deployHash: string) => {
  const result = await rpcClient.getDeployInfo(deployHash);

  return result;
};

export const getBlock = async (blockHash: string) => {
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
  const { proposer: validatorPublicKey, deploy_hashes: deployHashes, transfer_hashes: transferHashes } = (
    rawBlockData as any
  ).body;


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

  return tailoredBlock as Block;
};

export const getPeers = async () => {
  const { peers } = await rpcClient.getPeers();

  // TODO: Add some underscore->camelcase converter
  return peers.map(p => ({ id: p.node_id, address: p.address }));
};

export default rpcClient;
