<script lang="ts">
	import { onMount } from 'svelte';

	export let value = 0.123456;
	let progressValue = 0;

	onMount(() => {
		const animationTimeout = setTimeout(() => {
			progressValue = value;
			clearTimeout(animationTimeout);
		}, 500);
	});
</script>

<div class="weight">
	<div class="text">
		{(value * 100).toFixed(2)}%
	</div>
	<div class="progress-bar">
		<div class="progress" style="width:{progressValue * 100}%" />
	</div>
</div>

<style lang="postcss">
	.weight {
		@apply max-w-max;
	}

	.progress-bar {
		@apply w-[11.25vw] h-[clamp(2px,0.36vw,0.36vw)];
		@apply bg-color-progress-bg;
		@apply rounded-[1.01vw];
	}

	.progress {
		@apply h-full;
		@apply bg-color-progress-bar;
		@apply rounded-[1.01vw];
		@apply transition-all duration-700;
	}

	.text {
		@apply text-right text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[clamp(4px,0.71vw,0.71vw)];
	}
</style>
