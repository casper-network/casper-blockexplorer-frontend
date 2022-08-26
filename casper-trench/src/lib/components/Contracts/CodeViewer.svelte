<script lang="ts">
	import { slide } from 'svelte/transition';

	import ContractChevron from '$lib/icons/ContractChevron.svelte';
	import ContractCopyIcon from '$lib/icons/ContractCopyIcon.svelte';
	import ChainIcon from '$lib/icons/ChainIcon.svelte';
	import MaximizeIcon from '$lib/icons/MaximizeIcon.svelte';
	import OpenIcon from '$lib/icons/OpenIcon.svelte';
	import { clickOutside } from '$utils/clickOutside';

	export let outlineDropdown = false;
	export let moreOptionsDropdown = false;
	export let codeHeader = false;
	export let outlineCodeHeader = false;
	export let decompileButton = false;
	export let opCodesButton = false;
	export let code = '';

	const lines = code.split(/\r\n|\r|\n/).length;
	let lineString = '';
	for (let index = 0; index < lines; index++) {
		lineString += `${index + 1}\n`;
	}

	let outlineOptions = ['Outline', 'Test 2', 'Test 3', 'Test 4'];
	let showOutlineDropdown = false;
	let selectedOutlineDropdown = 0;

	let moreOptions = ['More Options', 'Test 2', 'Test 3', 'Test 4'];
	let showMoreOptionsDropdown = false;
	let selectedMoreOptionsDropdown = 0;

	const selectDropdownOption = (index: number) => {
		selectedOutlineDropdown = index;
		showOutlineDropdown = false;
	};

	const selectMoreOption = (index: number) => {
		selectedMoreOptionsDropdown = index;
		showMoreOptionsDropdown = false;
	};
</script>

<div class="code-viewer">
	<div class="top">
		<div class="title">
			<slot />
			{#if code.length === 0}
				<div class="add" on:click={() => {}}>+ Add</div>
			{/if}
		</div>

		<div class="drop-downs">
			{#if outlineCodeHeader}
				<div
					class="wrapper"
					use:clickOutside
					on:click_outside={() => {
						showOutlineDropdown = false;
					}}
				>
					<div class="button" on:click={() => (showOutlineDropdown = !showOutlineDropdown)}>
						<div class="text">
							{outlineOptions[selectedOutlineDropdown]}
						</div>
						<div class="icon" class:flipped={showOutlineDropdown}>
							<ContractChevron />
						</div>
					</div>
					{#if showOutlineDropdown}
						<div class="dropdown" transition:slide>
							{#each outlineOptions as dropdownOption, index}
								<div
									class="dropdown-option"
									class:selected-drop={selectedOutlineDropdown === index}
									on:click={() => {
										selectDropdownOption(index);
									}}
								>
									{dropdownOption}
								</div>
							{/each}
						</div>
					{/if}
				</div>
				<div class="code-header">
					<div class="copy-icon">
						<ContractCopyIcon />
					</div>
					<div class="maximize-icon">
						<MaximizeIcon />
					</div>
				</div>
			{/if}

			{#if outlineDropdown}
				<div
					class="wrapper"
					use:clickOutside
					on:click_outside={() => {
						showOutlineDropdown = false;
					}}
				>
					<div class="button" on:click={() => (showOutlineDropdown = !showOutlineDropdown)}>
						<div class="text">
							{outlineOptions[selectedOutlineDropdown]}
						</div>
						<div class="icon" class:flipped={showOutlineDropdown}>
							<ContractChevron />
						</div>
					</div>
					{#if showOutlineDropdown}
						<div class="dropdown" transition:slide>
							{#each outlineOptions as dropdownOption, index}
								<div
									class="dropdown-option"
									class:selected-drop={selectedOutlineDropdown === index}
									on:click={() => {
										selectDropdownOption(index);
									}}
								>
									{dropdownOption}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}

			{#if decompileButton}
				<div class="wrapper">
					<div class="button" on:click={() => {}}>
						<div class="text">Decompile ByteCode</div>
						<div class="open-icon">
							<OpenIcon grey />
						</div>
					</div>
				</div>
			{/if}

			{#if opCodesButton}
				<div class="wrapper">
					<div class="button" on:click={() => {}}>
						<div class="text">Switch to Opcodes View</div>
					</div>
				</div>
			{/if}

			{#if moreOptionsDropdown}
				<div
					class="wrapper"
					use:clickOutside
					on:click_outside={() => {
						showMoreOptionsDropdown = false;
					}}
				>
					<div class="button" on:click={() => (showMoreOptionsDropdown = !showMoreOptionsDropdown)}>
						<div class="text">
							{moreOptions[selectedMoreOptionsDropdown]}
						</div>
						<div class="icon" class:flipped={showMoreOptionsDropdown}>
							<ContractChevron />
						</div>
					</div>
					{#if showMoreOptionsDropdown}
						<div class="dropdown" transition:slide>
							{#each moreOptions as dropdownOption, index}
								<div
									class="dropdown-option"
									class:selected-drop={selectedMoreOptionsDropdown === index}
									on:click={() => {
										selectMoreOption(index);
									}}
								>
									{dropdownOption}
								</div>
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</div>
	</div>

	{#if code.length > 0}
		<div class="code-content">
			{#if codeHeader}
				<div class="code-header">
					<div class="copy-icon">
						<ContractCopyIcon />
					</div>
					<div class="link-icon">
						<ChainIcon />
					</div>
					<div class="maximize-icon">
						<MaximizeIcon />
					</div>
				</div>
			{/if}
			<div class="data-wrapper">
				<div class="data">
					<pre>{lineString}</pre>
					<pre>{code}</pre>
				</div>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.button {
		@apply p-[clamp(8px,0.6vw,0.6vw)];
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply text-color-grey-footer-label;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply transition-all duration-300;
		@apply flex items-center gap-[0.6vw];
	}

	.button {
		@apply p-[clamp(8px,0.6vw,0.6vw)];
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply text-color-grey-footer-label;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply transition-all duration-300;
		@apply flex items-center gap-[0.6vw];
	}

	.icon {
		@apply w-[0.54vw] h-[0.33vw];
		@apply transition-all;
	}

	.flipped {
		@apply transform rotate-180;
	}

	.wrapper {
		@apply relative;
		@apply cursor-pointer;
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

	.drop-downs {
		@apply flex items-center gap-[clamp(12px,0.95vw,0.95vw)];
	}

	.top {
		@apply flex items-center justify-between;
		@apply mt-[clamp(16px,1.67vw,1.67vw)];
	}

	.title {
		@apply flex items-center gap-[clamp(2px,0.3vw,0.3vw)];
	}

	.code-header {
		@apply flex items-center gap-[clamp(16px,1.43vw,1.43vw)] justify-end;
	}

	.code-header > div {
		@apply w-[clamp(20px,1.43vw,1.43vw)] h-[clamp(20px,1.43vw,1.43vw)];
		@apply cursor-pointer;
	}

	.data {
		@apply flex gap-[clamp(16px,0.95vw,0.95vw)];
		@apply max-h-[24.7vh] md:max-h-[24.7vw];
		@apply overflow-y-auto;
	}

	.data::-webkit-scrollbar {
		@apply w-[clamp(4px,0.48vw,0.48vw)] h-[clamp(4px,0.48vw,0.48vw)];
	}

	.data::-webkit-scrollbar-track {
		@apply bg-transparent;
	}

	.data::-webkit-scrollbar-thumb {
		@apply bg-color-code-scrollbar;
		@apply rounded-[0.77vh] md:rounded-[0.77vw];
		@apply pr-[clamp(4px,0.48vw,0.48vw)];
	}

	.data-wrapper {
		@apply p-[clamp(4px,0.48vw,0.48vw)];
		@apply bg-color-code-background;
		@apply mt-[clamp(16px,1.67vw,1.67vw)];
		@apply rounded-[0.95vh] md:rounded-[0.95vw];
		@apply text-color-grey-footer-label;
	}

	.add {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
		@apply ml-[clamp(8px,0.48vw,0.48vw)];
	}

	.code-content {
		@apply mt-[clamp(16px,1.67vw,1.67vw)];
	}

	.open-icon {
		@apply w-[0.95vh] h-[0.95vh] md:w-[0.95vw] md:h-[0.95vw];
	}
</style>
