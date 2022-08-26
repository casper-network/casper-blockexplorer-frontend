<script lang="ts">
	import LatestBlocks from '$lib/sections/HomePage/LatestBlocks.svelte';
	import TopValidators from '$lib/sections/HomePage/TopValidators.svelte';
</script>

<section>
	<!-- <TopValidators /> -->
	<LatestBlocks />
</section>

<style lang="postcss">
	section {
		@apply w-full;
		@apply flex flex-col md:flex-row md:items-start md:justify-between gap-[clamp(30px,6.7vw,6.7vw)];
	}
</style>
