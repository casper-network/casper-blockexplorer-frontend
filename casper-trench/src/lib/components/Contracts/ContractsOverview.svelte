<script lang="ts">
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import { parseStringValue, processType } from '$utils/converters';

	export let balance = 0;
	export let value = 0;
</script>

<div class="overview">
	<div class="title">CONTRACT OVERVIEW</div>
	<div class="extras">
		<table>
			<tr>
				<td class="label"> Balance </td>
				<td class="value">
					{balance} BNB
				</td>
			</tr>
			<tr>
				<td class="label"> BNB Value </td>
				<td class="value">
					${value.toFixed(2)}
				</td>
			</tr>
		</table>
	</div>
</div>

<style lang="postcss">
	.overview {
		@apply pt-[clamp(16px,1.73vw,1.73vw)] pb-[clamp(16px,2.08vw,2.08vw)] pl-[clamp(16px,1.43vw,1.43vw)] pr-[clamp(16px,1.90vw,1.90vw)];
		@apply w-full md:w-[44.7vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
	}

	.label {
		@apply font-bold text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:w-[10.83vw];
	}

	.value {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header;
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	td {
		@apply pb-[clamp(4px,2.2vw,2.2vw)];
		@apply align-top;
	}

	.extras {
		@apply md:ml-[0.23vw] md:mr-[1.25vw];
	}

	.title {
		@apply text-color-table-header text-[clamp(12px,1.19vw,1.19vw)] font-bold;
		@apply pb-[clamp(4px,1.19vw,1.19vw)] mb-[clamp(4px,1.61vw,1.61vw)];
		@apply border-b-[clamp(1px,0.09vw,0.09vw)] border-color-tooltip-border;
	}
</style>
