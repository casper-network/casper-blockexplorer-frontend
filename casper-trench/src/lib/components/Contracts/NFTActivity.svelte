<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import BlockIcon from '$lib/icons/BlockIcon.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import TableSorter from '../Reusables/TableSorter.svelte';
	import BalanceTransferrable from '../TableData/BalanceTransferrable.svelte';
	import Hash from '../TableData/Hash.svelte';

	let transactionsPerPage: number = 10;
	let startIndex = 0;
	let contracts = [
		{
			deployHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			blockHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			caller: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			action: 'Mint',
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			amount: 156324232.03423
		},
		{
			deployHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			blockHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			caller: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			action: 'Mint',
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			amount: 156324232.03423
		},
		{
			deployHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			blockHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			caller: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			action: 'Mint',
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			amount: 156324232.03423
		},
		{
			deployHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			blockHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			caller: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			action: 'Mint',
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			amount: 156324232.03423
		},
		{
			deployHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			blockHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			caller: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			action: 'Mint',
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			amount: 156324232.03423
		}
	];
</script>

<div class="delegators-tab">
	<div class="title">Activity</div>
	<div class="total">
		{transactionsPerPage} Transactions per page
	</div>
	<table>
		<tr>
			<th class="block">Deploy Hash</th>
			<th>Block Hash</th>
			<th>Caller</th>
			<th>
				<div class="sorter">
					<div class="text">Age</div>
					<TableSorter />
				</div>
			</th>
			<th>Action</th>
			<th>From</th>
			<th>To</th>
			<th class="right">Amount</th>
		</tr>
		<div class="divider table-header-border" />
		{#if contracts && contracts.length > 0}
			{#each contracts as contract}
				<tr>
					<td class="block">
						<div>
							<Hash hash={contract.deployHash} noOfCharacters={5} />
						</div>
					</td>
					<td><Hash hash={contract.blockHash} noOfCharacters={5} /></td>
					<td>
						<div class="sorter">
							<div class="block-icon">
								<BlockIcon />
							</div>
							<Hash hash={contract.blockHash} noOfCharacters={5} />
						</div>
					</td>
					<td>{`${timeAgo(millisToFormat(Date.now() - contract.age))} ago`}</td>
					<td>{contract.action}</td>
					<td>
						<div class="sorter">
							<div class="block-icon">
								<BlockIcon />
							</div>
							<Hash hash={contract.from} noOfCharacters={5} />
						</div>
					</td>
					<td>
						<div class="sorter">
							<div class="block-icon">
								<BlockIcon />
							</div>
							<Hash hash={contract.to} noOfCharacters={5} />
						</div>
					</td>
					<td>
						<div class="amount">
							<BalanceTransferrable cspr={contract.amount} />
						</div>
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[2vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.05vw,1.05vw)] px-[2vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.block {
		@apply px-0;
	}

	.block > div {
		@apply flex items-center;
		@apply h-[3vw];
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

	.sorter {
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

	.title {
		@apply text-color-table-header text-[clamp(20px,1.55vw,1.55vw)] font-bold;
		@apply mb-[clamp(16px,0.48vw,0.48vw)];
	}

	.block-icon {
		@apply w-[1.19vh] h-[1.19vh] md:w-[1.19vw] md:h-[1.19vw];
		@apply mr-[clamp(4px,0.24vw,0.24vw)];
	}

	.amount {
		@apply flex justify-end;
	}
</style>
