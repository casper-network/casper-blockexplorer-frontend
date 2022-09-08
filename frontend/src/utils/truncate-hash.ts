export const truncateHash = (hash: string) => {
  const startingSlice = hash.slice(0, 5);
  const endingSlice = hash.slice(-6, -1);
  return `${startingSlice}...${endingSlice}`;
};
