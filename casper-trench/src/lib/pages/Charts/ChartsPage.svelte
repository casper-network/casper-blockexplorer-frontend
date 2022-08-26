<script lang="ts">
	import ComboChart from '$lib/components/Charts/ComboChart.svelte';
	import StackedChart from '$lib/components/Charts/StackedChart.svelte';
	import AreaChart from '$lib/components/Charts/AreaChart.svelte';
	import PoNegAreaChart from '$lib/components/Charts/PoNegAreaChart.svelte';
	import { getEraData, getLatestBlocks, getMarketPrices } from '$utils/api';
	import type { Block } from '$utils/types/block';
	import type { EraData } from '$utils/types/era';
	import { onMount } from 'svelte';
	import type { MarketPrices } from '$utils/types/price';
	import Sankey from '$lib/components/Charts/Sankey.svelte';

	let eraData: EraData[];
	let transfersData: [{ x?: Date; y?: number }] = [{}];
	let transactionsData: [{ x?: Date; y?: number }] = [{}];
	let delegatedData: [{ x?: Date; y?: number }] = [{}];
	let unbondedData: [{ x?: Date; y?: number }] = [{}];
	let validatorWeights: [{ x?: Date; y?: number }] = [{}];
	let priceData: [{ x?: Date; y?: number }] = [{}];
	let volumeData: [{ x?: Date; y?: number }] = [{}];
	let marketPrices: MarketPrices[];
	let isLoading = true;
	onMount(async () => {
		isLoading = true;
		const latestBlocks: Block[] = await getLatestBlocks(1);
		eraData = latestBlocks && (await getEraData('id ASC', 0, latestBlocks[0].header.era_id));
		marketPrices = await getMarketPrices();
		eraData &&
			eraData.forEach((data) => {
				transfersData.push({ x: new Date(data.end), y: data.transfersCount });
				transactionsData.push({ x: new Date(data.end), y: data.deploysCount });
				delegatedData.push({ x: new Date(data.end), y: data.stakedThisEra });
				unbondedData.push({ x: new Date(data.end), y: -data.undelegatedThisEra });
				validatorWeights.push({ x: new Date(data.end), y: data.validatorsWeights });
			});
		marketPrices &&
			marketPrices.forEach((price) => {
				priceData.push({ x: new Date(price.date), y: price.close });
				volumeData.push({ x: new Date(price.date), y: price.volumeTo });
			});
		isLoading = false;
	});
</script>

<div class="charts-page">
	<div class:loading={isLoading} class="wrapper">
		<Sankey />
	</div>
	<div class:loading={isLoading} class="wrapper">
		<StackedChart {transfersData} {transactionsData} bind:isLoading />
	</div>
	<div class:loading={isLoading} class="wrapper">
		<ComboChart {priceData} {volumeData} bind:isLoading />
	</div>
	<div class:loading={isLoading} class="wrapper">
		<PoNegAreaChart {delegatedData} {unbondedData} bind:isLoading />
	</div>
	<div class:loading={isLoading} class="wrapper">
		<AreaChart {validatorWeights} bind:isLoading />
	</div>
</div>

<style lang="postcss">
	.wrapper {
		@apply px-[clamp(16px,2.14vw,2.14vw)] py-[clamp(16px,0.95vw,0.95vw)];
		@apply border-color-tooltip-border border-[clamp(1px,0.06vw,0.06vw)];
		@apply rounded-[1.19vh] md:rounded-[1.19vw];
		@apply mb-[clamp(16px,2.38vw,2.38vw)];
	}
	.loading {
		@apply bg-gray-50;
		@apply animate-pulse;
	}
</style>
