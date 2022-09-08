export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);

  // add to satisfy onClick TS typing
  return undefined;
};
