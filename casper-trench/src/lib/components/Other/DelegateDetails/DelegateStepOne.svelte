<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Reusables/Button.svelte';

	import Hash from '$lib/components/TableData/Hash.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';

	import YellowWarningIcon from '$lib/icons/YellowWarningIcon.svelte';
	import { getStats } from '$utils/api';
	import { getAccountBalance } from '$utils/wallets/balance';
	import NumberInput from '$lib/components/Reusables/NumberInput.svelte';

	export let validatorPublicKey: string;
	export let amount = 500; // Minimum CSPR delegatable
	export let balance;
	export let csprFee = 2.5;
	export let account;

	let sendMax = false;
	let editValidator = true;
	$: amount = sendMax ? parseFloat(balance) - csprFee : 500;

	const limit = 500;

	let validatorImg = 'https://foreststaking.com/static/media/logo.3392a286.svg';
	let validatorCSPRPerc = 0.12;
	let delegatorPerc = 0.0123;
	let numberOfDelegators = 14;
</script>

<div class="title">Delegation details</div>
{#if !$account}
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
		<div>Account</div>
		<div>Balance</div>
	</div>
	<div class="value grey">
		<span
			><Hash start color="grey" noOfCharacters={20} hash={$account?.publicKey || ''} />
			<div class="copy-icon">
				{#if $account?.publicKey}
					<CopyIcon text={$account?.publicKey || ''} />
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

{#if editValidator}
	<div class="input-wrapper">
		<div class="top">Validator</div>
		<div class="input">
			<input
				type="text"
				bind:value={validatorPublicKey}
				placeholder="Enter address or contract"
				on:blur={() => {
					// TODO Change condition to when validator is found
					if (validatorPublicKey.length > 0) {
						editValidator = false;
					}
				}}
			/>
		</div>
	</div>
{:else}
	<div class="sender">
		<div class="top">
			<div>Validator</div>
		</div>
		<div
			class="value validator-display"
			on:click={() => {
				editValidator = true;
			}}
		>
			<div class="validator-hash">
				<img src={validatorImg} alt="validator" />
				<Hash color="black" noOfCharacters={10} hash={validatorPublicKey || ''} />
				<div class="copy-icon">
					{#if validatorPublicKey}
						<CopyIcon text={validatorPublicKey || ''} />
					{/if}
				</div>
			</div>
			<div class="validator-cspr">
				<div class="cspr">
					<span class="cspr-fee">{Math.round(delegatorPerc * 10000) / 100}%</span>
				</div>
				<div class="perc">({numberOfDelegators} delegators)</div>
			</div>
			<div class="validator-cspr">
				<div class="cspr"><span class="cspr-fee">{(amount + csprFee).toFixed(5)}</span> CSPR</div>
				<div class="perc">({Math.round(validatorCSPRPerc * 100)}%)</div>
			</div>
		</div>
	</div>
{/if}

<NumberInput bind:amount {limit} bind:sendMax>Delegate max</NumberInput>

<div class="warning">
	<div class="header">
		<div class="icon">
			<YellowWarningIcon />
		</div>
		<div class="text">WARNING!</div>
	</div>
	<div class="info">
		Delegating max will zero your liquid balance. You won’t be able to undergate, because
		undelegation requires 2.5 CSPR minimum liquid balance.
	</div>
</div>

<div class="fee">
	<div class="left">Transaction Fee</div>
	<div class="right">
		<div class="cspr"><span class="cspr-fee">{csprFee.toFixed(5)}</span> CSPR</div>
		{#await getStats()}
			Loading ...
		{:then stats}
			<!-- TODO Get price from CoinGecko -->
			<div class="cash">
				${Math.floor(csprFee * stats.price * 100000000) / 100000000 || '0'}
			</div>
		{/await}
	</div>
</div>

<div class="terms">
	By using Casper.info, you acknowledge that you have read, understood and accepted our. <span
		class="green">Terms of Service.</span
	>
</div>
<div class="next-button">
	<Button wider gradient on:click>Next</Button>
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
		@apply border-color-sender-background border-[clamp(1px,0.12vw,0.12vw)];
	}

	.validator-display {
		@apply bg-white;
		@apply py-[clamp(12px,0.71vw,0.71vw)];
	}

	.validator-hash {
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.validator-hash > img {
		@apply rounded-full;
		@apply h-full;
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
		@apply text-[clamp(10px,0.71vw,0.71vw)] leading-none;
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
		@apply py-[clamp(16px,1.43vw,1.43vw)];
		@apply border-t-color-transfer-details-border border-t-[clamp(1px,0.12vw,0.12vw)];
	}

	.cash {
		@apply text-color-table-header text-[clamp(16px,1.07vw,1.07vw)] font-bold;
	}

	.right {
		@apply text-right;
	}

	.input {
		@apply px-[clamp(16px,1.25vw,1.25vw)] py-[clamp(12px,0.95vw,0.95vw)];
		@apply text-[clamp(16px,1.07vw,1.07vw)] text-color-black-text;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply flex items-center justify-between;
		@apply mb-[clamp(4px,0.71vw,0.71vw)];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-input-border;
	}

	.next-button {
		@apply mt-[clamp(16px,2.92vw,2.92vw)];
		@apply flex justify-center;
	}

	.perc {
		@apply text-[clamp(12px,0.83vw,0.83vw)] text-right;
	}
</style>
