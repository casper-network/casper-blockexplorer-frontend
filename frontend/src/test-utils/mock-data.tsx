import { Block } from '../api';

export const mockBlock: Block = {
  height: 1,
  eraID: 1,
  deployCount: 1,
  deployHashes: ['deploy-hash'],
  transferHashes: [],
  timestamp: 123456789,
  readableTimestamp: 'Dec 25th, 1975',
  timeSince: 'Forever Ago..',
  hash: 'block-hash',
  validatorPublicKey: 'validator-public-key',
  parentHash: 'parent-hash',
  stateRootHash: 'state-root-hash',
  rawBlock: '{}',
};

export const createMockBlocks = (numberOfBlocks: number = 10) => {
  const blocks = new Array(numberOfBlocks).fill(mockBlock) as Block[];

  return blocks.map((block, index) => {
    return { ...block, hash: `${block.hash}-${index}` };
  });
};
