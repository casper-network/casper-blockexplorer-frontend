<script>
	import NavbarChevron from '$lib/icons/NavbarChevron.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';

	export let value = '';
</script>

<div class="filter">

	<!--TO DO: Temporarily Removed: Cannot Login ************************
	<div class="filter-dropdown"> 
	
		<div class="text">Filter</div>
		<div class="chevron">
			<NavbarChevron />
		</div>
	</div>

	<!-- CHANGE -->


	<input
		type="text"
		name="filter"
		
		placeholder="Search blocks / transactions / accounts"
		bind:value
	/>

	<div class="search">
		<div class="search-icon">
			<SearchIcon />
		</div>
	</div>
</div>

<style lang="postcss">
	.filter {
		@apply flex items-center;
		@apply w-[clamp(100px,34.58vw,34.58vw)] h-[clamp(10px,2.5vw,2.5vw)] rounded-r-[0.24vw] bg-color-filter-bg;
		@apply text-[clamp(10px,0.83vw,0.83vw)] text-white;
	}

	.filter-dropdown {
		@apply w-[20%] h-full bg-color-filter-dropdown-button-bg flex items-center justify-center cursor-pointer;
	}

	input {
		@apply bg-transparent w-full flex-grow px-[clamp(16px,0.95vw,0.95vw)] appearance-none outline-none;
	}

	.chevron {
		@apply h-[clamp(14px,0.95vw,0.95vw)] w-[clamp(14px,0.95vw,0.95vw)] ml-[clamp(4px,0.36vw,0.36vw)];
	}

	.search {
		@apply h-full w-[clamp(20px,3.36vw,3.36vw)] flex items-center justify-center cursor-pointer;
		@apply bg-gradient-to-r from-color-search-btn-blue to-color-search-btn-green;
		@apply rounded-r-[0.24vw];
	}

	.search-icon {
		@apply w-[clamp(10px,0.95vw,0.95vw)] h-[clamp(10px,0.95vw,0.95vw)];
	}
</style>
