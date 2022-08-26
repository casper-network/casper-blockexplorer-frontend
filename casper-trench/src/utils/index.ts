import { price } from '$stores/price';

export const setCSPRPrice = async () => {
	// @ts-ignore
	const casperInformation = await new window.CoinGecko().coins.fetch('casper-network', {});
	price.set(casperInformation.data.market_data.current_price.usd);
};
