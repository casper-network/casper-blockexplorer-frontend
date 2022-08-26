<script lang="ts">
	import { price } from '$stores/price';
	import { getStats } from '$utils/api';

	export let cspr: number;
	export let selfStakePercentage: number = 0;
</script>

<div class="crypto-cash">
	<div class="value-crypto">
		<div class="crypto">
			{(cspr && parseFloat(cspr.toFixed(5)).toLocaleString('en')) || '0'}
		</div>
		<!-- remove mention of cspr -->
	</div>
	{#if selfStakePercentage > 0}
		<!--	<div class="value-cash">
			{selfStakePercentage || '0'}%
		</div> -->
	{:else}
		<!--	<div class="value-cash">
			${parseFloat((cspr * $price).toFixed(2)).toLocaleString('en') || '0'}
		</div> -->
	{/if}
</div>

<style lang="postcss">
	.crypto-cash {
		@apply text-right text-[clamp(10px,0.83vw,0.83vw)];
		@apply max-w-max;
	}

	.value-crypto {
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.crypto {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header;
	}

	.value-cash {
		@apply text-color-table-header;
	}

	.cspr {
		@apply text-color-grey-footer-label;
	}
</style>
