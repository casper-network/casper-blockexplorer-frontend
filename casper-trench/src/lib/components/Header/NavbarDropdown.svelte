<script lang="ts">
	import NavbarChevron from '$lib/icons/NavbarChevron.svelte';
	import { slide } from 'svelte/transition';
	import { clickOutside } from '$utils/clickOutside.js';
	import { page } from '$app/stores';

	export let navItem: {
		text: string;
		link: string;
		dropdown: {
			text: string;
			link: string;
		}[];
	};

	let droppedDown = false;
	let selected = false;

	function handleClickOutside(event) {
		droppedDown = false;
	}

	function checkSelected(link: string) {
		let returnValue = false;
		navItem.dropdown.forEach((item) => {
			if (item.link === link) {
				returnValue = true;
			}
		});
		selected = returnValue;
	}

	$: checkSelected($page.url.pathname);
</script>

<div class="wrapper" use:clickOutside on:click_outside={handleClickOutside}>
	<div
		class="dropdown-header"
		on:click={() => {
			droppedDown = !droppedDown;
		}}
	>
		<!-- TODO make this use pathname instead -->
		<div class="text" class:selected>
			{navItem.text}
		</div>
		<div class="chevron" class:flipped={droppedDown}>
			<NavbarChevron />
		</div>
	</div>
	{#if droppedDown}
		<div class="dropdown" transition:slide>
			{#each navItem.dropdown as dropdown}
				<div
					class="link"
					class:link-select={$page.url.pathname === dropdown.link}
					on:click={() => {
						droppedDown = false;
					}}
				>
					<a href={dropdown.link}>{dropdown.text}</a>
				</div>
			{/each}
		</div>
	{/if}
</div>

<style lang="postcss">
	.wrapper {
		@apply relative;
	}

	.dropdown-header {
		@apply flex items-center cursor-pointer min-w-max;
	}

	.chevron {
		@apply h-[clamp(14px,0.95vw,0.95vw)] w-[clamp(14px,0.95vw,0.95vw)] ml-[clamp(4px,0.36vw,0.36vw)];
		@apply transition-all;
	}

	.flipped {
		@apply rotate-180;
	}

	.selected {
		@apply text-white text-opacity-100;
	}

	.dropdown {
		@apply absolute z-50;
		@apply md:rounded-b-[0.48vw];
		@apply bg-white;
		@apply md:min-w-[8vw];
		@apply px-[clamp(16px,1.25vw,1.25vw)];
	}

	.link {
		@apply my-[clamp(8px,0.83vw,0.83vw)];
		@apply text-color-table-header text-opacity-80 text-[clamp(12px,0.83vw,0.83vw)] hover:text-color-hover-footer-link;
	}

	.link-select {
		@apply text-color-hover-footer-link;
	}
</style>
