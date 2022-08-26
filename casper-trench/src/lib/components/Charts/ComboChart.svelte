<script lang="ts">
	import PriceLegendIcon from '$lib/icons/PriceLegendIcon.svelte';
	import { externalTooltipHandler } from '$utils/tooltip';
	import ChartToolbar from './ChartToolbar.svelte';

	let ctx: HTMLCanvasElement;
	let chart;

	export let priceData: [{ x?: Date; y?: number }];
	export let volumeData: [{ x?: Date; y?: number }];
	export let isLoading = true;

	$: if (!isLoading) {
		priceData?.length > 0 && volumeData?.length > 0 && renderChart(volumeData, priceData);
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
						label: 'Volume',
						data: chartData1,
						backgroundColor: '#0021A5',
						borderColor: '#0021A5',
						type: 'bar',
						borderWidth: 2,
						order: 1,
						yAxisID: 'y'
					},
					{
						label: 'Prices',
						data: chartData2,
						backgroundColor: '#099B91',
						borderColor: '#099B91',
						borderWidth: 2,
						order: 0,
						yAxisID: 'y1',
						stepped: false,
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
						position: 'right',
						beginAtZero: false,
						grid: {
							drawOnChartArea: true
						},
						ticks: {
							callback: function (val, index) {
								const lookup = [
									{ value: 1, symbol: '' },
									{ value: 1e3, symbol: 'k' },
									{ value: 1e6, symbol: 'M' },
									{ value: 1e9, symbol: 'G' },
									{ value: 1e12, symbol: 'T' },
									{ value: 1e15, symbol: 'P' },
									{ value: 1e18, symbol: 'E' }
								];
								const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
								var item = lookup
									.slice()
									.reverse()
									.find(function (item) {
										return val >= item.value;
									});
								return item ? (val / item.value).toFixed(2).replace(rx, '$1') + item.symbol : '0';
							}
						}
					},
					y1: {
						type: 'linear',
						display: true,
						position: 'left',
						beginAtZero: false,
						grid: {
							drawOnChartArea: true
						},
						ticks: {
							callback: function (val, index) {
								return `$${val.toFixed(3)}`;
							}
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
	<div class="title">Market Price (CSPR/USD)</div>
	<div class="legend">
		<div class="price">
			<div class="icon">
				<PriceLegendIcon />
			</div>
			<div class="text">Price</div>
		</div>
		<div class="volume">
			<div class="color" />
			<div class="text">Volume</div>
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

	.icon {
		@apply w-[clamp(16px,1.19vw,1.19vw)];
	}

	.pan {
		@apply cursor-grab;
	}
</style>
