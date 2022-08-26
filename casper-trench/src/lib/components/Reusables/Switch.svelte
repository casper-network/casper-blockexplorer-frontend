<script lang="ts">
	import SwitchChevron from '$lib/icons/SwitchChevron.svelte';
	import { createEventDispatcher } from 'svelte/internal';
	import { slide } from 'svelte/transition';

	const dispatch = createEventDispatcher();

	export let options: {
		name?: string;
		dropdown?: string[];
		selectedDropdown?: string;
	}[] = [];
	export let selected = 0;
	export let outlined = false;

	let dropdowns: boolean[] = [];
	dropdowns = [];
	options.forEach((option) => {
		dropdowns.push(false);
		option.selectedDropdown = option.dropdown[0];
	});

	let selectOption = (optionIndex: number) => {
		selected = optionIndex;
		options.forEach((option) => {
			option.selectedDropdown = '';
		});
		dropdowns.forEach((_, i) => (dropdowns[i] = false));
	};

	let selectDropdownOption = (optionIndex: number, dropdownIndex: number) => {
		options.forEach((option, index) => {
			if (optionIndex != index) {
				option.selectedDropdown = '';
			}
		});
		selected = optionIndex;
		options[optionIndex].selectedDropdown = options[optionIndex].dropdown[dropdownIndex];
		dispatch('dropdown-option-clicked', {
			optionIndex,
			dropdownIndex
		});
		dropdowns[optionIndex] = false;
	};
	const buttonClickHandler = (index: number) => {
		if (options[index].dropdown.length > 0) {
			if (!dropdowns[index]) {
				dropdowns.forEach((_, i) => (dropdowns[i] = false));
				dropdowns[index] = true;
				return;
			} else {
				dropdowns[index] = false;
				return;
			}
		}
		selectOption(index);
	};
</script>

<div class="switch" class:outlined>
	{#each options as option, i}
		<div class="wrapper">
			<div class="button" class:selected={selected === i} on:click={() => buttonClickHandler(i)}>
				<div class="text">
					{option.name}
				</div>
				{#if option.dropdown.length > 0}
					<div class="icon" class:flipped={dropdowns[i]}>
						<SwitchChevron />
					</div>
				{/if}
			</div>
			{#if dropdowns[i]}
				<div class="dropdown" transition:slide>
					{#each option.dropdown as dropdownOption, index}
						<div
							class="dropdown-option"
							class:selected-drop={option.selectedDropdown === dropdownOption}
							on:click={() => {
								selectDropdownOption(i, index);
							}}
						>
							{dropdownOption}
						</div>
					{/each}
				</div>
			{/if}
		</div>
	{/each}
</div>

<style lang="postcss">
	.switch {
		@apply flex items-center gap-[clamp(10px,1.07vw,1.07vw)];
		@apply w-max h-max;
		@apply text-[clamp(10px,1.07vw,1.07vw)];
		@apply cursor-pointer;
	}

	.button {
		@apply p-[clamp(8px,0.6vw,0.6vw)];
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply text-color-grey-footer-label;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply transition-all duration-300;
		@apply flex items-center gap-[0.6vw];
	}

	.selected {
		@apply bg-color-hover-footer-link;
		@apply text-white;
		@apply border-color-hover-footer-link border-[clamp(1px,0.06vw,0.06vw)];
	}

	.icon {
		@apply w-[0.54vw] h-[0.33vw];
		@apply transition-all;
	}

	.flipped {
		@apply transform rotate-180;
	}

	.outlined > div > .button {
		@apply border-[0vw];
	}
	.outlined > div > .selected {
		@apply text-color-hover-footer-link;
		@apply bg-white;
		@apply border-color-hover-footer-link border-[clamp(1px,0.06vw,0.06vw)];
		@apply pl-[0.95vw] pr-[1.31vw] py-[0.77vw] rounded-[0.3vw];
	}

	.wrapper {
		@apply relative;
	}

	.dropdown {
		@apply absolute z-50;
		@apply text-color-table-header text-opacity-50 text-[clamp(10px,1.07vw,1.07vw)];
		@apply flex flex-col gap-[0.4vw];
		@apply min-w-max;
		@apply rounded-[0.6vw];
		@apply bg-white;
		@apply mt-[0.89vw] py-[0.83vw] px-[1.07vw];
		@apply shadow-[0px_0px_0.65vw_0px_rgba(0,0,0,0.1)];
	}

	.dropdown-option {
		@apply hover:text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.dropdown-option.selected-drop {
		@apply text-color-hover-footer-link font-medium;
	}
</style>
