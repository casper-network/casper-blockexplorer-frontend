<script lang="ts">
	import ChartToolbar from '$components/Charts/ChartToolbar.svelte';
	import { externalTooltipHandler } from '$utils/tooltip';
	let ctx: HTMLCanvasElement;
	let chart;

	export let transfersData: [{ x?: Date; y?: number }];
	export let transactionsData: [{ x?: Date; y?: number }];
	export let isLoading = true;

	$: if (!isLoading) {
		transfersData?.length > 0 &&
			transactionsData?.length > 0 &&
			renderChart(transfersData, transactionsData);
	}
	const renderChart = (
		chartData1: [{ x?: Date; y?: number }],
		chartData2: [{ x?: Date; y?: number }]
	) => {
		// @ts-ignore
		chart = new Chart(ctx, {
			type: 'bar',
			data: {
				datasets: [
					{
						label: 'Transfers',
						data: chartData1,
						backgroundColor: '#0021A5',
						borderColor: '#0021A5',
						borderWidth: 2
					},
					{
						label: 'Transactions',
						data: chartData2,
						backgroundColor: '#099B91',
						borderColor: '#099B91',
						borderWidth: 2
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
						stacked: true,
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
						stacked: true
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
	<div class="title">Transactions</div>
	<div class="legend">
		<div class="price">
			<div class="color" />
			<div class="text">Transfers</div>
		</div>
		<div class="volume">
			<div class="color green" />
			<div class="text">Transactions</div>
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
	.title {
		@apply text-[clamp(16px,1.43vw,1.43vw)] font-bold text-color-table-header;
		@apply flex items-center justify-between;
	}

	.container {
		@apply min-w-max;
		@apply flex flex-col items-center justify-center;
		@apply my-[clamp(16px,0.95vw,0.95vw)];
	}

	.chart {
		@apply w-full;
		@apply cursor-crosshair;
	}

	.legend {
		@apply flex gap-[clamp(24px,1.79vw,1.79vw)] items-center;
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-table-header;
	}

	.legend > div {
		@apply flex gap-[clamp(4px,0.6vw,0.6vw)] items-center;
	}

	.color {
		@apply bg-color-arcadia-blue;
		@apply h-[clamp(12px,0.95vw,0.95vw)] w-[clamp(12px,0.95vw,0.95vw)];
		@apply rounded-full;
	}

	.green {
		@apply bg-color-hover-footer-link;
	}

	.pan {
		@apply cursor-grab;
	}
</style>
