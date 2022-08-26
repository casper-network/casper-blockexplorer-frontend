<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import AmountChange from '$lib/components/TableData/AmountChange.svelte';
	import FromToAccountHash from '$lib/components/TableData/FromToAccountHash.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import type { Transfer } from '$utils/types/transfer';
	import { getAccountTransfers } from '$utils/api';
	import { isLoading } from '$stores/loading';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { parseStringValue } from '$utils/converters';
	let transfers: Transfer[];
	let transfersPerPage = 10;
	let startIndex = 0;
	onMount(async () => {
		await fetchTransfers();
	});

	const fetchTransfers = async () => {
		$isLoading = true;
		transfers = await getAccountTransfers($page.params?.address, transfersPerPage, startIndex);
		$isLoading = false;
	};
	$: if (transfersPerPage) {
		setTimeout(async () => {
			await fetchTransfers();
		}, 1);
	}
</script>

<div class="transfer-tab">
	<div class="total">
		Latest {transfersPerPage} Transactions
	</div>
	<table>
		<tr>
			<th class="block">TX ID</th>
			<th>TX Time</th>
			<th class="right">From (Account Hash)</th>
			<th class="right">To (Account Hash)</th>
			<th class="right">Amount</th>
		</tr>
		<div class="divider table-header-border" />
		{#if transfers && transfers.length > 0}
			{#each transfers as transfer}
				<tr>
					<td class="block">
						<a href="/transactions/{transfer.deploy_hash}"> {transfer.deploy_hash}</a></td
					>
					<td class="time"
						>{`${timeAgo(millisToFormat(Date.now() - Date.parse(transfer.timestamp)))} ago`}</td
					>
					<td>
						<div class="right-flex">
							<FromToAccountHash
								cspr={parseStringValue(transfer.from_balance)}
								hash={transfer.from_address}
								link="/accounts/{transfer.from_address}"
							/>
						</div>
					</td>
					<td>
						<div class="right-flex">
							<FromToAccountHash
								cspr={parseStringValue(transfer.to_balance)}
								hash={transfer.to_address}
								link="/accounts/{transfer.to_address}"
							/>
						</div>
					</td>
					<td>
						<div class="right-flex">
							<AmountChange
								isUp={transfer.type === 'in' ? false : true}
								cspr={parseStringValue(transfer.value)}
							/>
						</div>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
	<Paginator
		showTotalRows={false}
		bind:itemsPerPage={transfersPerPage}
		apiPaginator
		bind:items={transfers}
		bind:startIndex
		on:load-page={async () => await fetchTransfers()}
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
		@apply py-[clamp(8px,0.5vw,0.5vw)] md:px-[1vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)] md:px-[1vw];
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
</style>
