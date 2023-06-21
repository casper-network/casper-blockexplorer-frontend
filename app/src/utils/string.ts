export const capitalizeWords = (words: string) => {
  const splitWords = words.split(' ');

  const capitalizedWords = splitWords.map(
    word => word.charAt(0).toUpperCase() + word.slice(1),
  );

  return capitalizedWords.join(' ');
};
