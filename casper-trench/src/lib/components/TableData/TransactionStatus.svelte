<script>
	import GreenCheckMarkIcon from '$lib/icons/GreenCheckMarkIcon.svelte';
	import YellowWarningIcon from '$lib/icons/YellowWarningIcon.svelte';

	export let success = false;
</script>

<div class="transaction-status" class:success>
	{#if success}
		<div class="text">
			<slot />
		</div>
		<div class="icon">
			<GreenCheckMarkIcon />
		</div>
	{:else}
		<div class="text">
			<slot />
		</div>
		<div class="icon">
			<YellowWarningIcon />
		</div>
	{/if}
</div>

<style lang="postcss">
	.transaction-status {
		@apply text-[1.07vw] capitalize;
		@apply flex items-center gap-[0.36vw];
		@apply text-color-arcadia-yellow;
	}

	.success {
		@apply text-color-arcadia-green;
	}

	.icon {
		@apply h-[0.83vw] w-[0.83vw];
	}
</style>
