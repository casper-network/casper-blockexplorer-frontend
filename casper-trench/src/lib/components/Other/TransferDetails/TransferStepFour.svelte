<script lang="ts">
	import { goto } from '$app/navigation';
	import { account } from '$stores/account';
	import Button from '$lib/components/Reusables/Button.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import CircleCheckMarkIcon from '$lib/icons/CircleCheckMarkIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { price } from '$stores/price';

	export let recipientPublicKey: string;
	export let amount: number;
	export let csprFee: number;
	export let deployHash: string;
</script>

<div class="title">Transfer Completed!</div>
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
		<div>Sender</div>
	</div>
	<div class="value grey">
		<span
			><Hash start color="black" noOfCharacters={100} hash={$account?.publicKey || ''} />
			<div class="copy-icon">
				{#if $account?.publicKey}
					<CopyIcon text={$account?.publicKey || ''} />
				{/if}
			</div></span
		>
	</div>
</div>

<div class="sender">
	<div class="top">
		<div>Recipient</div>
	</div>
	<div class="value grey">
		<span
			><Hash start color="black" noOfCharacters={100} hash={recipientPublicKey || ''} />
			<div class="copy-icon">
				{#if recipientPublicKey}
					<CopyIcon text={recipientPublicKey || ''} />
				{/if}
			</div></span
		>
	</div>
</div>

<div class="fee">
	<div class="left">You'll send</div>
	<div class="right">
		<div class="cspr"><span class="cspr-fee">{amount.toFixed(5)}</span> CSPR</div>
		<div class="cash">
			${Math.floor(amount * $price * 100000000) / 100000000 || '0'}
		</div>
	</div>
</div>

<div class="fee">
	<div class="left">Transaction fee</div>
	<div class="right">
		<div class="cspr"><span class="cspr-fee">{csprFee.toFixed(5)}</span> CSPR</div>
		<div class="cash">
			${Math.floor(csprFee * $price * 100000000) / 100000000 || '0'}
		</div>
	</div>
</div>

<div class="fee border-transparent">
	<div class="left">Total</div>
	<div class="right">
		<div class="cspr"><span class="cspr-fee">{(amount + csprFee).toFixed(5)}</span> CSPR</div>
		<div class="cash">
			${Math.floor((amount + csprFee) * $price * 100000000) / 100000000 || '0'}
		</div>
	</div>
</div>

<div class="terms">
	After inclusion in a new block, you can review the <a
		href="/transactions/{deployHash}"
		class="green">Deploy Details.</a
	>
</div>
<div class="next-button">
	<Button wider gradient on:click>Make Another Transfer</Button>
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
	}

	.hash-value {
		@apply text-[clamp(16px,1.07vw,1.07vw)];
		@apply flex items-center justify-between;
	}

	.hash {
		@apply flex items-center gap-[clamp(16px,0.95vw,0.95vw)];
	}

	.terms,
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

	.green {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.fee {
		@apply flex justify-between items-center;
		@apply text-[clamp(16px,1.07vw,1.07vw)];
		@apply py-[clamp(16px,1.43vw,1.43vw)];
		@apply border-b-color-transfer-details-border border-b-[clamp(1px,0.24vw,0.24vw)];
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
