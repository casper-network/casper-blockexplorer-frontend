export const blockTestHashes = () => {
  const blockHash =
    '548266f0e4f297967f49e4cbf7991995e74aeb21e34059235372f5683717e43e';
  const deployHash =
    'cb514ec905731fce7199a64f1c84b77aae38f40793e6b0e5b10c0a0f8f759073';
  const blockHeight = '1794799';
  const parentHash =
    '1954fd6e4ce356b94339e2acb339b551d4ecd3a0fe7f1a0c537d5778ccd4fbef';
  const validator =
    '01ca2c5b5475e72b5fe3f1d644e8abd1dc9ef7c6920c08f18aff6b3d0a486ead0f';
  const transferDeployHash =
    '14bc663074e33e82a50806e8825456ad43a2b8a291119b099cb34ed2eab370a0';
  const truncatedDeployHash = 'cb514...59073';
  const truncatedTransfer = '14bc6...370a0';
  const truncatedParentHash = '1954f...4fbef';
  const truncatedValidatorHash = '01ca2...ead0f';
  const truncatedBlockHash = '54826...7e43e';

  return {
    truncatedDeployHash,
    truncatedBlockHash,
    truncatedTransfer,
    truncatedParentHash,
    truncatedValidatorHash,
    deployHash,
    blockHash,
    blockHeight,
    transferDeployHash,
    parentHash,
    validator,
  };
};
