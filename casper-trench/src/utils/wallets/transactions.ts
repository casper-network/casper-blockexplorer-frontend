import { account } from '$stores/account';
import { notifyError, notifySuccess } from '$utils/toast';
import { ethers } from 'ethers';
import { get } from 'svelte/store';

export const signTransfer = async (
	deploy: any,
	toPublicKey: string,
	networkName: 'casper' | 'casper-test' = 'casper-test'
) => {
	// @ts-ignore
	const { CasperClient, DeployUtil } = window.CasperSDK;
	const json = DeployUtil.deployToJson(deploy);
	return await window.casperlabsHelper
		.sign(json, get(account).publicKey, toPublicKey)
		.then(async (signature) => {
			const casperClient = new CasperClient(
				networkName === 'casper'
					? `${import.meta.env.VITE_MAINNET_RPC_URL}`
					: `${import.meta.env.VITE_TESTNET_RPC_URL}`
			);
			const deployObject = DeployUtil.deployFromJson(signature);
			if (deployObject.val instanceof DeployUtil.Deploy) {
				(await casperClient.putDeploy(deployObject.val))
					? notifySuccess('Transfer successful')
					: notifyError(`Failed to make your transfer`);
			}
		});
};

export const getTransferDeploy = (
	toPublicKey: string,
	amount: number,
	networkName: 'casper' | 'casper-test' = 'casper-test',
	id: number
) => {
	// @ts-ignore
	const { CLPublicKey, DeployUtil } = window.CasperSDK;
	const fromPublicKey = CLPublicKey.fromHex(get(account)?.publicKey);
	const params = new DeployUtil.DeployParams(fromPublicKey, networkName, 1, 1800000);
	const session = DeployUtil.ExecutableDeployItem.newTransfer(
		ethers.utils.parseUnits(amount.toString(), 9),
		CLPublicKey.fromHex(toPublicKey),
		null,
		id
	);
	return DeployUtil.makeDeploy(params, session, DeployUtil.standardPayment(100000000));
};
// Validator public key 01028e248170a7f328bf7a04696d8f271a1debb54763e05e537eefc1cf24531bc7
export const delegateUndelegateCasper = async (
	validatorPublicKey: string,
	amount: number,
	transactionType: 'delegate' | 'undelegate',
	networkName: 'casper' | 'casper-test' = 'casper-test'
) => {
	// @ts-ignore
	const { CasperClient, CLPublicKey, CLValueBuilder, DeployUtil, RuntimeArgs } = window.CasperSDK;
	const fromPublicKey = CLPublicKey.fromHex(get(account)?.publicKey);
	const params = new DeployUtil.DeployParams(fromPublicKey, networkName);
	const args = RuntimeArgs.fromMap({
		delegator: fromPublicKey,
		validator: CLPublicKey.fromHex(validatorPublicKey),
		amount: CLValueBuilder.u512(ethers.utils.parseUnits(amount.toString(), 9))
	});
	let contractHash =
		networkName === 'casper'
			? `${import.meta.env.VITE_MAINNET_CONTRACT_HASH}`
			: `${import.meta.env.VITE_TESTNET_CONTRACT_HASH}`;

	const session = DeployUtil.ExecutableDeployItem.newStoredContractByHash(
		Uint8Array.from(Buffer.from(contractHash, 'hex')),
		transactionType,
		args
	);

	const deploy = DeployUtil.makeDeploy(
		params,
		session,
		DeployUtil.standardPayment(transactionType === 'delegate' ? 2500000000 : 10000)
	);
	const json = DeployUtil.deployToJson(deploy);
	await window.casperlabsHelper
		.sign(json, get(account).publicKey, validatorPublicKey)
		.then(async (signature) => {
			const casperClient = new CasperClient(
				networkName === 'casper'
					? `${import.meta.env.VITE_MAINNET_RPC_URL}`
					: `${import.meta.env.VITE_TESTNET_RPC_URL}`
			);
			const deployObject = DeployUtil.deployFromJson(signature);
			if (deployObject.val instanceof DeployUtil.Deploy) {
				(await casperClient.putDeploy(deployObject.val))
					? notifySuccess(
							`${
								transactionType.charAt(0).toUpperCase() +
								transactionType.substring(1, transactionType.length - 1)
							}ion successful`
					  )
					: notifyError(`Failed to make your ${transactionType}`);
			}
		});
};
