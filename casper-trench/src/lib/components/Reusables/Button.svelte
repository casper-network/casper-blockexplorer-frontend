<script lang="ts">
	import ActiveBlockIcon from '$lib/icons/ActiveBlockIcon.svelte';
	import InactiveBlockIcon from '$lib/icons/InactiveBlockIcon.svelte';

	export let gradient = false;
	export let outline = false;
	export let solid = false;
	export let translucent = false;
	export let block = false;
	export let active = false;
	export let red = false;
	export let wide = false;
	export let wider = false;
	export let disabled = false;
</script>

{#if block}
	<button {disabled} class="block" type="button" class:active on:click>
		<div class="icon">
			{#if active}
				<ActiveBlockIcon />
			{:else}
				<InactiveBlockIcon />
			{/if}
		</div>
		<slot />
	</button>
{:else}
	<button
		{disabled}
		class="button"
		class:gradient
		class:outline
		class:solid
		class:translucent
		class:red
		class:button-border-gradient={gradient}
		class:wide
		class:wider
		on:click
	>
		<div class="content">
			<slot />
		</div>
	</button>
{/if}

<style lang="postcss">
	.button {
		@apply min-w-max h-max;
		@apply text-[clamp(10px,1vw,1vw)];
		@apply disabled:cursor-not-allowed cursor-pointer;
	}

	.gradient {
		@apply text-color-hover-footer-link font-medium;
		@apply p-[clamp(1px,0.12vw,0.12vw)];
		@apply rounded-[clamp(4px,0.48vw,0.48vw)];
	}

	.gradient > .content {
		@apply py-[clamp(8px,0.71vw,0.71vw)] px-[clamp(8px,0.95vw,0.95vw)];
		@apply bg-white;
		@apply rounded-[clamp(4px,0.3vw,0.3vw)];
	}

	.outline {
		@apply border-[clamp(0,0.06vw,0.06vw)] border-color-hover-footer-link;
		@apply py-[clamp(8px,0.71vw,0.71vw)] px-[clamp(8px,0.95vw,0.95vw)];
		@apply rounded-[clamp(4px,0.3vw,0.3vw)];
		@apply text-color-hover-footer-link;
	}

	.outline > .content {
		@apply border-none;
	}

	.solid {
		@apply p-[clamp(8px,0.6vw,0.6vw)];
		@apply rounded-[clamp(4px,0.48vw,0.48vw)];
		@apply bg-color-hover-footer-link;
		@apply text-white;
	}

	.translucent {
		@apply bg-color-translucent-green;
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(8px,0.71vw,0.71vw)];
		@apply rounded-[clamp(4px,0.3vw,0.3vw)];
		@apply text-color-hover-footer-link;
	}

	.icon {
		@apply h-[clamp(20px,3.42vw,3.42vw)] w-[clamp(20px,3.42vw,3.42vw)];
	}

	.block {
		@apply flex flex-col items-center gap-[clamp(4px,0.48vw,0.48vw)];
		@apply cursor-pointer;
		@apply text-color-grey-footer-label text-[clamp(10px,1vw,1vw)];
	}

	.block.active {
		@apply font-bold text-color-hover-footer-link;
	}

	.red {
		@apply border-[0.06vw] border-color-arcadia-red;
		@apply py-[clamp(8px,0.71vw,0.71vw)] px-[clamp(8px,0.95vw,0.95vw)];
		@apply rounded-[clamp(4px,0.3vw,0.3vw)];
		@apply text-color-arcadia-red;
	}

	.red > .content {
		@apply border-none;
	}

	.wide {
		@apply md:w-[11.25vw];
	}

	.wider {
		@apply md:w-[21.07vw];
	}
</style>
