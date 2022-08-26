<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';

	export let props: {
		contractHash: string;
	};
	let transactionsPerPage: number = 10;
	let startIndex = 0;
	let tokens = [
		{
			contract: {
				address: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
				name: 'WISeKey'
			},
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			name: 'Brooke Shield : The Tree',
			description: "This photo comes straight from Brooke Shield’s product's",
			standard: 'CEP47'
		},
		{
			contract: {
				address: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
				name: 'WISeKey'
			},
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			name: 'Brooke Shield : The Tree',
			description: "This photo comes straight from Brooke Shield’s product's",
			standard: 'CEP47'
		},
		{
			contract: {
				address: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
				name: 'WISeKey'
			},
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			name: 'Brooke Shield : The Tree',
			description: "This photo comes straight from Brooke Shield’s product's",
			standard: 'CEP47'
		},
		{
			contract: {
				address: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
				name: 'WISeKey'
			},
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			name: 'Brooke Shield : The Tree',
			description: "This photo comes straight from Brooke Shield’s product's",
			standard: 'CEP47'
		},
		{
			contract: {
				address: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
				name: 'WISeKey'
			},
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			name: 'Brooke Shield : The Tree',
			description: "This photo comes straight from Brooke Shield’s product's",
			standard: 'CEP47'
		},
		{
			contract: {
				address: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
				name: 'WISeKey'
			},
			id: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			name: 'Brooke Shield : The Tree',
			description: "This photo comes straight from Brooke Shield’s product's",
			standard: 'CEP47'
		}
	];
</script>

<div class="delegators-tab">
	<div class="total">
		{transactionsPerPage} Transactions per page
	</div>
	<table>
		<tr>
			<th class="block">Contract</th>
			<th>Token ID</th>
			<th>Name</th>
			<th>Description</th>
			<th>Standard</th>
		</tr>
		<div class="divider table-header-border" />
		{#if tokens && tokens.length > 0}
			{#each tokens as token}
				<tr>
					<td class="block">
						<Hash hash={token.contract.address} noOfCharacters={5} />
						{token.contract.name}
					</td>
					<td><Hash hash={token.id} noOfCharacters={20} start /></td>
					<td>{token.name}</td>
					<td class="grey">
						{`${token.description.substring(0, 50)}${token.description.length > 50 ? '...' : ''}`}
					</td>
					<td>{token.standard}</td>
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

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.grey {
		@apply text-color-grey-footer-label;
	}
</style>
