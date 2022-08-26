<script>
	import DragZoomIcon from '$lib/icons/DragZoomIcon.svelte';
	import PanZoomIcon from '$lib/icons/PanZoomIcon.svelte';
	import ZoomInIcon from '$lib/icons/ZoomInIcon.svelte';
	import ZoomOutIcon from '$lib/icons/ZoomOutIcon.svelte';
	import ZoomResetIcon from '$lib/icons/ZoomResetIcon.svelte';

	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let chart;
</script>

{#if chart}
	<div class="toolbar">
		<div
			class="zoom-in"
			on:click={() => {
				chart && chart.zoom(1.05);
			}}
		>
			<ZoomInIcon />
		</div>

		<div
			class="zoom-out"
			on:click={() => {
				chart && chart.zoom(0.95);
			}}
		>
			<ZoomOutIcon />
		</div>

		<div
			class="drag-zoom"
			on:click={() => {
				if (chart) {
					// Disable panning
					chart.options.plugins.zoom.pan.enabled = false;
					// Enable Drag zoom
					chart.options.plugins.zoom.zoom.drag.enabled = true;
					chart.update();

					dispatch('update-cursor');
				}
			}}
		>
			<DragZoomIcon bind:selected={chart.options.plugins.zoom.zoom.drag.enabled} />
		</div>

		<div
			class="pan"
			on:click={() => {
				if (chart) {
					// Disable drag zoom
					chart.options.plugins.zoom.zoom.drag.enabled = false;
					// Enable panning
					chart.options.plugins.zoom.pan.enabled = true;
					chart.update();

					dispatch('update-cursor');
				}
			}}
		>
			<PanZoomIcon bind:selected={chart.options.plugins.zoom.pan.enabled} />
		</div>

		<div
			class="reset"
			on:click={() => {
				chart && chart.resetZoom();
			}}
		>
			<ZoomResetIcon />
		</div>
	</div>
{/if}

<style lang="postcss">
	.toolbar {
		@apply flex items-center gap-[clamp(8px,0.83vw,0.83vw)];
		@apply self-end;
		@apply mb-[clamp(16px,1.67vw,1.67vw)];
	}

	.toolbar > div {
		@apply cursor-pointer;
		@apply h-[1.07vh] w-[1.07vh] md:h-[1.07vw] md:w-[1.07vw];
	}
</style>
