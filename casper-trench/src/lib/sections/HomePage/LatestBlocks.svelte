<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Reusables/Button.svelte';
	import BlockHeight from '$lib/components/TableData/BlockHeight.svelte';
	import { getLatestBlocks } from '$utils/chain/blocks';
	import { isLoading } from '$stores/loading';
	import type { Block } from '$utils/types/block';
	import { onMount } from 'svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	let blocks: Block[];
	onMount(async () => {
		$isLoading = true;
		blocks = await getLatestBlocks(10);
		$isLoading = false;
	});
</script>

<div class="top-validators">
	<h3>Latest</h3>
	<h2>Blocks</h2>
	{#if blocks && blocks.length > 0}
		<table>
			<tr>
				<th>Block Height</th>
				<th>Era</th>
				<th>Block Hash</th>
				<th>Deploys</th>
			</tr>
			<div class="divider table-header-border" />
			{#each blocks as block}
				<tr>
					<td
						><BlockHeight
							blockDate={block.timestamp}
							blockHeight={block.height.toLocaleString('en')}
						/></td
					>
					<td class="text-color-table-header">{block.eraID}</td>
					<td> <a href="/blocks/{block.hash}"><Hash hash={block.hash} /></a></td>
					<td class="text-color-table-header">{block.transactions}</td>
				</tr>
			{/each}
		</table>

		<div class="button">
			<Button outline on:click={() => goto(`/blocks`)}>View all Blocks</Button>
		</div>
	{/if}
</div>

<style lang="postcss">
	.top-validators {
		@apply flex flex-col items-start;
		@apply w-full;
	}
	h3 {
		@apply font-medium text-color-hover-footer-link text-sm md:text-[clamp(12px,1.07vw,1.07vw)] leading-[120%];
	}
	h2 {
		@apply font-bold text-color-table-header text-base md:text-[clamp(14px,1.4vw,1.4vw)] leading-[120%];
		@apply mt-[clamp(5px,0.3vw,0.3vw)] mb-[clamp(14px,1.6vw,1.6vw)];
	}
	table {
		@apply table-auto w-full relative;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header text-left;
	}

	td {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] min-w-max;
	}

	.button {
		@apply w-full;
		@apply flex justify-center;
		@apply mt-[clamp(14px,1.6vw,1.6vw)];
	}
</style>
