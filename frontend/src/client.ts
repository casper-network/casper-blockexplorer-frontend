import { CasperServiceByJsonRPC, CLPublicKey } from 'casper-js-sdk';
import { Block } from './types';

const rpcClient = new CasperServiceByJsonRPC('/node-rpc/');

const NUM_TO_SHOW = 20;

export const getCurrentBlockHeight = async () => {
  const { block } = await rpcClient.getLatestBlockInfo();
  const currentHeight = block!.header.height;

  return currentHeight;
};

export const getBlocks = async () => {
  const currentHeight = await getCurrentBlockHeight();

  const blocks: Block[] = [];

  for (let i = currentHeight; i > currentHeight - NUM_TO_SHOW; i--) {
    await rpcClient
      .getBlockInfoByHeight(i)
      .then(getBlockResult => {
        const { block } = getBlockResult;

        if (!block) throw Error('Missing block');

        // TODO: update typing to include body
        const blockBody = (block as any).body;

        blocks.push({
          height: block.header.height,
          eraID: block.header.era_id,
          transactions: blockBody.deploy_hashes.length ?? 0,
          timestamp: Date.parse(block.header.timestamp.toString()),
          hash: block.hash,
          validatorPublicKey: blockBody.proposer,
          parentHash: blockBody.parent_hash,
        });
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

export const getDeploy = async (deployHash: string) => {
  const result = await rpcClient.getDeployInfo(deployHash);

  return result;
};

export const getPeers = async () => {
  const { peers } = await rpcClient.getPeers();

  // TODO: Add some underscore->camelcase converter
  return peers.map(p => ({ id: p.node_id, address: p.address }));
};

export default rpcClient;
