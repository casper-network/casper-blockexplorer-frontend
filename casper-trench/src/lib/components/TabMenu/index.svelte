<script>
	import TabSelectorIcon from '$lib/icons/TabSelectorIcon.svelte';

	export let menuOptions = [];
	let selected = 0;
</script>

<div class="tab-menu">
	<div class="header">
		{#each menuOptions as option, i}
			<div
				class="option"
				class:selected={selected === i}
				on:click={() => {
					selected = i;
				}}
			>
				{#if selected === i}
					<div class="selector">
						<TabSelectorIcon />
					</div>
				{/if}
				<div class="text">
					{option.title}
				</div>
			</div>
		{/each}
	</div>
	<div class="content">
		<svelte:component this={menuOptions[selected].component} props={menuOptions[selected].props} />
	</div>
</div>

<style lang="postcss">
	.header {
		@apply flex items-center;
	}

	.option {
		@apply px-[0.6vh] md:px-[0.6vw];
		@apply cursor-pointer;
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
	}

	.text {
		@apply px-[clamp(10px,2.14vw,2.14vw)] py-[clamp(8px,1.19vw,1.19vw)];
	}

	.selected {
		@apply border-[clamp(1px,0.15vw,0.15vw)] border-b-0 border-color-tooltip-border border-opacity-100;
		@apply rounded-[0.6vw] rounded-b-none;
		@apply text-color-table-header font-medium;
	}

	.content {
		@apply border-[clamp(1px,0.15vw,0.15vw)] border-color-tooltip-border border-opacity-100;
		@apply p-[2.38vw];
		@apply rounded-[0.6vw] rounded-tl-none;
	}

	.selector {
		@apply w-full h-[0.24vh] md:h-[0.24vw];
	}
</style>
