<script lang="ts">
	import { externalTooltipHandler } from '$utils/tooltip';

	import ChartToolbar from './ChartToolbar.svelte';

	let ctx;
	let chart;

	export let delegatedData: [{ x?: Date; y?: number }];
	export let unbondedData: [{ x?: Date; y?: number }];
	export let isLoading = true;

	$: if (!isLoading) {
		delegatedData?.length > 0 &&
			unbondedData?.length > 0 &&
			renderChart(delegatedData, unbondedData);
	}

	const renderChart = (
		chartData1: [{ x?: Date; y?: number }],
		chartData2: [{ x?: Date; y?: number }]
	) => {
		// @ts-ignore
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						label: 'Delegated',
						data: chartData1,
						backgroundColor: '#0021A5',
						borderWidth: 0,
						fill: 'origin',
						pointStyle: 'circle',
						pointRadius: 0
					},
					{
						label: 'Unbonded',
						data: chartData2,
						backgroundColor: '#099B91',
						borderWidth: 0,
						fill: 'origin',
						pointStyle: 'circle',
						pointRadius: 0
					}
				]
			},
			options: {
				responsive: true,
				interaction: {
					mode: 'index',
					intersect: false
				},
				scales: {
					x: {
						adapters: {
							date: {}
						},
						type: 'time',
						time: {
							unit: 'day'
						},
						grid: {
							display: false
						},
						ticks: {
							autoSkip: true,
							maxTicksLimit: 20,
							maxRotation: 0,
							minRotation: 0
						}
					},
					y: {
						type: 'linear',
						display: true,
						position: 'left',
						beginAtZero: false,
						grid: {
							drawOnChartArea: true
						}
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: false,
						position: 'nearest',
						external: externalTooltipHandler,
						padding: 16
					},
					zoom: {
						pan: {
							enabled: true,
							mode: 'x',
							threshold: 5
						},
						zoom: {
							wheel: {
								enabled: true
							},
							drag: {
								enabled: false
							},
							pinch: {
								enabled: true
							},
							mode: 'x'
						}
					}
				}
			}
		});
	};
	let pan = true;
</script>

<div class="container">
	<div class="title">Staked Per Era</div>
	<div class="legend">
		<div class="delegated">
			<div class="color" />
			<div class="text">Delegated</div>
		</div>
		<div class="unbonded">
			<div class="color" />
			<div class="text">Unbonded</div>
		</div>
	</div>
	<ChartToolbar
		{chart}
		on:update-cursor={() => {
			pan = chart.options.plugins.zoom.pan.enabled;
		}}
	/>
	<div class="chart" class:pan>
		<canvas bind:this={ctx} />
	</div>
</div>

<style lang="postcss">
	.chart {
		@apply w-full;
		@apply cursor-crosshair;
	}

	.title {
		@apply text-[clamp(16px,1.43vw,1.43vw)] font-bold text-color-table-header;
		@apply flex items-center justify-between;
	}

	.container {
		@apply min-w-max;
		@apply flex flex-col items-center justify-center;
		@apply my-[clamp(16px,0.95vw,0.95vw)];
	}

	.legend {
		@apply flex gap-[clamp(24px,1.79vw,1.79vw)] items-center;
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-table-header;
	}

	.legend > div {
		@apply flex gap-[clamp(4px,0.6vw,0.6vw)] items-center;
	}

	.color {
		@apply bg-color-hover-footer-link;
		@apply h-[clamp(12px,0.95vw,0.95vw)] w-[clamp(12px,0.95vw,0.95vw)];
		@apply rounded-full;
	}

	.delegated > .color {
		@apply bg-color-arcadia-blue;
	}

	.pan {
		@apply cursor-grab;
	}
</style>
