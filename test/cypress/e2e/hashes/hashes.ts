export const hashes = () => {
  // from mainnet
  const publicKey =
    '018f84c6fc037284f189cc8cb49f89212ff434a5eb050e48cdd164ff3890fbff69';
  const accountHash =
    'b7e3617083ec93d15ca8d6a570bc9b9b8508b3a877c9cf94fb3d327a69f33b7a';
  const truncatedAccountHash = 'b7e36...33b7a';
  const blockHash =
    'a03e3221106479c257c8c5e6cde1e279bb9e28e70c38ca2593cb3a7806e2090a';
  const deployHash =
    '7e2cad6ae20875b6a3ffcbb4e743ab5e0fc0f8b5ecc444e222f0204a7ee9120f';
  const blockHeight = '1774040';

  const hashContainingSpaces =
    'a 3e 3221106479c257c8c5e6cde1e279bb9e28e70c38ca2593cb3a7806e2090a';
  const hashContainingNonHexadecimalCharacters =
    '%&18f84c6fc037284f189cc8cb49f89212ff434a5eb050e48cdd164ff3890fbff69';
  const hashContainingTooManyCharacters =
    '018f84c6fc037284f189cc8cb49f89212ff434a5eb050e48cdd164ff3890fbff69ff3890fbff69';

  return {
    publicKey,
    accountHash,
    truncatedAccountHash,
    deployHash,
    blockHash,
    blockHeight,
    hashContainingSpaces,
    hashContainingNonHexadecimalCharacters,
    hashContainingTooManyCharacters,
  };
};
