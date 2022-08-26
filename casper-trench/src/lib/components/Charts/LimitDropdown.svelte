<script>
	import ShowRowChevron from '$lib/icons/ShowRowChevron.svelte';
	import { clickOutside } from '$utils/clickOutside';
	import { createEventDispatcher } from 'svelte';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let limit = 10;
	let dropdown = false;
	const limits = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200];
</script>

<div
	class="show-row"
	use:clickOutside
	on:click_outside={() => {
		dropdown = false;
	}}
>
	<div class="title">Limit</div>
	<div>
		<button type="button" on:click={() => (dropdown = !dropdown)} class="dropdown-header">
			<div class="value">
				{limit}
			</div>
			<div class="chevron">
				<ShowRowChevron />
			</div>
		</button>

		{#if dropdown}
			<div class="dropdown" transition:slide>
				{#each limits as item}
					<div
						class="dropdown-option"
						class:selected-drop={limit === item}
						on:click={() => {
							limit = item;
							dropdown = false;
							dispatch('change');
						}}
					>
						{item}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</div>

<style lang="postcss">
	.show-row {
		@apply flex items-center gap-[0.71vw];
	}

	.dropdown-header {
		@apply flex items-center gap-[clamp(10px,1.07vw,1.07vw)];
		@apply cursor-pointer;
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply rounded-[clamp(4px,0.3vw,0.3vw)];
		@apply p-[clamp(8px,0.71vw,0.71vw)];
	}
	.dropdown {
		@apply absolute z-50;
		@apply text-color-table-header text-opacity-50 text-[clamp(10px,1.07vw,1.07vw)];
		@apply flex flex-col gap-[0.4vw] items-center;
		@apply min-w-max;
		@apply rounded-[0.6vw];
		@apply bg-white;
		@apply mt-[0.89vw] py-[0.83vw] px-[1.07vw];
		@apply shadow-[0px_0px_11px_0px_rgba(0,0,0,0.1)];
	}

	.dropdown-option {
		@apply hover:text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.dropdown-option.selected-drop {
		@apply text-color-hover-footer-link font-medium;
	}
	.value {
		@apply text-color-black-text;
		@apply bg-transparent;
	}
</style>
