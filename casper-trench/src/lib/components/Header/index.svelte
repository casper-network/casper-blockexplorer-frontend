<script>
	import OtherStatsSection from './OtherStatsSection.svelte';
	import Navbar from './Navbar.svelte';
	//import Filter from '$lib/components/Header/Filter.svelte';
	import HomeStatsSection from './HomeStatsSection.svelte';
	import { page } from '$app/stores';

	$: isHome = $page.url.pathname === '/';
</script>

<div class="header">
	<Navbar />
	{#if isHome}
		<!-- Filter not working. Possibly remove -->
		<!-- <Filter /> -->
		<!-- <HomeStatsSection /> -->
	{:else}
		<div class="header-flex">
			<!-- <OtherStatsSection /> -->
			<!-- <Filter /> -->
		</div>
	{/if}
</div>

<!-- ORIGINAL BG IMAGE background: url('/images/png/header-bg.png') center/cover; -->
<style lang="postcss">
	.header {
		@apply flex flex-col gap-y-[2vw];
		@apply sm:p-4 md:px-[clamp(16px,3.57vw,3.57vw)] md:py-[clamp(16px,0.95vw,0.95vw)];
		@apply bg-no-repeat bg-center bg-auto;
		@apply min-w-[100vw];
		background: #173f96 center/cover;
	}

	.header-flex {
		@apply flex items-center justify-between;
	}
</style>
