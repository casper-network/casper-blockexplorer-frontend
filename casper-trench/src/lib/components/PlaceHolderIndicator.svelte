<script>
	import Tooltip from './Reusables/Tooltip.svelte';
</script>

<div>
	<Tooltip text="Data Not Available" />
</div>

<style lang="postcss">
	div {
		@apply w-[clamp(10px,1.25vw,1.25vw)] h-[clamp(10px,1.25vw,1.25vw)];
		@apply border-2 border-red-600 rounded-full;
		@apply flex  items-center justify-center;
		@apply p-[0.5vw];
	}
</style>
