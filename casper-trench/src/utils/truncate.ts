export const truncateString = (str: string): string => {
	return `${str.substring(0, 6)}...${str.substring(str.length - 6)}`;
};
