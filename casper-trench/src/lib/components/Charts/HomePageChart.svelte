<script lang="ts">
	import { getVolumes } from '$utils/api';

	import { onMount } from 'svelte';

	let ctx: HTMLCanvasElement;

	export let totalTransactions = 0;
	export let data: { x: Date; y: number }[] = [];

	export let isLoading = true;
	let transactionVolumes = [];

	$: if (!isLoading) {
		data?.length > 0 && renderChart(data);
	}

	// TODO Remove the onMount Function
	onMount(async () => {
		transactionVolumes = await getVolumes(14);
		transactionVolumes &&
			transactionVolumes.forEach((volume) => {
				data.push({ x: new Date(volume[0]), y: volume[1] });
				totalTransactions += volume[1];
			});
		isLoading = false;
	});

	const renderChart = (chartData1: { x?: Date; y?: number }[]) => {
		// @ts-ignore
		const chart = new Chart(ctx, {
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
						pointRadius: 0,
						tension: 0.5
					}
				]
			},
			options: {
				responsive: true,
				scales: {
					x: {
						adapters: {
							date: {}
						},
						type: 'time',
						grid: {
							display: false,
							drawBorder: false
						},
						ticks: {
							autoSkip: true,
							maxTicksLimit: 3,
							maxRotation: 0,
							minRotation: 0,
							color: '#CFCFCF'
						}
					},
					y: {
						type: 'linear',
						display: true,
						beginAtZero: false,
						grid: {
							drawOnChartArea: false,
							drawBorder: false
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
							},
							autoSkip: true,
							maxTicksLimit: 3,
							color: '#CFCFCF'
						}
					}
				},
				plugins: {
					legend: {
						display: false
					},
					tooltip: {
						enabled: false,
						position: 'nearest'
						// external: externalTooltipHandler
					}
				}
			}
		});
	};
</script>

<div class="container">
	<div class="title">
		<div class="label">TRANSACTIONS HISTORY in 14 DAYS</div>
		<div class="value">
			{totalTransactions.toLocaleString()}
		</div>
	</div>
	<div class="chart">
		<canvas bind:this={ctx} />
	</div>
</div>

<style lang="postcss">
	.container {
		@apply md:w-[24vw] md:h-[11vw];
		@apply ml-[1vw] mb-[1vw];
	}

	.title {
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-white;
		@apply flex items-center justify-between;
		@apply mb-[clamp(12px,0.95vw,0.95vw)];
	}

	.label {
		@apply font-medium;
	}

	.chart {
		@apply md:w-[20vw];
	}

	.value {
		@apply text-[clamp(10px,0.83vw,0.83vw)];
	}
</style>
