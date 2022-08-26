import { account } from '$stores/account';
import { notifyError } from '$utils/toast';
import { get } from 'svelte/store';

export const connectCasperSigner = async (network: 'casper' | 'casper-test' = 'casper-test') => {
	// @ts-ignore
	const { CLPublicKey } = window.CasperSDK;
	console.log('SIgner: ', window.casperlabsHelper);
	if (await window.casperlabsHelper.isConnected()) {
		window.casperlabsHelper
			.getActivePublicKey()
			.then((publicKey) => {
				const accountHash = CLPublicKey.fromHex(publicKey)
					.toAccountHashStr()
					.substring('account-hash-'.length);
				account.set({ publicKey, accountHash, network });
				window.localStorage.setItem('account', JSON.stringify(get(account)));
			})
			.catch((err) => {
				notifyError('Failed to get public key. Please check your wallet');
			});
	} else {
		window.casperlabsHelper.requestConnection();
	}
};

export const disconnectWallet = async () => {
	window.casperlabsHelper.disconnectFromSite();
	account.set(null);
	window.localStorage.removeItem('account');
};
