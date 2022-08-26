<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import Hash from '$components/TableData/Hash.svelte';
	import TransactionStatus from '$components/TableData/TransactionStatus.svelte';
	import type { AccountTransaction } from '$utils/types/transaction';
	import { onMount } from 'svelte';
	import { isLoading } from '$stores/loading';
	import { page } from '$app/stores';
	import { getAccountDeploys } from '$utils/api';

	let transactions: AccountTransaction[];
	let transactionsPerPage = 10;
	let startIndex = 0;
	onMount(async () => {
		await fetchTransactions();
	});

	const fetchTransactions = async () => {
		$isLoading = true;
		transactions = await getAccountDeploys($page.params?.address, transactionsPerPage, startIndex);
		$isLoading = false;
	};
	$: if (transactionsPerPage) {
		setTimeout(async () => {
			await fetchTransactions();
		}, 1);
	}
</script>

<div class="transactions-tab">
	<div class="total">
		Latest {transactionsPerPage} Transactions
	</div>
	<table>
		<tr>
			<th class="block">TX ID</th>
			<th>TX Time</th>
			<th class="right">From (Account Hash)</th>
			<th class="right">TX Fee</th>
			<th class="right">Status</th>
		</tr>
		<div class="divider table-header-border" />
		{#if transactions && transactions.length > 0}
			{#each transactions as transaction}
				<tr>
					<td class="block">
						<a href="/transactions/{transaction.deploy_hash}"> {transaction.deploy_hash}</a></td
					>
					<td class="time"
						>{`${timeAgo(millisToFormat(Date.now() - Date.parse(transaction.timestamp)))} ago`}</td
					>
					<td>
						<div class="right-flex">
							<Hash color="black" hash={transaction.hash} />
						</div>
					</td>
					<td>
						<div class="value-crypto">
							<div class="crypto">
								{parseFloat(transaction.gas_price.toFixed(5)).toLocaleString('en')}
							</div>
							<div class="cspr">CSPR</div>
						</div>
					</td>
					<td>
						<div class="wrapper">
							<TransactionStatus success={transaction.status.toLowerCase() === 'success'}>
								{transaction.status}
							</TransactionStatus>
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

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)] md:px-[2vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] md:px-[2vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	td.block {
		@apply text-color-hover-footer-link;
	}

	.block {
		@apply px-0;
	}

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[clamp(4px,2.38vw,2.38vw)];
	}

	.right {
		@apply text-right;
	}

	.time {
		@apply align-top;
		@apply min-w-max;
	}

	.right-flex {
		@apply flex justify-end;
	}

	.value-crypto {
		@apply flex items-center justify-end gap-[clamp(2px,0.24vw,0.24vw)];
		@apply text-right text-[clamp(8px,0.83vw,0.83vw)];
	}

	.crypto {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header;
	}

	.cspr {
		@apply text-color-grey-footer-label;
	}

	.wrapper {
		@apply flex justify-end;
	}
</style>
