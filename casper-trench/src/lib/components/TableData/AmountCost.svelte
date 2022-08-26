<script>
	export let cspr = 31821243;
	export let cashValue = 921232.02;
</script>

<div class="crypto-cash">
	<div class="value-crypto">
		{parseFloat(cspr.toFixed(2)).toLocaleString('en')} CSPR
	</div>
	<!--	<div class="value-cash">
		${parseFloat(cashValue.toFixed(2)).toLocaleString('en')}
	</div> -->
</div>

<style lang="postcss">
	.crypto-cash {
		@apply text-right text-[clamp(10px,1.07vw,1.07vw)];
		@apply max-w-max;
	}

	.value-crypto {
		@apply text-color-table-header;
	}

	.value-cash {
		@apply text-color-grey-footer-label;
	}
</style>
