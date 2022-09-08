import { CasperServiceByJsonRPC, CLPublicKey } from 'casper-js-sdk';
import { Block } from './types';

const rpcClient = new CasperServiceByJsonRPC('/node-rpc/');

const NUM_TO_SHOW = 20;

export const getBlockByHeight = async (height: number) => {
  return await rpcClient.getBlockInfoByHeight(height).then(getBlockResult => {
    const { block } = getBlockResult as any;
    if (!block) throw Error('Missing block');
    return {
      height: block.header.height,
      eraID: block.header.era_id,
      transactions: block.body.deploy_hashes.length ?? 0,
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

export const getBlocks = async () => {
  const currentHeight = await getCurrentBlockHeight();

  const blocks: Block[] = [];

  for (let i = currentHeight; i > currentHeight - NUM_TO_SHOW; i--) {
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
