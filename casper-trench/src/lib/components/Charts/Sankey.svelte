<script lang="ts">
	import { getLatestBlocks, getTransferFlow } from '$utils/api';
	import { externalSankeyTooltipHandler } from '$utils/tooltip';
	import { truncateString } from '$utils/truncate';
	import type { Block } from '$utils/types/block';
	import type { TransferFlow } from '$utils/types/transfer';
	import { onMount } from 'svelte';
	import EraSlider from './EraSlider.svelte';
	import LimitDropdown from './LimitDropdown.svelte';

	let ctx: HTMLCanvasElement;
	let chart;
	let pan = false;
	let transferFlow: TransferFlow;
	let data: { from: string; to: string; flow: number }[] = [];
	let limit = 20;
	let totalTxAccount = 51;

	let dateFrom = new Date('Jul 7, 2022, 16:34:01');
	let dateTo = new Date('Jul 7, 2022, 18:33');

	const currentEra = getCurrentEra();
	let eraValue = 0;
	async function getCurrentEra() {
		const latestBlocks: Block[] = await getLatestBlocks(1);
		eraValue = latestBlocks[0].header.era_id;
		return latestBlocks[0].header.era_id;
	}

	onMount(async () => {
		// @ts-ignore
		Chart.defaults.font.size = 14;
		Chart.defaults.font.lineHeight = 26;
		updateSankey(true);
	});

	const updateSankey = async (mount = false) => {
		data = [];
		transferFlow = await getTransferFlow(mount ? await currentEra : eraValue, limit);
		totalTxAccount = await transferFlow.count;
		dateFrom = new Date(await transferFlow.eraStart);
		dateTo = (await transferFlow.eraEnd) ? new Date(await transferFlow.eraEnd) : new Date();
		transferFlow &&
			transferFlow.transfers.forEach((flow, i) => {
				data.push({
					from:
						truncateString(flow.fromHash.replace('account-hash-', '#').replace('dub-', ' ')) || '',
					to: truncateString(flow.toHash.replace('account-hash-', '#').replace('dub-', ' ')) || '',
					flow: flow.denomAmount || 0
				});
			});
		for (let i = 0; i < data.length; i++) {
			if (data[i]?.to === data[i + 1]?.from) {
				data.splice(i, 2);
			}
		}
		data.length > 0 && renderChart(data);
	};

	const getColor = (str) => {
		let hash = 0;
		for (let i = 0; i < str.length; i++) {
			hash = str && str.charCodeAt(i) + ((hash << 5) - hash);
		}
		let color = '#';
		for (let i = 0; i < 3; i++) {
			let value = hash && (hash >> (i * 8)) & 0xff;
			color += value.toString(16).substring(-2);
		}
		for (let i = 1; i <= 7; i++) {
			if (color.charAt(i) == '') {
				color.concat('0');
			}
		}
		if (color.length == 6) {
			color += '0';
		}
		return color.toUpperCase();
	};

	const renderChart = async (data: { from: string; to: string; flow: number }[]) => {
		// @ts-ignore
		chart = new Chart(ctx, {
			type: 'sankey',
			data: {
				datasets: [
					{
						data,
						colorFrom: (c) => getColor(c.dataset.data[c.dataIndex].from),
						colorTo: (c) => getColor(c.dataset.data[c.dataIndex].to),
						colorMode: 'gradient',
						size: 'max'
					}
				]
			},
			options: {
				animation: true,
				responsive: true,
				plugins: {
					tooltip: {
						enabled: false,
						callbacks: {
							label(c) {
								return [c.dataset.data[c.dataIndex].flow.toLocaleString('en') + ' CSPR'];
							}
						},
						position: 'average',
						usePointStyle: false,
						external: externalSankeyTooltipHandler,
						padding: 8
					}
				}
			}
		});
	};

	const formatDate = (date: Date): string => {
		const month = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		return `${
			month[date.getMonth()]
		} ${date.getDate()}, ${date.getFullYear()} ${date.toLocaleTimeString()}`;
	};
</script>

<svelte:head>
	<script src="https://cdn.jsdelivr.net/npm/chartjs-chart-sankey@0.9.0"></script>
</svelte:head>

<div class="container">
	<div class="title">Transfer Flow</div>
	<div class="chart" class:pan>
		{#key data}
			<canvas bind:this={ctx} />
		{/key}
	</div>
	{#await currentEra}
		<div />
	{:then value}
		<EraSlider
			bind:value={eraValue}
			max={value}
			on:change={async () => {
				if (eraValue > (await currentEra)) {
					eraValue = await currentEra;
				}
			}}
			on:mouseup={() => {
				updateSankey(false);
			}}
		/>
		<div class="footer">
			<div class="era">
				<div class="label">Era ID</div>
				<input
					type="number"
					max={value}
					bind:value={eraValue}
					on:change={async () => {
						if (eraValue > (await currentEra)) {
							eraValue = await currentEra;
						}
						updateSankey(false);
					}}
				/>
			</div>
			<div class="date">
				{`${formatDate(dateFrom)} - ${formatDate(dateTo)}`}
			</div>
			<div class="total">
				<div class="label">Total TX Account</div>
				<div class="value">
					{totalTxAccount}
				</div>
			</div>
			<LimitDropdown
				bind:limit
				on:change={() => {
					updateSankey(false);
				}}
			/>
		</div>
	{/await}
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
		@apply cursor-auto;
		@apply mb-[clamp(16px,2.08vw,2.08vw)];
	}

	.pan {
		@apply cursor-grab;
	}

	.footer {
		@apply flex items-center justify-between;
		@apply text-[clamp(16px,1.07vw,1.07vw)] text-color-black-text;
		@apply mt-[clamp(16px,1.07vw,1.07vw)];
		@apply w-full;
	}

	.era {
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	input[type='number'] {
		@apply p-[clamp(8px,0.71vw,0.71vw)];
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply rounded-[clamp(4px,0.3vw,0.3vw)];
		@apply w-[clamp(75px,5.06vw,5.06vw)];
	}
	input[type='number']::-webkit-inner-spin-button,
	input[type='number']::-webkit-outer-spin-button {
		-webkit-appearance: textfield;
	}

	.total {
		@apply flex gap-[clamp(16px,1.07vw,1.07vw)];
	}
</style>
