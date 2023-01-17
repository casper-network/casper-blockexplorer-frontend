export const isValidHash = (hash: string) => {
  return /^[0-9a-fA-F]{64}$/.test(hash);
};

export const isValidPublicKey = (publicKey: string) => {
  return /^0(1[0-9a-fA-F]{64}|2[0-9a-fA-F]{66})$/.test(publicKey);
};
