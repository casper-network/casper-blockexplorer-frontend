<script lang="ts">
	import StepProgress from '$lib/components/Other/StepProgress.svelte';
	import UndelegateStepFour from '$lib/components/Other/UndelegateDetails/UndelegateStepFour.svelte';
	import UndelegateStepOne from '$lib/components/Other/UndelegateDetails/UndelegateStepOne.svelte';
	import UndelegateStepThree from '$lib/components/Other/UndelegateDetails/UndelegateStepThree.svelte';
	import UnelegateStepTwo from '$lib/components/Other/UndelegateDetails/UnelegateStepTwo.svelte';
	import { account } from '$stores/account';
	import { getAccountBalance } from '$utils/wallets/balance';
	import { delegateUndelegateCasper } from '$utils/wallets/transactions';
	import { onMount } from 'svelte';

	let validatorPublicKey = '';
	let amount = 0;
	let sendMax = false;
	let step: 0 | 1 | 2 | 3 = 0;
	let csprFee = 0.00001;
	let balance: string;
	onMount(async () => {
		balance = await getAccountBalance();
	});
	const undelegate = async () => {
		await delegateUndelegateCasper(validatorPublicKey, amount, 'undelegate');
	};
	$: amount = sendMax ? parseFloat(balance) : 0;
	$: amount = sendMax ? parseFloat(balance) - csprFee : 500;
</script>

<div class="transfer-details">
	<div class="container">
		<StepProgress page="Undelegation details" bind:step />

		{#if step === 0}
			<UndelegateStepOne
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
			<UnelegateStepTwo
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
			<UndelegateStepThree
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
			<UndelegateStepFour
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
