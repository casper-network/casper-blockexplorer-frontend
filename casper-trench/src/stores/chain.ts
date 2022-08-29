import type { Bid } from '$utils/types/validator';
// import type { CasperServiceByJsonRPC } from 'casper-js-sdk';
import { get, writable } from 'svelte/store';

export const network = writable<string>('casper-test');
export const rpcUrl = writable<string>(
  // 'http://65.21.235.219:7777/rpc'
  '/node-rpc/'
	// get(network) === 'casper-test'
	// 	? 'https://casper-node.tor.us'
	// 	: 'https://node-clarity-testnet.make.services/rpc'
);
// export const rpcUrl = writable<string>(
// 	get(network) === 'casper'
// 		? 'http://mainnet.gosuto.io:7777/rpc'
// 		: 'http://testnet.gosuto.io:7777/rpc'
// );

// export const csprService = writable<CasperServiceByJsonRPC>(null);
export const csprService = writable(null);
export const bidStore = writable<Bid[]>(null);
export const lastBidUpdateTime = writable<number>(0);
