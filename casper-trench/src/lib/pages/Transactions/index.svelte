<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import TableSorter from '$lib/components/Reusables/TableSorter.svelte';
	import ContractText from '$lib/components/TableData/ContractText.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import TxHash from '$lib/components/TableData/TxHash.svelte';
	import { millisToFormat, parseStringValue, timeAgo } from '$utils/converters';
	import { onMount } from 'svelte';
	import { getDeploy, getTransactions } from '$utils/api';
	import { isLoading } from '$stores/loading';
	import PlaceHolderIndicator from '$lib/components/PlaceHolderIndicator.svelte';
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import { tableSort } from '$utils/sort';
	import type { Transaction } from '$utils/types/transaction';
	let transactions: Transaction[];
	let transactionsPerPage = 10;
	let startIndex = 0;

	const fetchTransactions = async () => {
		$isLoading = true;
		transactions = await getTransactions(transactionsPerPage, startIndex);
		$isLoading = false;
	};
	$: if (transactionsPerPage) {
		setTimeout(async () => {
			await fetchTransactions();
		}, 1);
	}
	const sortTransactions = (direction: 'asc' | 'desc', field: string) => {
		transactions = tableSort(direction, transactions, field);
	};
</script>

<div class="delegators-tab">
	<div class="title">Transactions</div>
	<table>
		<tr>
			<th class="block">Tx Hash</th>
			<!-- TODO remove placeholder -->
			<th class="">Block Hash</th>
			<!-- TODO remove placeholder -->
			<th class="">Public Key</th>
			<th class="center sorter">
				<div class="text">Age</div>
				<TableSorter on:sort={(e) => sortTransactions(e.detail?.direction, 'timestamp')} />
			</th>
			<!-- TODO remove placeholder -->
			<!-- <th>Contract <PlaceHolderIndicator /></th> -->
			<th class="right">Amount</th>
			<th class="right"> Cost</th>
		</tr>
		<div class="divider table-header-border" />
		{#if transactions && transactions.length > 0}
			{#each transactions as transaction}
				<tr>
					<td class="block">
						<div class="wrapper-center">
							<a href="/transactions/{transaction.deploy_hash}">
								<TxHash hash={transaction.deploy_hash} right />
							</a>
						</div>
					</td>
					{#await getDeploy(transaction.deploy_hash)}
						<td>
							<div class="loader" />
						</td>
						<td>
							<div class="loader" />
						</td>
					{:then tx}
						<td>
							<a href="/blocks/{tx.deploy.header.block_hash}">
								<Hash hash={tx.deploy.header.block_hash} /></a
							>
						</td>
						<td>
							<a href="/accounts/{tx.deploy.header.account}">
								<Hash hash={tx.deploy.header.account} />
							</a>
						</td>
					{/await}
					<td class="center age">
						{`${timeAgo(millisToFormat(Date.now() - Date.parse(transaction.timestamp)))} ago`}
					</td>
					<!-- TODO remove placeholder for contract -->
					<td>
						<ContractText />
					</td>
					<td class="right">
						<div class="wrapper">
							<!-- <AmountCost cspr={transaction.amount.cspr} cashValue={transaction.amount.cash} /> -->
							<BalanceTransferrable cspr={parseStringValue(transaction.value)} />
						</div>
					</td>
					<td class="right">
						<div class="wrapper">
							<!-- <AmountCost cspr={transaction.cost.cspr} cashValue={transaction.cost.cash} /> -->
							<BalanceTransferrable cspr={parseStringValue(transaction.fee)} />
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
		bind:items={transactions}
		bind:startIndex
		on:load-page={async () => await fetchTransactions()}
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] md:px-[1vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] md:px-[1vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.block {
		@apply px-0;
	}

	.right {
		@apply text-right;
	}

	.wrapper {
		@apply flex justify-end;
	}

	.center {
		@apply text-center;
	}

	.age {
		@apply text-color-grey-footer-label;
	}

	.sorter {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)] justify-center;
	}

	.wrapper-center {
		@apply flex items-center;
		@apply md:h-[3vw];
	}
	td > .loader {
		@apply w-full h-[clamp(10px,1.2vw,1.2vw)] rounded-[clamp(2px,0.1vw,0.1vw)] animate-pulse bg-gray-200;
	}
</style>
