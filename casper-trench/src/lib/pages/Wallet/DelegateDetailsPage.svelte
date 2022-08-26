<script lang="ts">
	import DelegateStepFour from '$lib/components/Other/DelegateDetails/DelegateStepFour.svelte';

	import DelegateStepOne from '$lib/components/Other/DelegateDetails/DelegateStepOne.svelte';
	import DelegateStepThree from '$lib/components/Other/DelegateDetails/DelegateStepThree.svelte';
	import DelegateStepTwo from '$lib/components/Other/DelegateDetails/DelegateStepTwo.svelte';
	import StepProgress from '$lib/components/Other/StepProgress.svelte';
	import { account } from '$stores/account';
	import { getAccountBalance } from '$utils/wallets/balance';
	import { delegateUndelegateCasper } from '$utils/wallets/transactions';
	import { onMount } from 'svelte';

	let validatorPublicKey: string;
	let amount = 500; // Minimum CSPR delegatable
	let sendMax = false;
	let step: 0 | 1 | 2 | 3 = 0;
	let csprFee = 2.5;
	let balance: string;
	onMount(async () => {
		balance = await getAccountBalance();
	});
	const delegate = async () => {
		await delegateUndelegateCasper(validatorPublicKey, amount, 'delegate');
	};
	$: amount = sendMax ? parseFloat(balance) - csprFee : 500;
</script>

<div class="transfer-details">
	<div class="container">
		<StepProgress page="Delegation details" bind:step />

		{#if step === 0}
			<DelegateStepOne
				account={$account}
				bind:validatorPublicKey
				bind:amount
				bind:csprFee
				{balance}
				on:click={() => {
					step = 1;
				}}
			/>
		{:else if step === 1}
			<DelegateStepTwo
				account={$account}
				{validatorPublicKey}
				{amount}
				{csprFee}
				{balance}
				on:click={() => {
					step = 2;
				}}
			/>
		{:else if step === 2}
			<DelegateStepThree
				account={$account}
				{validatorPublicKey}
				{amount}
				on:click={() => {
					// delegate().then(() => {
					step = 3;
					// });
				}}
			/>
		{:else}
			<DelegateStepFour
				account={$account}
				{validatorPublicKey}
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
