<script lang="ts">
	import { getEconomics, getLatestBlocks, getStats } from '$utils/api';
	import { aTimeAgo, parseStringValue } from '$utils/converters';
	import type { Block } from '$utils/types/block';
	import type { Economics } from '$utils/types/economics';
	import type { Stats } from '$utils/types/stats';
	import { onMount } from 'svelte';
	import SvelteLoader from '$components/SvelteLoader/index.svelte';

	let stats: Stats;
	let economics: Economics;
	let blocks: Block[];
	let isLoading = true;
	onMount(async () => {
		stats = await getStats();
		economics = await getEconomics();
		blocks = await getLatestBlocks(1);
		isLoading = false;
	});
</script>

{#if isLoading}
	<SvelteLoader />
{/if}
<div class="home-stats-section header-stats-background">
	<div class="stat-column">
		<div class="title">BLOCK HEIGHT</div>
		{#if !isLoading && blocks}
			<div class="value">
				{(blocks && blocks.length > 0 && blocks[0].header.height.toLocaleString('en')) || ''}
			</div>
			<div class="detail flex">
				{`${aTimeAgo(
					Date.now() - Date.parse(blocks && blocks.length > 0 && blocks[0].header.timestamp)
				)} ` || '0 seconds '} ago
			</div>
		{:else}
			<div class="value">0</div>
			<div class="detail flex">0</div>
		{/if}
	</div>

	<div class="vt" />

	<div class="stat-column">
		<div class="title">APY</div>
		<div class="value">
			{(economics && economics.APY.toFixed(2)) || ''}%
		</div>
		<div class="detail">Annual Percentage Yield</div>
	</div>

	<div class="vt" />

	<div class="stat-column">
		<div class="title">CSPR PRICE</div>
		<div class="value">
			${Math.floor(stats && stats.price * 10000) / 10000 || ''}
		</div>
		<div class="detail">
			${(stats && stats.marketcap.toLocaleString('en')) || ''} Market Cap
		</div>
	</div>

	<div class="vt" />

	<div class="stat-column">
		<div class="title">CIRCULATING SUPPLY</div>
		{#if !isLoading && economics}
			<div class="value">
				{parseFloat(economics && economics.circulating_supply.substring(0, 10)).toLocaleString(
					'en'
				) || ''}
			</div>
			<div class="detail">
				{(
					(parseFloat(economics && economics.circulating_supply) /
						parseFloat(economics && economics.total_supply)) *
					100
				).toFixed(2)}% of {parseFloat(
					economics && economics.total_supply.substring(0, 11)
				).toLocaleString('en') || ''}
			</div>
		{:else}
			<div class="value">0</div>
			<div class="detail">0% of 0</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.home-stats-section {
		@apply h-[clamp(100px,5.5vw,5.5vw)] w-[clamp(500px,46.96vw,46.96vw)];
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(20px,1.5vw,1.5vw)] rounded-[clamp(10px,1.19vw,1.19vw)] border-[clamp(1px,0.06vw,0.06vw)] border-color-border-header-stats border-opacity-50;
		@apply flex gap-[clamp(10px,1.43vw,1.43vw)] items-center backdrop-blur;
	}

	.stat-column {
		@apply w-full leading-none;
	}

	.vt {
		@apply h-full border-r border-color-divider-header-stats border-opacity-50;
	}

	.title {
		@apply text-[clamp(8px,0.70vw,0.70vw)] text-color-title-header-stats mb-[clamp(2px,0.3vw,0.3vw)];
	}

	.value {
		@apply text-[clamp(10px,1.43vw,1.43vw)] text-white font-medium mb-[clamp(2px,0.24vw,0.24vw)];
	}

	.detail {
		@apply text-[clamp(8px,0.75vw,0.75vw)] text-white;
	}

	.side {
		@apply absolute;
		@apply transform translate-x-[3.5vw] translate-y-[-0.2vw];
	}
</style>
