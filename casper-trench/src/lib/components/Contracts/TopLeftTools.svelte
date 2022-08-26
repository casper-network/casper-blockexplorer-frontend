<script>
	import ContractChevron from '$lib/icons/ContractChevron.svelte';
	import InfoIcon from '$lib/icons/InfoIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	export let searchText = '';
	export let searchOnly = false;
</script>

<div class="top-left">
	{#if !searchOnly}
		<div class="info">
			<InfoIcon />
		</div>
	{/if}
	<div class="search">
		<div class="icon">
			<SearchIcon grey />
		</div>
		<input type="text" bind:value={searchText} placeholder="Search Source Code" />
	</div>
	{#if !searchOnly}
		<div class="up-down-buttons">
			<div class="up" on:click={() => {}}>
				<div class="icon">
					<ContractChevron />
				</div>
			</div>
			<div class="down" on:click={() => {}}>
				<div class="icon">
					<ContractChevron />
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.top-left {
		@apply flex;
		@apply absolute top-0 right-0;
	}

	.info {
		@apply w-[1.31vh] h-[1.31vh] md:w-[1.31vw] md:h-[1.31vw];
		@apply cursor-pointer;
		@apply mr-[clamp(8px,0.83vw,0.83vw)];
		@apply my-auto;
	}

	.search {
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(10px,0.83vw,0.83vw)];
		@apply text-[clamp(10px,0.83vw,0.83vw)] text-color-table-header;
		@apply border-color-grey-footer-label border-[clamp(1px,0.06vw,0.06vw)];
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply flex items-center gap-[clamp(4px,0.42vw,0.42vw)];
		@apply mr-[clamp(10px,0.83vw,0.83vw)];
	}

	input {
		@apply outline-none;
	}

	.search > .icon {
		@apply w-[clamp(12px,00.95vw,0.95vw)] h-[clamp(12px,00.95vw,0.95vw)];
	}

	.up-down-buttons {
		@apply border-color-grey-footer-label border-[clamp(1px,0.06vw,0.06vw)];
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply p-[0.3vh] md:p-[0.3vw];
		@apply flex items-center;
	}

	.up-down-buttons > div {
		@apply w-[clamp(20px,2.38vw,2.38vw)] h-full;
		@apply flex items-center justify-center;
		@apply cursor-pointer;
	}

	.up-down-buttons > div > .icon {
		@apply h-[clamp(4px,0.42vw,0.42vw)] w-[clamp(6px,0.71vw,0.71vw)];
	}

	.up {
		@apply border-l-color-grey-footer-label border-[clamp(1px,0.06vw,0.06vw)];
		@apply transform rotate-180;
	}
</style>
