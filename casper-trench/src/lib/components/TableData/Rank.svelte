<script>
	import RankIcon from '$lib/icons/RankIcon.svelte';

	export let rank = 1;
</script>

<div class="rank">
	<div class="text">
		{rank}
	</div>
	<RankIcon />
</div>

<style lang="postcss">
	.rank {
		@apply flex items-center justify-center;
		@apply w-[1.71vw] h-[2.01vw];
	}

	.text {
		@apply absolute;
		@apply text-[clamp(8px,0.89vw,0.89vw)] text-color-grey-footer-label;
	}
</style>
