<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import Contract from '$lib/components/TableData/Contract.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import PublicKey from '$lib/components/TableData/PublicKey.svelte';
	import Rank from '$lib/components/TableData/Rank.svelte';
	import { bidStore } from '$stores/chain';
	import { isLoading } from '$stores/loading';
	import { getTopAccounts } from '$utils/chain/accounts';
	import { tableSort } from '$utils/sort';
	import type { TopAccount } from '$utils/types/account';
	let accountsPerPage = 10;
	let startIndex = 0;
	let topAccounts: TopAccount[];

	const fetchTopAccounts = async () => {};

	$: if (accountsPerPage || $bidStore) {
		setTimeout(async () => {
			topAccounts = await getTopAccounts(startIndex, accountsPerPage);
			// await fetchTopAccounts();
		}, 1);
	}

	$: if ($bidStore) {
		console.log('New bids');
	}
	const sortTopAccounts = (direction: 'asc' | 'desc', field: string) => {
		topAccounts = tableSort(direction, topAccounts, field);
	};
</script>

<div class="delegators-tab">
	<div class="title">Rich List</div>
	<table>
		<tr>
			<th class="block">Rank</th>
			<th>Public key</th>
			<th>Account hash</th>
			<th>
				<div class="sorter">
					<div>Balance</div>
					<TableSorter on:sort={(e) => sortTopAccounts(e.detail?.direction, 'balance')} />
				</div>
			</th>
			<th>
				<div class="sorter">
					<div>Transferrable</div>
					<TableSorter on:sort={(e) => sortTopAccounts(e.detail?.direction, 'transferrable')} />
				</div>
			</th>
			<th>
				<div class="sorter">
					<div>Txn Count</div>
					<TableSorter on:sort={(e) => sortTopAccounts(e.detail?.direction, 'txnCount')} />
				</div>
			</th>
			<th>
				<div class="sorter">
					<div>Staked</div>
					<TableSorter on:sort={(e) => sortTopAccounts(e.detail?.direction, 'staked_amount')} />
				</div>
			</th>
		</tr>
		<div class="divider table-header-border" />
		{#if !$isLoading && topAccounts && topAccounts.length > 0}
			{#each topAccounts as account, i}
				<tr>
					<td class="block">
						<div class="wrapper">
							<Rank rank={account.rank} />
							<Contract text="CONTRACT" />
						</div>
					</td>
					<td>
						<a href="/accounts/{account.publicKey}">
							<!-- TODO add actual active date -->
							<PublicKey hash={account.publicKey} activeDate={Date.parse('1970/01/01')} />
						</a>
					</td>
					<td>
						<a href="/accounts/{account.accountHash}"
							><Hash hash={account.accountHash} noOfCharacters={10} /></a
						></td
					>
					<td><BalanceTransferrable cspr={account.balance} /></td>
					<td><BalanceTransferrable cspr={account.transferrable} /></td>
					<!-- TODO geadd actual txnCount -->
					<td>{account.txnCount?.toLocaleString('en') || 0}</td>
					<td class="right">{account.stakedAmount.toLocaleString('en')}</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={accountsPerPage}
		apiPaginator
		bind:items={topAccounts}
		bind:startIndex
		on:load-page={async () => await fetchTopAccounts()}
	/>
</div>

<style lang="postcss">
	table {
		@apply table-auto w-full relative;
	}

	.title {
		@apply text-[clamp(16px,1.43vw,1.43vw)] font-bold text-color-table-header;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
		/* @apply flex flex-row; */
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header align-top;
		@apply min-w-max h-full;
	}

	.block {
		@apply px-0;
	}

	.right {
		@apply text-right;
	}

	.wrapper {
		@apply flex gap-[2.26vw];
	}
	.sorter {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}
</style>
