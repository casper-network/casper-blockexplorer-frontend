<script lang="ts">
	import StepProgress from '$lib/components/Other/StepProgress.svelte';
	import TransferStepFour from '$lib/components/Other/TransferDetails/TransferStepFour.svelte';
	import TransferStepOne from '$lib/components/Other/TransferDetails/TransferStepOne.svelte';
	import TransferStepThree from '$lib/components/Other/TransferDetails/TransferStepThree.svelte';
	import TransferStepTwo from '$lib/components/Other/TransferDetails/TransferStepTwo.svelte';
	import { account } from '$stores/account';
	import { notifyError } from '$utils/toast';
	import { getAccountBalance } from '$utils/wallets/balance';
	import { getTransferDeploy, signTransfer } from '$utils/wallets/transactions';
	import { onMount } from 'svelte';
	let recipientPublicKey = '';
	let amount = 2.5; // Minimum CSPR transferrable is 2.5
	let txID = 1659607320459;
	let step: 0 | 1 | 2 | 3 = 0;
	let csprFee = 0.1;
	let balance: string;
	let deployHash = '';
	let recipientAccountHash = '';
	let deploy: any;
	onMount(async () => {
		balance = await getAccountBalance();
	});

	const signAndDeploy = async () => {
		await signTransfer(deploy, recipientPublicKey)
			.then(() => {
				step = 3;
			})
			.catch(() => {
				notifyError('Could not sign your request');
			});
	};
	const setDeployAndRecipientHash = () => {
		// @ts-ignore
		const { CLPublicKey } = window.CasperSDK;
		deploy = getTransferDeploy(recipientPublicKey, amount, 'casper-test', txID);
		deployHash = window.Buffer.from(deploy?.hash).toString('hex');
		recipientAccountHash = window.Buffer.from(
			CLPublicKey.fromHex(recipientPublicKey).toAccountHash()
		).toString('hex');
	};
</script>

<div class="transfer-details">
	<div class="container">
		<StepProgress page="Transfer Details" bind:step />

		{#if step === 0}
			<TransferStepOne
				account={$account}
				bind:recipientPublicKey
				bind:amount
				bind:txID
				bind:csprFee
				{balance}
				on:click={() => {
					step = 1;
				}}
			/>
		{:else if step === 1}
			<TransferStepTwo
				{recipientPublicKey}
				{amount}
				{csprFee}
				on:click={() => {
					setDeployAndRecipientHash();
					step = 2;
				}}
			/>
		{:else if step === 2}
			<TransferStepThree
				{recipientPublicKey}
				{recipientAccountHash}
				{deployHash}
				{amount}
				on:click={async () => {
					await signAndDeploy();
				}}
			/>
		{:else}
			<TransferStepFour
				{recipientPublicKey}
				{deployHash}
				{amount}
				{csprFee}
				on:click={() => {
					step = 0;
				}}
			/>
		{/if}
	</div>
</div>

<style lang="postcss">
	.transfer-details {
		@apply text-color-table-header;
	}

	.container {
		@apply md:max-w-[39.29vw] mx-4 md:mx-auto;
	}
</style>
