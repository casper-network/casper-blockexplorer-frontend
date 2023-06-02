export const accountTestData = () => {
  // from mainnet
  const publicKey =
    '018f84c6fc037284f189cc8cb49f89212ff434a5eb050e48cdd164ff3890fbff69';
  const accountHash =
    'b7e3617083ec93d15ca8d6a570bc9b9b8508b3a877c9cf94fb3d327a69f33b7a';
  const truncatedAccountHash = 'b7e36...33b7a';
  const balance = '25,586,897,096,141 Motes';

  return {
    publicKey,
    accountHash,
    truncatedAccountHash,
    balance,
  };
};
