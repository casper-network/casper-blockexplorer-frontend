export const truncateHash = (hash: string) => {
  if (hash.length < 11) throw new Error(`Hash too short: ${hash}`);

  const startingSlice = hash.slice(0, 5);
  const endingSlice = hash.slice(-5, hash.length);

  return `${startingSlice}...${endingSlice}`;
};
