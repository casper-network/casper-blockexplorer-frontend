<script lang="ts">
	import Switch from '$lib/components/Reusables/Switch.svelte';
	import CircleProgressBar from '$lib/components/TableData/CircleProgressBar.svelte';
	import Status from '$lib/components/TableData/Status.svelte';
	import Validator from '$lib/components/TableData/Validator.svelte';
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import { isLoading } from '$stores/loading';
	import { onMount } from 'svelte';
	import type { EraValidator, Bid } from '$utils/types/validator';
	import { tableSort } from '$utils/sort';
	import { queryValidators } from '$utils/chain/validators';

	let bidValidators: Bid[] = [];
	let currentEraValidators: EraValidator[] = [];
	let nextEraValidators: EraValidator[] = [];
	let eraValidators: EraValidator[];
	let displayedBidValidators: Bid[] = [];
	let displayedEraValidators: EraValidator[] = [];

	let pageOptions: { name: string; dropdown?: string[]; selectedDropdown?: string }[] = [
		{
			name: 'Validators',
			dropdown: [],
			selectedDropdown: ''
		},
		{
			name: 'Validator Auction',
			dropdown: [],
			selectedDropdown: ''
		}
	];

	let currentPage = 0;
	onMount(async () => {
		$isLoading = true;
		const { _bidValidators, _currentEraValidators, _nextEraValidators, _eraIDs } =
			await queryValidators();
		if (_bidValidators && _currentEraValidators && _nextEraValidators && _eraIDs) {
			bidValidators = _bidValidators;
			currentEraValidators = eraValidators = _currentEraValidators;
			nextEraValidators = _nextEraValidators;
			_eraIDs.forEach((eraID, i) => {
				if (i < 2) {
					const dropdownItem = i == 0 ? `Next Era ${eraID}` : `Current Era ${eraID}`;
					pageOptions && pageOptions[0].dropdown.push(dropdownItem);
				}
			});
		}
		$isLoading = false;
	});

	const sortValidators = (direction: 'asc' | 'desc', field: string) => {
		eraValidators = tableSort(direction, eraValidators, field);
	};

	const sortBids = (direction: 'asc' | 'desc', field: string) => {
		bidValidators = tableSort(direction, bidValidators, field);
	};
</script>

<div class="content">
	<Switch
		options={pageOptions}
		bind:selected={currentPage}
		outlined
		on:dropdown-option-clicked={(e) => {
			if (e.detail.optionIndex !== 0) {
				return;
			}
			if (e.detail.dropdownIndex === 0) {
				eraValidators = currentEraValidators && currentEraValidators;
			} else {
				eraValidators = nextEraValidators && nextEraValidators;
			}
		}}
	/>

	{#if currentPage === 0}
		{#if displayedEraValidators && displayedEraValidators.length > 0}
			<table>
				<tr>
					<th class="rank">Rank</th>
					<th class="validators">Validators</th>
					<th class="fee">
						<div class="header-wrapper">
							<div class="text">Fee</div>
							<TableSorter on:sort={(e) => sortValidators(e.detail?.direction, 'delegationRate')} />
						</div>
					</th>
					<th>
						<div class="header-wrapper">
							<div class="text">Delegators</div>
							<TableSorter
								on:sort={(e) => sortValidators(e.detail?.direction, 'numOfDelegators')}
							/>
						</div>
					</th>
					<th class="stake">
						<div class="header-wrapper justify-center">
							<div class="text">Total Stake</div>
							<Tooltip text="Total Stake tooltip" />
							<TableSorter on:sort={(e) => sortValidators(e.detail?.direction, 'selfStake')} />
						</div>
					</th>
					<th class="self">Self %</th>
					<th class="network-perc">% Of Network</th>
					<th class="performance">
						<div class="header-wrapper">
							<div class="text">Performance</div>
							<Tooltip text="Performance tooltip" />
						</div>
					</th>
				</tr>
				<div class="divider table-header-border" />
				{#each displayedEraValidators as validator, i}
					<tr>
						<td class="rank-val">{validator.rank}</td>
						<td class="validators"
							><Validator
								imgUrl={validator.icon}
								hash={validator.publicKey}
								name={validator.name}
							/></td
						>
						<td class="grey">{validator.delegationRate}%</td>
						<td>{validator.numOfDelegators.toLocaleString('en')}</td>
						<td class="stake">{validator.selfStake.toLocaleString('en')} CSPR</td>
						<td class="grey self">{validator.selfStakePercentage.toFixed(2)}%</td>
						<td class="grey network-perc">{validator.networkPercentage.toFixed(2)}%</td>
						<td class="performance"><CircleProgressBar progress={0.25} /></td>
					</tr>
				{/each}
			</table>
		{/if}
		<Paginator bind:items={eraValidators} bind:pagedItems={displayedEraValidators} />
	{:else}
		{#if displayedBidValidators && displayedBidValidators.length > 0}
			<table>
				<tr>
					<th class="rank">Rank</th>
					<th class="validators">Validators</th>
					<th class="status">Status</th>
					<th class="fee">
						<div class="header-wrapper">
							<div class="text">Fee</div>
							<TableSorter on:sort={(e) => sortBids(e.detail?.direction, 'delegationRate')} />
						</div>
					</th>
					<th>
						<div class="header-wrapper">
							<div class="text">Delegators</div>
							<TableSorter on:sort={(e) => sortBids(e.detail?.direction, 'numOfDelegators')} />
						</div>
					</th>
					<th class="stake">
						<div class="header-wrapper justify-center">
							<div class="text">Total Stake</div>
							<Tooltip text="Total Stake tooltip" />
							<TableSorter on:sort={(e) => sortBids(e.detail?.direction, 'totalBid')} />
						</div>
					</th>
					<th class="self">Self %</th>
					<th class="network-perc">% Of Network</th>
					<th class="performance">
						<div class="header-wrapper">
							<div class="text">Performance</div>
							<Tooltip text="Performance tooltip" />
						</div>
					</th>
				</tr>
				<div class="divider table-header-border" />
				{#each displayedBidValidators as bid, i}
					<tr>
						<td class="rank-val">{bid.rank}</td>
						<td class="validators"
							><Validator imgUrl={bid.icon} hash={bid.publicKey} name={bid.name} /></td
						>
						<td class="status"><Status inactive={bid.inactive} /></td>
						<td class="grey">{bid.delegationRate.toFixed(2)}%</td>
						<td>{bid.numOfDelegators.toLocaleString('en')}</td>
						<td class="stake">{bid.totalBid.toLocaleString('en')} CSPR</td>
						<td class="grey self">{bid.selfStakePercentage.toFixed(2)}%</td>
						<td class="grey network-perc">{bid.networkPercentage.toFixed(2)}%</td>
						<td class="performance"><CircleProgressBar progress={0.7} /></td>
					</tr>
				{/each}
			</table>
		{/if}
		<Paginator bind:items={bidValidators} bind:pagedItems={displayedBidValidators} />
	{/if}
</div>

<style lang="postcss">
	table {
		@apply table-auto w-full relative;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.content {
		@apply flex flex-col gap-[3.21vw];
	}

	.grey {
		@apply text-color-grey-footer-label;
	}

	.rank {
		@apply text-left;
		@apply w-[2.5vw];
	}

	.rank-val {
		@apply w-[2.5vw];
		@apply text-center;
	}

	.validators {
		@apply pl-[3.69vw];
		@apply text-left;
	}

	.performance {
		@apply text-center;
		@apply flex justify-center;
	}

	.network-perc {
		@apply text-right;
	}

	.self {
		@apply text-right;
	}

	.stake {
		@apply text-center;
	}

	.header-wrapper {
		@apply flex items-center gap-[0.48vw];
	}

	.status {
		@apply text-center;
		@apply flex justify-center;
	}
</style>
