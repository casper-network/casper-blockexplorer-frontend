<script lang="ts">
	import type { Reward } from '$utils/types/reward';
	import { isLoading } from '$stores/loading';
	import { getAccountEraRewards, getAccountRewards, getStats } from '$utils/api';
	import { page } from '$app/stores';
	import Paginator from '$lib/components/Paginator/index.svelte';
	import { parseStringValue } from '$utils/converters';
	import EarningChart from '$lib/components/Charts/EarningChart.svelte';
	import { price } from '$stores/price';

	let earnings: Reward[];
	let eraRewards = [];
	let eraRewardsPerPage = 1000;
	let earningsPerPage = 10;
	let startIndex = 0;
	let data: [{ x?: Date; y?: number }] = [{}];
	const fetchRewards = async () => {
		$isLoading = true;
		earnings = await getAccountRewards($page.params?.address, earningsPerPage, startIndex);
		eraRewards = await getAccountEraRewards($page.params.address, eraRewardsPerPage);
		eraRewards &&
			eraRewards.forEach((e, i) => {
				if (e[0] === null) {
					e[0] = eraRewards[i - 1][0] - 1;
				}
				data.push({ x: new Date(e[0]), y: e[1] });
			});
		$isLoading = false;
	};
	$: if (earningsPerPage) {
		setTimeout(async () => {
			await fetchRewards();
		}, 1);
	}
	// 1653477343232;
	// 1653052014592;
</script>

<div class="earning">
	<div class="earnings-tab">
		<div class="total">
			Latest {earningsPerPage} Transactions
		</div>

		<table>
			<tr>
				<th>Date</th>
				<th>Reward</th>
			</tr>
			<div class="divider table-header-border" />
			{#if earnings && earnings.length > 0}
				{#each earnings as earning}
					<tr>
						<td>{new Date(earning.date).toLocaleDateString()}</td>
						<td>
							<div class="value-crypto">
								<div class="crypto">
									{parseFloat(parseStringValue(earning.reward).toFixed(2)).toLocaleString('en')}
								</div>
								<div class="cspr">CSPR</div>
								<div class="cash">
									${parseFloat(
										(parseStringValue(earning.reward) * $price).toFixed(2)
									).toLocaleString('en')}
								</div>
							</div>
						</td>
					</tr>
				{/each}
			{/if}
		</table>
		<Paginator
			showTotalRows={false}
			bind:itemsPerPage={earningsPerPage}
			apiPaginator
			bind:items={earnings}
			bind:startIndex
			on:load-page={async () => await fetchRewards()}
		/>
	</div>
	<EarningChart {data} isLoading={$isLoading} />
</div>

<style lang="postcss">
	.earning {
		@apply md:flex md:justify-between;
	}
	.earnings-tab {
		@apply md:min-w-[44.88vw];
		@apply border-[clamp(1px,0.15vw,0.15vw)] border-color-tooltip-border border-opacity-100;
		@apply rounded-[0.95vh] md:rounded-[0.95vw];
		@apply px-[clamp(16px,2.02vw,2.02vw)] pt-[clamp(16px,2.14vw,2.14vw)] pb-[clamp(16px,2.5vw,2.5vw)];
	}

	table {
		@apply table-auto w-full relative;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(12px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)];
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.total {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[clamp(8px,2.38vw,2.38vw)];
	}

	.value-crypto {
		@apply flex items-center gap-[clamp(2px,0.24vw,0.24vw)];
		@apply text-[clamp(10px,0.83vw,0.83vw)];
	}

	.crypto {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header;
	}

	.cspr {
		@apply text-color-grey-footer-label;
		@apply mr-[clamp(4px,0.71vw,0.71vw)];
	}
</style>
