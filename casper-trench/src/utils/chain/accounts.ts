import { browser } from '$app/env';
import { bidStore, rpcUrl } from '$stores/chain';
import { isLoading } from '$stores/loading';
import { parseStringValue } from '$utils/converters';
import type { TopAccount } from '$utils/types/account';
// import { CasperClient} from 'casper-js-sdk';
import { ethers } from 'ethers';
import { get } from 'svelte/store';

export const getTopAccounts = async (start: number, count: number): Promise<TopAccount[]> => {
	// @ts-ignore
	const { CasperClient, CLPublicKey } = browser && window.CasperSDK;
	let accounts: TopAccount[] = [];
	const casperClient = CasperClient && new CasperClient(get(rpcUrl));
	const bids = get(bidStore);
	isLoading.set(true);
	if (!bids) {
		return;
	}
	bids?.forEach((bid) => {
		accounts.push({
			publicKey: bid.publicKey,
			accountHash: '',
			balance: 0,
			activeDate: '',
			transferrable: 0,
			stakedAmount: bid.selfStake,
			txnCount: 0
		});
		bid?.delegators?.forEach((delegator) => {
			accounts.push({
				publicKey: delegator.publicKey,
				accountHash: '',
				balance: 0,
				activeDate: '',
				transferrable: 0,
				stakedAmount: delegator.stakedAmount,
				txnCount: 0
			});
		});
	});

	const publicKeys = accounts
		.map((account) => account.publicKey)
		.filter((account, i, publicKeys) => publicKeys.indexOf(account) !== i);
	const accountsByDuplicatePKs = accounts.filter((account) =>
		publicKeys.includes(account.publicKey)
	);
	accountsByDuplicatePKs.forEach((accountsByDuplicatePK, i) => {
		let stakedAmount = 0;
		const filterByPK = accounts.filter(
			(account) => accountsByDuplicatePK.publicKey === account.publicKey
		);
		filterByPK.forEach((account) => {
			stakedAmount += account.stakedAmount;
		});
		accountsByDuplicatePK.stakedAmount = stakedAmount;

		accounts = accounts.filter((account) => account.publicKey !== accountsByDuplicatePK.publicKey);
	});

	const topAccounts = accountsByDuplicatePKs.concat(accounts);

	accounts = topAccounts.sort((a, b) => b.stakedAmount - a.stakedAmount);
	accounts.forEach((account, i) => {
		account.rank = i + 1;
	});
	accounts = accounts.slice(start, start + count);
	for (const account of accounts) {
		const balance = await casperClient.balanceOfByPublicKey(CLPublicKey.fromHex(account.publicKey));
		account.transferrable = parseFloat(ethers.utils.formatUnits(balance, 9));
		account.balance = account.stakedAmount + account.transferrable;
		account.accountHash = CLPublicKey.fromHex(account.publicKey)
			.toAccountHashStr()
			.substring('account-hash-'.length);
	}
	isLoading.set(false);
	return accounts;
};
