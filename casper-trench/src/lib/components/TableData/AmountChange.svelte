<script>
	import DownChangeIcon from '$lib/icons/DownChangeIcon.svelte';
	import UpChangeIcon from '$lib/icons/UpChangeIcon.svelte';

	export let isUp = false;
	export let cspr = 16324232.03423;
</script>

<div class="amount-change">
	<div class="value-crypto" class:isUp>
		<div class="crypto">
			{parseFloat(cspr.toFixed(5)).toLocaleString()}
		</div>
		<div class="cspr">CSPR</div>
	</div>
	<div class="icon">
		{#if isUp}
			<UpChangeIcon />
		{:else}
			<DownChangeIcon />
		{/if}
	</div>
</div>

<style lang="postcss">
	.amount-change {
		@apply max-w-max;
		@apply flex items-center gap-[clamp(2px,0.75vw,0.75vw)];
	}

	.value-crypto {
		@apply flex items-center gap-[clamp(2px,0.24vw,0.24vw)];
		@apply text-color-arcadia-red;
	}

	.crypto {
		@apply text-[clamp(10px,1.07vw,1.07vw)];
	}

	.cspr {
		@apply text-[clamp(8px,0.83vw,0.83vw)];
	}

	.isUp {
		@apply text-color-arcadia-green;
	}

	.icon {
		@apply h-[clamp(8px,0.95vw,0.95vw)] w-[clamp(8px,0.95vw,0.95vw)];
	}
</style>
