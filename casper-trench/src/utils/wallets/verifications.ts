import { browser } from '$app/env';

export const isPublicKey = (publicKey): boolean => {
	const { CLPublicKey } = browser && window.CasperSDK;
	try {
		return !!CLPublicKey.fromHex(publicKey);
	} catch {
		return false;
	}
};
