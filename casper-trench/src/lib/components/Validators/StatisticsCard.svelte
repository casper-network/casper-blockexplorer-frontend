<script lang="ts">
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import type { Bid, ValidatorDetails } from '$utils/types/validator';
	import BalanceTransferrable from '$components/TableData/BalanceTransferrable.svelte';
	import CircleProgressBar from '$components/TableData/CircleProgressBar.svelte';
	import PlaceHolderIndicator from '../PlaceHolderIndicator.svelte';

	export let validator: Partial<Bid>;
</script>

<div class="statistics-card">
	<table class="extras">
		<tr>
			<td class="label">Public Key</td>
			<td class="value"
				><div class="text">
					{validator.publicKey}
				</div>
				<div class="copy-icon">
					<CopyIcon text={validator.publicKey} />
				</div></td
			>
		</tr>
		<tr>
			<td class="label">Total Validator Rewards</td>
			<!-- TODO update - remove place holder -->
			<!--	ALTERED <td class="value"><BalanceTransferrable cspr={156324232.03423} /><PlaceHolderIndicator /></td> -->
			<td class="value"><BalanceTransferrable cspr={156324232.03423} /></td>
		</tr>
		<tr>
			<td class="label">Total Delegator Rewards</td>
			<!-- TODO update - remove place holder -->
			<!-- ALTERED <td class="value"><BalanceTransferrable cspr={156324232.03423} /><PlaceHolderIndicator /></td> -->
			<td class="value"><BalanceTransferrable cspr={156324232.03423} /></td>
		</tr>
		<tr>
			<td class="label">Total Stake</td>
			<td class="value"><BalanceTransferrable cspr={validator.totalBid} /></td>
		</tr>
		<tr>
			<td class="label">Self Stake</td>
			<td class="value"><BalanceTransferrable cspr={validator.selfStake} /></td>
		</tr>
		<tr>
			<td class="label">Commission Rate</td>
			<td class="value commission">{validator.delegationRate.toFixed(2)}%</td>
		</tr>
		<tr>
			<td class="label">Performance</td>
			<!-- TODO update - remove place holder -->
			<!-- ALTERED <td class="value"><CircleProgressBar progress={1} /><PlaceHolderIndicator /></td> -->
			<td class="value"><CircleProgressBar progress={1} /></td>
		</tr>
	</table>
</div>

<style lang="postcss">
	.statistics-card {
		@apply flex flex-col items-center;
		@apply pt-[2.5vw] pb-[2.92vw] px-[2.5vw];
		@apply w-full md:w-[57.38vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vw];
	}

	.label {
		@apply font-bold text-[1.07vw] text-color-grey-footer-label;
		@apply w-full;
	}

	.value {
		@apply text-[1.07vw] text-color-hover-footer-link;
		@apply flex items-center gap-[0.24vw];
	}

	td {
		@apply pb-[2.2vw];
		@apply align-top;
	}

	.copy-icon {
		@apply w-[1.96vw] h-[1.96vw];
		@apply cursor-pointer;
	}

	.commission {
		@apply text-color-table-header text-[1.07vw];
	}
</style>
