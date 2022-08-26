<script>
	import FilterIcon from '$lib/icons/FilterIcon.svelte';
</script>

<div class="icon" on:click>
	<FilterIcon />
</div>

<style lang="postcss">
	.icon {
		@apply h-[clamp(10px,0.83vw,0.83vw)] w-[clamp(10px,0.83vw,0.83vw)];
		@apply cursor-pointer;
	}
</style>
