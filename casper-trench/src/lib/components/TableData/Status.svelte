<script lang="ts">
	export let inactive: boolean;
	$: status = inactive ? 'Inactive' : 'Active';
</script>

<div class="status {status.toLowerCase()}">
	{status}
</div>

<style lang="postcss">
	.status {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-white;
		@apply py-[clamp(2px,0.36vw,0.36vw)] px-[clamp(4px,0.6vw,0.6vw)];
		@apply max-w-max;
		@apply rounded-full;
	}

	.active {
		@apply bg-color-arcadia-green;
	}

	.inactive {
		@apply bg-color-arcadia-red;
	}
</style>
