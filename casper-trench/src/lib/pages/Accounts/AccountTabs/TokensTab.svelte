<script>
	import Paginator from '$lib/components/Paginator/index.svelte';
	import PlaceHolderIndicator from '$lib/components/PlaceHolderIndicator.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import Hash from '../../../components/TableData/Hash.svelte';
	import TransactionStatus from '../../../components/TableData/TransactionStatus.svelte';

	// export let props = {};

	let tokens = [
		{
			contract: {
				hash: '72059g35b25789bg129bg219bg529gg0f26e',
				name: 'WISeKey'
			},
			id: '6220aeafdcfaaaa5a645uy789tu8t8h028h8980',
			name: 'Brooke Shield : The Tree',
			description: 'This photo comes straight from Brooke Shield’s products',
			standard: 'CEP47'
		},
		{
			contract: {
				hash: '72059g35b25789bg129bg219bg529gg0f26e',
				name: 'WISeKey'
			},
			id: '6220aeafdcfaaaa5a645uy789tu8t8h028h8980',
			name: 'Brooke Shield : The Tree',
			description: 'This photo comes straight from Brooke Shield’s products',
			standard: 'CEP47'
		},
		{
			contract: {
				hash: '72059g35b25789bg129bg219bg529gg0f26e',
				name: ''
			},
			id: '6220aeafdcfaaaa5a645uy789tu8t8h028h8980',
			name: 'Brooke Shield : The Tree',
			description: 'This photo comes straight from Brooke Shield’s products',
			standard: 'CEP47'
		},
		{
			contract: {
				hash: '72059g35b25789bg129bg219bg529gg0f26e',
				name: ''
			},
			id: '6220aeafdcfaaaa5a645uy789tu8t8h028h8980',
			name: 'Brooke Shield : The Tree',
			description: 'This photo comes straight from Brooke Shield’s products',
			standard: 'CEP47'
		},
		{
			contract: {
				hash: '72059g35b25789bg129bg219bg529gg0f26e',
				name: 'WISeKey'
			},
			id: '6220aeafdcfaaaa5a645uy789tu8t8h028h8980',
			name: 'Brooke Shield : The Tree',
			description: 'This photo comes straight from Brooke Shield’s products',
			standard: 'CEP47'
		},
		{
			contract: {
				hash: '72059g35b25789bg129bg219bg529gg0f26e',
				name: 'WISeKey'
			},
			id: '6220aeafdcfaaaa5a645uy789tu8t8h028h8980',
			name: 'Brooke Shield : The Tree',
			description: 'This photo comes straight from Brooke Shield’s products',
			standard: 'CEP47'
		}
	];
	let tokensPerPage = 10;
</script>

<div class="tokens-tab">
	<div class="total">
		<!--	Latest {tokensPerPage} Transactions <PlaceHolderIndicator /> -->
		Latest {tokensPerPage} Transactions
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
		{#each tokens as token}
			<tr>
				<td class="block">
					<div class="wrapper">
						<Hash hash={token.contract.hash} />
						<div class="text">
							{token.contract.name}
						</div>
					</div>
				</td>
				<td class="hash">{`${token.id.substring(0, 20)}...`}</td>
				<td>{token.name}</td>
				<td class="desc"
					>{`${token.description.substring(0, 50)}${
						token.description.length > 50 ? '...' : ''
					}`}</td
				>
				<td>{token.standard}</td>
			</tr>
		{/each}
	</table>
	<Paginator />
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
		@apply mb-[clamp(8px,2.38vw,2.38vw)];
	}

	.hash {
		@apply text-color-hover-footer-link;
	}

	.wrapper {
		@apply text-color-table-header;
		@apply md:h-[2.8vw];
		@apply flex flex-col justify-center;
	}

	.desc {
		@apply text-color-grey-footer-label;
	}
</style>
