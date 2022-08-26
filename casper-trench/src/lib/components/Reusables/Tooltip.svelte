<script>
	import TooltipIcon from '$lib/icons/TooltipIcon.svelte';

	export let text = '';
</script>

<div class="tooltip">
	<div class="tooltip-icon" style="--tooltip: '{text}'">
		<TooltipIcon />
	</div>
</div>

<style lang="postcss">
	.tooltip {
		@apply text-[0.95vw];
	}

	.tooltip-icon {
		@apply relative;
		@apply h-[clamp(10px,0.83vw,0.83vw)] w-[clamp(10px,0.83vw,0.83vw)];
		@apply cursor-pointer;
	}

	.tooltip-icon::before,
	.tooltip-icon::after {
		@apply absolute transform translate-x-[1.19vw] scale-0;
		@apply transition-transform origin-top-left;
	}

	.tooltip-icon::before {
		@apply w-max max-w-[22.62vw];
		@apply border border-[#F6F6F6];
		@apply p-[0.48vw];
		@apply rounded-[0.71vw];
		@apply bg-white;
		content: var(--tooltip);
	}

	.tooltip-icon:hover::after,
	.tooltip-icon:hover::before {
		@apply scale-100;
	}
</style>
