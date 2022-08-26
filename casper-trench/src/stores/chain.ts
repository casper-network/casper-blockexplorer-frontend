import type { Bid } from '$utils/types/validator';
// import type { CasperServiceByJsonRPC } from 'casper-js-sdk';
import { get, writable } from 'svelte/store';

export const network = writable<'casper' | 'casper-test'>('casper');
export const rpcUrl = writable<string>(
	get(network) === 'casper'
		? 'https://casper-node.tor.us'
		: 'https://node-clarity-testnet.make.services/rpc'
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
