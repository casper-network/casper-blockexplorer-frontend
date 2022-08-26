import { writable } from 'svelte/store';

interface Account {
	publicKey: string;
	accountHash: string;
	network: 'casper' | 'casper-test';
}
export const account = writable<Account>(null);
