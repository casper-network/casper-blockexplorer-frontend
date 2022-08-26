<script lang="ts">
	export let progress;

	const angle = 360 * progress;
	let color = 'green';

	// May be subject to change
	if (progress === 1) {
		color = '#31DE91';
	} else if (progress >= 0.97) {
		color = '#BBDE31';
	} else if (progress >= 0.95) {
		color = '#F1BF0B';
	} else {
		color = '#E6332A';
	}

	const background = `radial-gradient(white 50%, transparent 51%),
        conic-gradient(transparent 0deg ${angle}deg, white ${angle}deg 360deg),
        ${color}`;

	$: cssVarStyles = `--background:${background}`;
</script>

<div class="wrapper">
	<div class="progress-circle" style={cssVarStyles} />
	<div class="value">
		{(progress * 100).toFixed(0)}%
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply flex gap-[clamp(4px,0.6vw,0.6vw)] items-center;
	}

	.progress-circle {
		@apply w-[clamp(10px,1.3vw,1.3vw)] h-[clamp(10px,1.3vw,1.3vw)];
		@apply transition-all duration-500 ease-in will-change-transform;
		@apply rounded-full;
		background: var(--background);
	}

	.value {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header;
	}
</style>
