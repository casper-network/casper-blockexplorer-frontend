<script>
	import { goto } from '$app/navigation';
	import Button from '$lib/components/Reusables/Button.svelte';
	import { account } from '$stores/account';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import YellowWarningIcon from '$lib/icons/YellowWarningIcon.svelte';

	export let recipientPublicKey = '';
	export let deployHash = '';
	export let recipientAccountHash = '';
	export let amount = 2.5;
</script>

<div class="title">Sign Transaction</div>
<div class="sender">
	<div class="top">
		<div>Deploy Hash</div>
	</div>
	<div class="value grey">
		<span
			><Hash start color="black" noOfCharacters={100} hash={deployHash || ''} />
			<div class="copy-icon">
				{#if deployHash}
					<CopyIcon text={deployHash || ''} />
				{/if}
			</div></span
		>
	</div>
</div>

<div class="sender">
	<div class="top">
		<div>Recipient Public Key</div>
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

<div class="sender">
	<div class="top">
		<div>Recipient Account Hash</div>
	</div>
	<div class="value grey">
		<span
			><Hash start color="black" noOfCharacters={100} hash={recipientAccountHash || ''} />
			<div class="copy-icon">
				{#if recipientAccountHash}
					<CopyIcon text={recipientAccountHash || ''} />
				{/if}
			</div></span
		>
	</div>
</div>

<div class="sender">
	<div class="top">
		<div>Transfer Amount</div>
	</div>
	<div class="value">
		<span>
			{(amount * 1e9).toLocaleString()}
			<div class="copy-icon">
				{#if amount}
					<CopyIcon text={(amount * 1e9).toLocaleString() || ''} />
				{/if}
			</div></span
		>
		<span class="grey">Motes</span>
	</div>
</div>

{#if !$account}
	<div class="sign-in-alert">
		<div class="icon">
			<YellowWarningIcon black />
		</div>
		<div class="text">
			Click the <span
				class="green"
				on:click={() => {
					goto('/sign-in');
				}}>Sign in with Casper Signer</span
			> button.
		</div>
	</div>
{/if}

<div class="bot-alert">
	<div class="icon">
		<YellowWarningIcon />
	</div>
	<div class="text">Please note</div>
</div>
<div class="terms">
	Before confirming your transaction on the Casper Signer, make sure the values displayed on the
	Casper Signer match the values displayed above.
</div>
<div class="terms">
	CSPR.live never accesses, saves, stores, or transmits your secret key. You need to sign each
	transaction in order to send it to the Casper Network.
</div>

<div class="terms">
	By using Casper.info, you acknowledge that you have read, understood and accepted our. <span
		class="green">Terms of Service.</span
	>
</div>
<div class="next-button">
	<Button wider gradient on:click>Sign with Casper Signer</Button>
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
		@apply text-[clamp(16px,1.07vw,1.07vw)];
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

	.terms,
	.grey {
		@apply text-color-grey-footer-label;
	}

	.terms {
		@apply text-[clamp(10px,0.77vw,0.77vw)];
		@apply mb-[clamp(16px,1.43vw,1.43vw)];
	}

	.green {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.next-button {
		@apply flex justify-center;
	}

	.green {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
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

	.bot-alert {
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
		@apply mb-[clamp(4px,0.24vw,0.24vw)];
	}

	.bot-alert > .icon {
		@apply w-[0.95vh] h-[0.95vh] md:w-[0.95vw] md:h-[0.95vw];
	}

	.bot-alert > .text {
		@apply text-[clamp(12px,0.83vw,0.83vw)] text-color-table-header font-medium;
	}
</style>
