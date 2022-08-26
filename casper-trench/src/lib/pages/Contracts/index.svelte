<script>
	import Paginator from '$lib/components/Paginator/index.svelte';
	import Tooltip from '$lib/components/Reusables/Tooltip.svelte';
	import Hash from '$lib/components/TableData/Hash.svelte';
	import LightningIcon from '$lib/icons/LightningIcon.svelte';
	import SettingsIcon from '$lib/icons/SettingsIcon.svelte';
	import VersionWarningIcon from '$lib/icons/VersionWarningIcon.svelte';

	let contracts = [
		{
			address: '0x9677F70261FC9bd57f88nf814bf91734vfb',
			name: 'Nuggets',
			type: 'NFT',
			version: '0.6.12',
			balance: 0,
			transactions: 1,
			date: Date.parse('July 15, 2022, 14:09'),
			audited: 'None'
		},
		{
			address: '0x9677F70261FC9bd57f88nf814bf91734vfb',
			name: 'Nuggets',
			type: 'CUSTOM ERC-20',
			version: '0.6.12',
			balance: 0,
			transactions: 1,
			date: Date.parse('July 15, 2022, 14:09'),
			audited: 'None'
		},
		{
			address: '0x9677F70261FC9bd57f88nf814bf91734vfb',
			name: 'SYSTEM CONTRACT',
			type: 'ERC 20',
			version: '0.6.12',
			balance: 0,
			transactions: 1,
			date: Date.parse('July 15, 2022, 14:09'),
			audited: 'None'
		},
		{
			address: '0x9677F70261FC9bd57f88nf814bf91734vfb',
			name: 'CUSTOM ERC-20',
			type: 'NFT',
			version: '0.6.12',
			balance: 0,
			transactions: 1,
			date: Date.parse('July 15, 2022, 14:09'),
			audited: 'None'
		},
		{
			address: '0x9677F70261FC9bd57f88nf814bf91734vfb',
			name: 'Nuggets',
			type: 'ERC 20',
			version: '0.6.12',
			balance: 0,
			transactions: 1,
			date: Date.parse('July 15, 2022, 14:09'),
			audited: 'None'
		}
	];
</script>

<div class="delegators-tab">
	<div class="title">Contracts</div>
	<table>
		<tr>
			<th class="block">Address</th>
			<th>Contract Name</th>
			<th>Type</th>
			<th>Version</th>
			<th>Balance</th>
			<th>Txns</th>
			<!-- <th>Setting</th> -->
			<th>Verified</th>
			<th>
				<div class="tooltip">
					<div class="text">Audited</div>
					<!-- <Tooltip text="Test" /> -->
				</div>
			</th>
		</tr>
		<div class="divider table-header-border" />
		{#each contracts as contract}
			<tr>
				<td class="block hash">
					<!-- remove contracts redirect -->
					<p>
						<Hash hash={contract.address} noOfCharacters={20} start variant="right" />
					</p>
				</td>
				<td class="grey">{contract.name}</td>
				<td>{contract.type}</td>
				<td>
					<div class="setting">
						<div class="version-icon">
							<VersionWarningIcon />
						</div>
						<div class="grey">
							{contract.version}
						</div>
					</div>
				</td>
				<!-- remove mention of cspr -->
				<!-- <td>{contract.balance} ----</td> -->
				<td class="black">{contract.transactions}</td>
				<!-- <td>
					<div class="setting">
						<button
							type="button"
							class="icon"
							on:click={() => {
								// Lightning functionality
							}}
						>
							<LightningIcon />
						</button>
						<button
							type="button"
							class="icon"
							on:click={() => {
								// Settings functionality
							}}
						>
							<SettingsIcon />
						</button>
					</div>
				</td> -->
				<td class="black">{new Date(contract.date).toLocaleDateString()}</td>
				<td class="black">{contract.audited}</td>
			</tr>
		{/each}
	</table>
	<Paginator />
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

	.tooltip {
		@apply flex items-center gap-[clamp(4px,0.5vw,0.5vw)];
	}

	.setting {
		@apply flex gap-[clamp(4px,0.36vw,0.36vw)] items-center;
	}

	.setting > .icon {
		@apply w-[clamp(16px,1.55vw,1.55vw)] h-[clamp(16px,1.55vw,1.55vw)];
		@apply cursor-pointer;
	}

	.black {
		@apply text-color-black-text;
	}

	.grey {
		@apply text-color-grey-footer-label;
	}

	.version-icon {
		@apply w-[1.19vh] h-[1.19vh] md:w-[1.19vw] md:h-[1.19vw];
	}

	.hash {
		@apply text-color-hover-footer-link;
	}
</style>
