<script>
	export let value = 0;
	export let max = 0;
</script>

<div class="slidecontainer">
	<div class="top">
		<div class="start">0</div>
		<div class="end">
			{max}
		</div>
	</div>
	<input type="range" {max} bind:value class="slider" on:change on:mouseup />
</div>

<style lang="postcss">
	.slidecontainer {
		@apply w-full;
		@apply text-[clamp(16px,1.07vw,1.07vw)] text-color-grey-footer-label;
	}

	.slider:hover {
		@apply opacity-100;
	}

	.slider {
		@apply appearance-none outline-none;
		@apply w-full h-[clamp(4px,0.3vw,0.3vw)];
		@apply bg-color-slider-line opacity-70;
		@apply transition-opacity duration-200;
	}

	.slider::-webkit-slider-thumb {
		@apply appearance-none outline-none cursor-pointer;
		@apply w-[clamp(10px,1.19vw,1.19vw)] h-[clamp(10px,1.19vw,1.19vw)];
		@apply rounded-full;
		@apply bg-color-arcadia-blue;
	}

	.slider::-moz-range-thumb {
		@apply w-[clamp(10px,1.19vw,1.19vw)] h-[clamp(10px,1.19vw,1.19vw)];
		@apply rounded-full;
		@apply bg-color-arcadia-blue;
		@apply cursor-pointer;
	}

	.top {
		@apply flex justify-between;
	}
</style>
