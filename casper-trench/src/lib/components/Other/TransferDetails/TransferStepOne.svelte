<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Reusables/Button.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import { getStats } from '$utils/api';
	import { getAccountBalance } from '$utils/wallets/balance';
	import NumberInput from '$lib/components/Reusables/NumberInput.svelte';
	import YellowWarningIcon from '$lib/icons/YellowWarningIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { isPublicKey } from '$utils/wallets/verifications';
	import TextInput from '$lib/components/Reusables/TextInput.svelte';
	import { price } from '$stores/price';

	export let account;
	let minimumAmount = 2.5;
	export let recipientPublicKey = '';
	export let amount = minimumAmount;
	export let txID = 1659607320459;
	export let csprFee = 0.1;
	export let balance: string;

	$: amount = sendMax ? parseFloat(balance) - csprFee : minimumAmount;

	let sendMax = false;
</script>

<div class="title">Transfer Details</div>
{#if !account}
	<div class="sign-in-alert">
		<div class="icon">
			<YellowWarningIcon black />
		</div>
		<div class="text">
			You’re not signed in. <span
				class="green"
				on:click={() => {
					goto('/sign-in');
				}}>Sign in</span
			> with a compatible wallet like Signer or Ledger to continue.
		</div>
	</div>
{/if}

<div class="sender">
	<div class="top">
		<div>Sender</div>
		<div>Balance</div>
	</div>
	<div class="value grey">
		<span
			><Hash start color="grey" noOfCharacters={20} hash={account?.publicKey || ''} />
			<div class="copy-icon">
				{#if account?.publicKey}
					<CopyIcon text={account?.publicKey || ''} />
				{/if}
			</div></span
		>
		<span
			>{#await getAccountBalance()}
				Loading ...
			{:then balance}
				{balance} CSPR
			{/await}</span
		>
	</div>
</div>
<TextInput
	label={'Recipient'}
	bind:value={recipientPublicKey}
	error={recipientPublicKey && !isPublicKey(recipientPublicKey)
		? 'Please enter a valid public key.'
		: ''}
	placeholder={'Enter address or contract'}
/>
<div class="warning">
	<div class="header">
		<div class="icon">
			<YellowWarningIcon />
		</div>
		<div class="text">WARNING!</div>
	</div>
	<div class="info">
		Please double check the accuracy of the recipient public key. Funds sent to an incorrect public
		key cannot be recovered.
	</div>
</div>

<NumberInput bind:amount bind:limit={minimumAmount} bind:sendMax>Send max amount</NumberInput>

<div class="input-wrapper">
	<div class="top">Transfer ID (Memo)</div>
	<div class="input">
		<input type="number" bind:value={txID} placeholder="1234567890" />
	</div>
</div>

<div class="fee">
	<div class="left">Transaction Fee</div>
	<div class="right">
		<div class="cspr"><span class="cspr-fee">{csprFee.toFixed(5)}</span> CSPR</div>
		<div class="cash">
			${Math.floor(csprFee * $price * 100000000) / 100000000 || '0'}
		</div>
	</div>
</div>

<div class="terms">
	By using Casper.info, you acknowledge that you have read, understood and accepted our. <a
		href="/"
		class="green">Terms of Service.</a
	>
</div>
<div class="next-button">
	<Button
		disabled={amount > parseFloat(balance && balance) ||
			amount < minimumAmount ||
			!recipientPublicKey ||
			!isPublicKey(recipientPublicKey)}
		wider
		gradient
		on:click>Next</Button
	>
</div>

<style lang="postcss">
	.copy-icon {
		@apply w-[clamp(16px,2vw,2vw)] h-[clamp(16px,2vw,2vw)];
	}

	.title {
		@apply text-color-table-header font-bold text-[clamp(20px,1.43vw,1.43vw)];
		@apply mb-[clamp(12px,0.83vw,0.83vw)] mt-[clamp(16px,2.26vw,2.26vw)];
	}

	.value > span {
		@apply flex items-center;
	}

	.sign-in-alert {
		@apply flex items-center gap-[clamp(4px,0.6vw,0.6vw)];
		@apply text-[clamp(10px,0.77vw,0.77vw)] text-color-black-text;
		@apply px-[clamp(16px,1.25vw,1.25vw)] py-[clamp(12px,0.95vw,0.95vw)];
		@apply bg-color-tranfer-det-green;
		@apply rounded-[0.24vh] md:rounded-[0.24vw];
		@apply mb-[clamp(16px,1.43vw,1.43vw)];
	}

	.sign-in-alert > .icon {
		@apply w-[0.95vh] h-[0.95vh] md:w-[0.95vw] md:h-[0.95vw];
	}

	.top {
		@apply flex justify-between items-center;
		@apply mb-[clamp(4px,0.6vw,0.6vw)];
		@apply text-color-black-text text-[clamp(16px,1.07vw,1.07vw)];
	}

	.value {
		@apply bg-color-sender-background;
		@apply px-[clamp(16px,1.25vw,1.25vw)] py-[clamp(12px,0.95vw,0.95vw)];
		@apply text-[clamp(10px,0.77vw,0.77vw)];
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply mb-[clamp(16px,1.9vw,1.9vw)];
		@apply flex items-center justify-between;
	}

	.input {
		@apply px-[clamp(16px,1.25vw,1.25vw)] py-[clamp(12px,0.95vw,0.95vw)];
		@apply text-[clamp(16px,1.07vw,1.07vw)] text-color-black-text;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply flex items-center justify-between;
		@apply mb-[clamp(4px,0.71vw,0.71vw)];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-input-border;
	}

	.input-wrapper {
		@apply mb-[clamp(16px,1.9vw,1.9vw)];
	}

	.input > input {
		@apply outline-none;
		@apply w-[90%];
	}

	.warning {
		@apply mb-[clamp(16px,1.43vw,1.43vw)];
		@apply text-[clamp(10px,0.77vw,0.77vw)];
	}

	.terms,
	.warning,
	.left,
	.cspr,
	.grey {
		@apply text-color-grey-footer-label;
	}

	.cspr {
		@apply text-[clamp(10px,0.71vw,0.71vw)];
		@apply flex items-center justify-end gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.cspr-fee {
		@apply text-color-table-header text-[clamp(16px,1.07vw,1.07vw)];
	}

	.terms {
		@apply text-[clamp(10px,0.77vw,0.77vw)];
	}

	.header {
		@apply flex items-center gap-[clamp(4px,0.3vw,0.3vw)];
		@apply text-color-table-header font-medium;
		@apply mb-[clamp(4px,0.48px,0.48px)];
	}

	.header > .icon {
		@apply w-[0.95vh] h-[0.95vh] md:w-[0.95vw] md:h-[0.95vw];
	}

	.green {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.fee {
		@apply flex justify-between items-center;
		@apply text-[clamp(16px,1.07vw,1.07vw)];
		@apply mb-[clamp(16px,2.55vw,2.55vw)];
	}

	.cash {
		@apply text-color-table-header text-[clamp(16px,1.07vw,1.07vw)] font-bold;
	}

	.right {
		@apply text-right;
	}

	.next-button {
		@apply mt-[clamp(16px,2.92vw,2.92vw)];
		@apply flex justify-center;
	}
</style>
