<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Reusables/Button.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import CircleCheckMarkIcon from '$lib/icons/CircleCheckMarkIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import YellowWarningIcon from '$lib/icons/YellowWarningIcon.svelte';
	import { getStats } from '$utils/api';
	import { getAccountBalance } from '$utils/wallets/balance';

	export let validatorPublicKey: string;
	export let amount = 500; // Minimum CSPR delegatable
	export let csprFee = 2.5;
	export let account;

	let validatorImg = 'https://foreststaking.com/static/media/logo.3392a286.svg';
	let validatorCSPRPerc = 0.12;
	let deployHash = '8942387832758946362390840927389589274384374937984738297489238';
</script>

<div class="title">Delegation Completed!</div>
<div class="deploy">
	<div class="hash">
		<div class="label grey">Deploy Hash</div>
		<div class="hash-value">
			<div>
				<Hash start color="black" noOfCharacters={10} hash={deployHash || ''} />
				<div class="copy-icon">
					{#if deployHash}
						<CopyIcon text={deployHash || ''} />
					{/if}
				</div>
			</div>
		</div>
	</div>

	<div class="status">
		<div class="text">Successfully Sent</div>
		<div class="icon">
			<CircleCheckMarkIcon />
		</div>
	</div>
</div>
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

<div class="sender">
	<div class="top">
		<div>Validator</div>
	</div>
	<div class="value validator-display">
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
			<div class="cspr"><span class="cspr-fee">{(amount + csprFee).toFixed(5)}</span> CSPR</div>
			<div class="perc">({Math.round(validatorCSPRPerc * 100)}%)</div>
		</div>
	</div>
</div>

<div class="fee">
	<div class="left">You’ll delegate</div>
	<div class="right">
		<div class="cspr"><span class="cspr-fee">{amount.toFixed(5)}</span> CSPR</div>
		{#await getStats()}
			Loading ...
		{:then stats}
			<!-- TODO Get price from CoinGecko -->
			<div class="cash">
				${Math.floor(amount * stats.price * 100000000) / 100000000 || '0'}
			</div>
		{/await}
	</div>
</div>

<div class="fee">
	<div class="left">Transaction fee</div>
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

<div class="fee border-transparent">
	<div class="left">Total</div>
	<div class="right">
		<div class="cspr"><span class="cspr-fee">{(amount + csprFee).toFixed(5)}</span> CSPR</div>
		{#await getStats()}
			Loading ...
		{:then stats}
			<!-- TODO Get price from CoinGecko -->
			<div class="cash total">
				${Math.floor((amount + csprFee) * stats.price * 100000000) / 100000000 || '0'}
			</div>
		{/await}
	</div>
</div>

<div class="terms">
	After inclusion in a new block, you can review the <span class="green">Deploy Details.</span>
</div>

<div class="next-button">
	<Button wider gradient on:click>Make Another Delegation</Button>
	<button
		class="home-button"
		on:click={() => {
			goto('/');
		}}
	>
		Back to Home
	</button>
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
		@apply py-[clamp(12px,0.71vw,0.71vw)];
		@apply mb-0;
	}

	.validator-hash {
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.validator-hash > img {
		@apply rounded-full;
		@apply h-full;
	}

	.terms,
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
		@apply mb-[clamp(16px,1.43vw,1.43vw)];
	}

	.green {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.fee {
		@apply flex justify-between items-center;
		@apply text-[clamp(16px,1.07vw,1.07vw)];
		@apply py-[clamp(16px,1.43vw,1.43vw)];
		@apply border-b-color-transfer-details-border border-b-[clamp(1px,0.12vw,0.12vw)];
	}

	.cash {
		@apply text-color-table-header text-[clamp(16px,1.07vw,1.07vw)] font-bold;
	}

	.right {
		@apply text-right;
	}

	.next-button {
		@apply mt-[clamp(16px,2.92vw,2.92vw)];
		@apply flex items-center flex-col;
	}

	.perc {
		@apply text-[clamp(12px,0.83vw,0.83vw)] text-right;
	}

	.deploy {
		@apply flex items-center justify-between;
		@apply mb-[clamp(16px,1.9vw,1.9vw)];
	}

	.hash-value > div {
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.status > .icon {
		@apply w-[clamp(16px,1.19vw,1.19vw)] h-[clamp(16px,1.19vw,1.19vw)];
	}

	.status {
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
		@apply text-color-arcadia-green text-[clamp(16px,1.07vw,1.07vw)];
	}

	.home-button {
		@apply text-color-table-header text-[clamp(16px,1.07vw,1.07vw)] font-medium;
		@apply mt-[clamp(16px,2.08vw,2.08vw)];
	}
</style>
