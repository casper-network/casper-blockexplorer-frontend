<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableFilter from '$lib/components/Reusables/TableFilter.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import Contract from '$lib/components/TableData/Contract.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';

	export let props: {
		contractHash: string;
	};
	let transactionsPerPage: number = 10;
	let startIndex = 0;
	let contracts = [
		{
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			method: 'Approve',
			block: 19239437,
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0,
			fee: 0.00022198
		},
		{
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			method: 'Approve',
			block: 19239437,
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0,
			fee: 0.00022198
		},
		{
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			method: 'Approve',
			block: 19239437,
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0,
			fee: 0.00022198
		},
		{
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			method: 'Approve',
			block: 19239437,
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0,
			fee: 0.00022198
		},
		{
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			method: 'Approve',
			block: 19239437,
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0,
			fee: 0.00022198
		},
		{
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			method: 'Approve',
			block: 19239437,
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0,
			fee: 0.00022198
		}
	];
</script>

<div class="delegators-tab">
	<div class="total">
		{transactionsPerPage} Transactions per page
	</div>
	<table>
		<tr>
			<th class="block">TX ID</th>
			<th>
				<div class="tooltip">
					<div class="text">Method</div>
					<Tooltip text="Test" />
				</div>
			</th>
			<th>Block</th>
			<th>Age</th>
			<th>
				<div class="tooltip">
					<div class="text">From</div>
					<TableFilter />
				</div>
			</th>
			<th>
				<div class="tooltip">
					<div class="text">To</div>
					<TableFilter />
				</div>
			</th>
			<th>Value</th>
			<th class="right">[Txn Fee]</th>
		</tr>
		<div class="divider table-header-border" />
		{#if contracts && contracts.length > 0}
			{#each contracts as contract}
				<tr>
					<td class="block">
						<div class="tx-id">
							<div class="eye">
								<div class="icon">
									<EyeIcon />
								</div>
							</div>
							<Hash hash={contract.id} noOfCharacters={20} start />
						</div>
					</td>
					<td>
						<div class="method">
							{contract.method}
						</div>
					</td>
					<td>
						{contract.block}
					</td>
					<td>{`${timeAgo(millisToFormat(Date.now() - contract.age))} ago`}</td>
					<td><Hash hash={contract.from} noOfCharacters={20} start /></td>
					<td>
						<div class="to">
							<div class="in">
								<Contract text={contract.to} IN />
							</div>
							<div class="contract">
								<Contract text={contract.to} />
							</div>
							<Hash hash={contract.to} noOfCharacters={20} start color="black" />
						</div>
					</td>
					<td>
						{contract.value} BNB
					</td>
					<td class="right">
						{contract.fee}
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={transactionsPerPage}
		apiPaginator
		bind:startIndex
	/>
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[1vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.05vw,1.05vw)] px-[1vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.block {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.hash {
		@apply text-color-hover-footer-link;
	}

	.right {
		@apply text-right;
	}

	.tooltip {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}

	.tx-id {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}

	.eye {
		@apply py-[clamp(4px,0.42vw,0.42vw)] px-[clamp(2px,0.3vw,0.3vw)];
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply bg-color-translucent-green;
	}

	.eye > .icon {
		@apply w-[clamp(12px,0.95vw,0.95vw)];
	}

	.method {
		@apply bg-color-translucent-blue;
		@apply px-[clamp(4px,0.42vw,0.42vw)] py-[clamp(2px,0.3vw,0.3vw)];
		@apply max-w-max;
		@apply text-color-arcadia-blue;
	}

	.to {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}
</style>
