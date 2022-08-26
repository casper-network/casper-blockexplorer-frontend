<script lang="ts">
	import GreenCheckMarkIcon from '$lib/icons/GreenCheckMarkIcon.svelte';
	import YellowWarningIcon from '$lib/icons/YellowWarningIcon.svelte';
	import Hash from './Hash.svelte';

	export let hash = '';
	export let color: 'text' | 'yellow' = 'text';
	export let right = false;
</script>

<div class="tx-hash">
	<Hash {hash} {color} variant={right ? 'right' : 'center'} />
	<div class="icon">
		{#if color === 'text'}
			<GreenCheckMarkIcon />
		{:else}
			<YellowWarningIcon />
		{/if}
	</div>
</div>

<style lang="postcss">
	.tx-hash {
		@apply flex items-center gap-[clamp(8px,1vw,1vw)];
	}

	.icon {
		@apply h-[clamp(8px,0.83vw,0.83vw)] w-[clamp(8px,0.83vw,0.83vw)];
	}
</style>
