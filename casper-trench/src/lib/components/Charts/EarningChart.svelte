<script lang="ts">
	import { externalTooltipHandler } from '$utils/tooltip';

	import ChartToolbar from './ChartToolbar.svelte';

	let ctx: HTMLCanvasElement;
	let chart;

	export let data: [{ x?: Date; y?: number }];
	export let isLoading = true;

	$: if (!isLoading) {
		data?.length > 0 && renderChart(data);
	}

	const renderChart = (chartData1: [{ x?: Date; y?: number }]) => {
		// @ts-ignore
		chart = new Chart(ctx, {
			type: 'line',
			data: {
				datasets: [
					{
						label: 'Era Rewards',
						data: chartData1,
						backgroundColor: '#099B91',
						borderColor: '#099B91',
						borderWidth: 2,
						order: 1,
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
							maxTicksLimit: 10,
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
	<!-- remove mention of cspr -->
	<!-- <div class="title">Latest 1000 Era rewards (----)</div> -->
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
		@apply min-w-max max-w-[37.86vw];
		@apply flex flex-col items-center;
		@apply my-[clamp(16px,0.95vw,0.95vw)];
	}

	.chart {
		@apply w-full;
		@apply cursor-crosshair;
	}

	.pan {
		@apply cursor-grab;
	}
</style>
