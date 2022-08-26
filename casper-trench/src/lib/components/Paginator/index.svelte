<script lang="ts">
	import PaginatorChevron from '$lib/icons/PaginatorChevron.svelte';
	import { createEventDispatcher } from 'svelte';
	import ShowRow from './ShowRow.svelte';
	import { getLatestBlocks } from '$utils/chain/blocks';
	const dispatch = createEventDispatcher();
	let page = 1;

	export let itemsPerPage = 10;
	export let latestBlock = 0;
	export let isRangeBlock = false;
	export let startIndex = 0;
	export let showTotalRows = true;
	export let items: {}[] = [];
	export let pagedItems: {}[] = [];
	export let apiPaginator = false;
	const pageItems = () => {
		pagedItems =
			items &&
			items.length > 0 &&
			items.filter((item, index) => {
				if (index >= startIndex && index < startIndex + itemsPerPage) {
					return item;
				}
			});
	};
	$: items && itemsPerPage && pageItems();
	$: totalPages = items && pageItems && Math.ceil(items.length / itemsPerPage);
</script>

<div class="paginator">
	{#if showTotalRows}
		<div class="total">{items && items.length} total rows</div>
	{:else}
		<ShowRow bind:itemsPerPage />
	{/if}
	<div class="paginator-buttons">
		{#if showTotalRows}
			<ShowRow bind:itemsPerPage />
		{/if}
		<div class="actual-paginator">
			<button
				type="button"
				on:click={async () => {
					if (isRangeBlock) {
						let latestBlock = await getLatestBlocks(1);
						startIndex = latestBlock && latestBlock[0].height;
					} else {
						startIndex = 0;
					}
					page = 1;
					apiPaginator ? dispatch('load-page') : pageItems();
				}}
				class="button">First</button
			>
			<button
				type="button"
				on:click={() => {
					if (page > 1) {
						page--;
						isRangeBlock ? (startIndex += itemsPerPage) : (startIndex -= itemsPerPage);
						apiPaginator ? dispatch('load-page') : pageItems();
					}
				}}
				class="button"
			>
				<div class="icon">
					<PaginatorChevron />
				</div>
			</button>
			<div class="text">
				Page {page}
				{#if !apiPaginator}
					of {totalPages.toLocaleString()}
				{/if}
				{#if isRangeBlock}
					of {parseFloat((latestBlock / itemsPerPage).toFixed()).toLocaleString()}
				{/if}
			</div>
			<button
				type="button"
				on:click={() => {
					if (apiPaginator && items && items.length > 0) {
						page++;
						// startIndex += itemsPerPage;
						isRangeBlock ? (startIndex -= itemsPerPage) : (startIndex += itemsPerPage);
						dispatch('load-page');
					} else {
						if (page < totalPages) {
							page++;
							startIndex += itemsPerPage;
							pageItems();
						}
					}
				}}
				class="button"
			>
				<div class="icon right">
					<PaginatorChevron />
				</div>
			</button>
			<button
				type="button"
				on:click={() => {
					if (apiPaginator) return;
					page = totalPages;
					startIndex = (totalPages - 1) * itemsPerPage;
					pageItems();
				}}
				class="button">Last</button
			>
		</div>
	</div>
</div>

<style lang="postcss">
	.paginator {
		@apply flex justify-between;
		@apply text-[clamp(8px,0.95vw,0.95vw)] text-color-grey-footer-label;
	}

	.paginator-buttons {
		@apply flex gap-[1.19vw];
	}

	.actual-paginator {
		@apply flex gap-[0.71vw] items-center;
	}

	.text {
		@apply mx-[0.6vw];
	}

	.right {
		@apply transform rotate-180;
	}

	.icon {
		@apply h-[0.95vw];
	}

	.button {
		@apply px-[0.83vw] py-[0.6vw];
		@apply leading-none;
		@apply border-[0.12vw] rounded-[0.3vw] border-color-paginator-border;
		@apply cursor-pointer;
	}
</style>
