<script>
	import WhiteCheckMarkIcon from '$lib/icons/WhiteCheckMarkIcon.svelte';

	export let amount;
	export let limit;
	export let sendMax;
</script>

<div class="input-wrapper">
	<div class="top">
		<div class="label">Amount</div>
		{#if amount < limit}
			<div class="error">
				Not less than {limit} CSPR
			</div>
		{/if}
	</div>
	<div class="input" class:red={amount < limit}>
		<input type="number" bind:value={amount} placeholder="Enter amount" min="2.5" />
		<div class:cspr-red={amount < limit}>CSPR</div>
	</div>
	<div class="label">
		<div
			class="checkbox"
			class:checked={sendMax}
			on:click={() => {
				sendMax = !sendMax;
			}}
		>
			<div class="check-mark-icon">
				<WhiteCheckMarkIcon />
			</div>
		</div>
		<div class="text" class:checked={sendMax}><slot /></div>
	</div>
</div>

<style lang="postcss">
	.label > .checkbox {
		@apply cursor-pointer;
	}

	.error {
		@apply text-color-arcadia-red text-[clamp(12px,0.83vw,0.83vw)];
	}

	.cspr-red {
		@apply text-color-arcadia-red;
	}

	.label {
		@apply text-color-grey-footer-label text-[clamp(12px,0.83vw,0.83v)];
		@apply flex items-center gap-[clamp(2px,0.24vw,0.24vw)];
	}

	.input-wrapper {
		@apply mb-[clamp(16px,1.9vw,1.9vw)];
	}

	.top {
		@apply flex justify-between items-center;
		@apply mb-[clamp(4px,0.6vw,0.6vw)];
		@apply text-color-black-text text-[clamp(16px,1.07vw,1.07vw)];
	}

	.input > input {
		@apply outline-none;
		@apply w-[90%];
	}

	.input {
		@apply px-[clamp(16px,1.25vw,1.25vw)] py-[clamp(12px,0.95vw,0.95vw)];
		@apply text-[clamp(16px,1.07vw,1.07vw)] text-color-black-text;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply flex items-center justify-between;
		@apply mb-[clamp(4px,0.71vw,0.71vw)];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-input-border;
	}

	.check-mark-icon {
		@apply w-[clamp(4px,0.48vw,0.48vw)] h-[clamp(4px,0.48vw,0.48vw)];
	}

	.checkbox {
		@apply border-color-grey-footer-label border-[clamp(1px,0.12vw,0.12vw)];
		@apply rounded-[0.24vw] md:rounded-[0.24vw];
	}

	.checked.checkbox {
		@apply bg-color-hover-footer-link;
		@apply border-color-hover-footer-link;
	}

	.checked.text {
		@apply text-color-hover-footer-link;
	}

	.red {
		@apply border-color-arcadia-red;
	}
</style>
