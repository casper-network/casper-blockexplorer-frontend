<script>
	import ErrorPageErrorIcon from '$icons/ErrorPageErrorIcon.svelte';
	import SearchIcon from '$lib/icons/SearchIcon.svelte';
	import Smudge from '$lib/icons/Smudge.svelte';

	export let value = '';
</script>

<div class="error-page">
	<div class="bg-special">
		<Smudge />
	</div>
	<div class="container">
		<img src="/images/png/error.png" alt="error" />
		<div class="title">Something Went Wrong</div>
		<div class="info">
			<div class="icon">
				<ErrorPageErrorIcon />
			</div>
			<div class="text">Bad Gateway</div>
		</div>
		<div class="try">Please try a search</div>
		<div class="filter">
			<input
				type="text"
				name="filter"
				placeholder="Search by Address / Txn Hash / Block / Token / Ens"
				bind:value
			/>

			<div class="search">
				<div class="search-icon">
					<SearchIcon />
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.error-page {
		@apply px-4 pt-[clamp(16px,5.95vw,5.95vw)] pb-[clamp(16px,7.74vw,7.74vw)];
		@apply flex justify-center;
	}

	.container {
		@apply md:max-w-[64.52vw];
		@apply pb-[clamp(16px,4.82vw,4.82vw)] pt-[clamp(16px,2.32vw,2.32vw)] mx-auto;
		@apply rounded-[1.19vh] md:rounded-[1.19vw];
		@apply shadow-[0px_0px_11px] shadow-color-shadow-black;
		@apply flex flex-col items-center justify-center;
		@apply bg-white;
	}

	.info {
		@apply flex items-center gap-[clamp(4px,0.36vw,0.36vw)];
		@apply text-[clamp(16px,1.19vw,1.19vw)] text-color-table-header;
		@apply mb-[clamp(16px,1.9vw,1.9vw)];
	}

	.info > .icon {
		@apply h-[clamp(12px,0.71vw,0.71vw)] w-[clamp(12px,0.71vw,0.71vw)];
	}

	img {
		@apply md:w-[14.58vw] md:h-[14.58vw];
	}

	.title {
		@apply font-bold text-[clamp(24px,1.9vw,1.9vw)] text-color-deep-blue-text;
	}

	.try {
		@apply mb-[clamp(16px,0.95vw,0.95vw)];
		@apply text-[clamp(14px,1.07vw,1.07vw)] text-color-grey-footer-label;
	}

	.filter {
		@apply flex items-center;
		@apply w-[clamp(100px,26.67vw,26.67vw)] h-[clamp(10px,2.5vw,2.5vw)] rounded-r-[0.24vw];
		@apply text-[clamp(10px,0.83vw,0.83vw)] text-color-table-header;
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-code-background;
		@apply rounded-r-[0.24vw];
	}

	input {
		@apply bg-transparent w-full flex-grow px-[clamp(16px,0.95vw,0.95vw)] appearance-none outline-none;
	}

	.search {
		@apply h-full w-[clamp(20px,3.36vw,3.36vw)] flex items-center justify-center cursor-pointer;
		@apply bg-gradient-to-r from-color-search-btn-blue to-color-search-btn-green;
		@apply rounded-[0.24vw];
	}

	.search-icon {
		@apply w-[clamp(10px,0.95vw,0.95vw)] h-[clamp(10px,0.95vw,0.95vw)];
	}

	.bg-special {
		@apply absolute;
		@apply mx-auto;
		@apply -z-10;
		@apply transform -translate-y-[10vw];
		@apply md:w-[90vw];
	}
</style>
