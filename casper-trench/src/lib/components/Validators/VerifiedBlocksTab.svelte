<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import { isLoading } from '$stores/loading';
	import { getProposerBlocks } from '$utils/api';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import type { ProposerBlocks } from '$utils/types/block';
	import { onMount } from 'svelte';

	export let props: {
		validatorPublicKey: string;
	};
	let blocksPerPage: number = 10;
	let startIndex = 0;
	let blocks: ProposerBlocks[];
	onMount(async () => {
		await fetchProposerBlocks();
	});

	const fetchProposerBlocks = async () => {
		$isLoading = true;
		blocks = await getProposerBlocks(props.validatorPublicKey, blocksPerPage, startIndex);
		$isLoading = false;
	};
	$: if (blocksPerPage) {
		setTimeout(async () => {
			await fetchProposerBlocks();
		}, 1);
	}
</script>

<div class="delegators-tab">
	<div class="total">
		{blocksPerPage} blocks per page
	</div>
	<table>
		<tr>
			<th class="block">Block</th>
			<th>Era</th>
			<th>Age</th>
			<th>Transactions</th>
			<th>Transfer</th>
			<th class="right">Block Hash</th>
		</tr>
		<div class="divider table-header-border" />
		{#if blocks && blocks.length > 0}
			{#each blocks as block}
				<tr>
					<td class="block">{block.height}</td>
					<td>{block.era}</td>
					<td>{`${timeAgo(millisToFormat(Date.now() - Date.parse(block.timestamp)))} ago`}</td>
					<td>{block.deploys}</td>
					<td>{block.transfers}</td>
					<td class="hash right"> <a href="/blocks/{block.hash}"> {block.hash}</a></td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={blocksPerPage}
		apiPaginator
		bind:items={blocks}
		bind:startIndex
		on:load-page={async () => await fetchProposerBlocks()}
	/>
</div>

<style lang="postcss">
	table {
		@apply table-auto w-full relative;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[2vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] px-[2vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.block {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.hash {
		@apply text-color-hover-footer-link;
	}

	.right {
		@apply text-right;
	}
</style>
