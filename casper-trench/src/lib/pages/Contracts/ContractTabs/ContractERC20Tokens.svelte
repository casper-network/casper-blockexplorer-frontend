<script lang="ts">
	import Paginator from '$lib/components/Paginator/index.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';

	export let props: {
		contractHash: string;
	};
	let transactionsPerPage: number = 10;
	let startIndex = 0;
	let tokens = [
		{
			txnHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0.00022198,
			token: {
				name: 'Mana',
				imgUrl: 'https://cryptologos.cc/logos/decentraland-mana-logo.svg?v=022'
			}
		},
		{
			txnHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0.00022198,
			token: {
				name: 'Mana',
				imgUrl: 'https://cryptologos.cc/logos/decentraland-mana-logo.svg?v=022'
			}
		},
		{
			txnHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0.00022198,
			token: {
				name: 'Mana',
				imgUrl: 'https://cryptologos.cc/logos/decentraland-mana-logo.svg?v=022'
			}
		},
		{
			txnHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0.00022198,
			token: {
				name: 'Mana',
				imgUrl: 'https://cryptologos.cc/logos/decentraland-mana-logo.svg?v=022'
			}
		},
		{
			txnHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0.00022198,
			token: {
				name: 'Mana',
				imgUrl: 'https://cryptologos.cc/logos/decentraland-mana-logo.svg?v=022'
			}
		},
		{
			txnHash: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			age: Date.parse('July 25, 2022 16:06'),
			from: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			to: '0x67c13583ae9f2071b9gn2899813298ngv98298g9248hg2',
			value: 0.00022198,
			token: {
				name: 'Mana',
				imgUrl: 'https://cryptologos.cc/logos/decentraland-mana-logo.svg?v=022'
			}
		}
	];
</script>

<div class="delegators-tab">
	<div class="total">
		{transactionsPerPage} Transactions per page
	</div>
	<table>
		<tr>
			<th class="block">TX Hash</th>
			<th>Age</th>
			<th>From</th>
			<th>To</th>
			<th>Value</th>
			<th>Token</th>
		</tr>
		<div class="divider table-header-border" />
		{#if tokens && tokens.length > 0}
			{#each tokens as token}
				<tr>
					<td class="block">
						<Hash hash={token.txnHash} noOfCharacters={20} start />
					</td>
					<td>{`${timeAgo(millisToFormat(Date.now() - token.age))} ago`}</td>
					<td><Hash hash={token.from} noOfCharacters={20} start /></td>
					<td><Hash hash={token.to} noOfCharacters={20} start /></td>
					<td>{token.value}</td>
					<td>
						<div class="token">
							<img src={token.token.imgUrl} alt="token-logo" />
							<div class="text">
								{token.token.name}
							</div>
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

	.total {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply mb-[2.38vw];
	}

	.token {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}

	.token > img {
		@apply w-[1.61vh] h-[1.61vh] md:w-[1.61vw] md:h-[1.61vw];
	}
</style>
