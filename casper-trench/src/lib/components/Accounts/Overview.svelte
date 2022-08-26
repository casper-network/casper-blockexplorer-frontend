<script lang="ts">
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { parseStringValue, processType } from '$utils/converters';
	import type { Account } from '$utils/types/account';
	import type { Type } from '$utils/types/type';

	export let type: Type;
	export let account: Account;
	export let isLoading = true;
</script>

<div class:loading={isLoading} class="overview">
	<div class="title">OVERVIEW</div>
	<div class="extras">
		<table>
			<!-- <tr>
				<td class="label"> Public Key Type </td>
				<td class="value">
					{processType(type?.type)}
				</td>
			</tr> -->
			<tr>
				<td class="label"> Available </td>
				<td class="value">
					<BalanceTransferrable cspr={parseStringValue(account?.transferrable) || 0} />
				</td>
			</tr>
			<tr>
				<td class="label"> Total Balance </td>
				<td class="value">
					<BalanceTransferrable cspr={parseStringValue(account?.balance) || 0} />
				</td>
			</tr>
			<tr>
				<td class="label"> Account Hash </td>
				<td class="value">
					<div class="address-value hash">
						<div class="text">
							{account?.account_hash || ''}
						</div>
						{#if account?.account_hash}
							<div class="copy-icon">
								<CopyIcon text={account?.account_hash} />
							</div>
						{/if}
					</div>
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
		@apply w-full;
	}

	.value {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header;
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	td {
		@apply pb-[clamp(4px,2.2vw,2.2vw)];
		@apply align-top;
	}

	.copy-icon {
		@apply w-[clamp(16px,1.96vw,1.96vw)] h-[clamp(16px,1.96vw,1.96vw)];
		@apply cursor-pointer;
	}

	.address-value {
		@apply flex;
	}

	.text {
		@apply break-words;
		@apply max-w-[24vh] md:max-w-[25.65vw];
	}

	.hash {
		@apply text-color-hover-footer-link;
	}

	.extras {
		@apply md:ml-[0.23vw] md:mr-[1.25vw];
	}

	.title {
		@apply text-color-table-header text-[clamp(12px,1.19vw,1.19vw)] font-bold;
		@apply pb-[clamp(4px,1.19vw,1.19vw)] mb-[clamp(4px,1.61vw,1.61vw)];
		@apply border-b-[clamp(1px,0.09vw,0.09vw)] border-color-tooltip-border;
	}
	.loading {
		@apply bg-gray-50;
		@apply animate-pulse;
	}
</style>
