<script lang="ts">
	import { slide } from 'svelte/transition';

	import Hash from '$lib/components/TableData/Hash.svelte';
	import ContractChevron from '$lib/icons/ContractChevron.svelte';
	import FilterIcon2 from '$lib/icons/FilterIcon2.svelte';
	import { millisToFormat, timeAgo } from '$utils/converters';
	import RightArrow from '$lib/icons/RightArrow.svelte';
	import TopLeftTools from '$lib/components/Contracts/TopLeftTools.svelte';

	let events = [
		{
			txnHash: '0x938fd38890f207a870035uh3hj367j36j',
			txnTime: Date.parse('July 7, 2022 10:02'),
			block: 19374984,
			method: {
				id: '0x791ac947',
				type: 'Approve',
				data: {
					name: 'Address',
					type: 'uint256'
				}
			},
			logs: {
				name: 'Transfer',
				topics: [
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
				],
				botData: 1
			}
		},
		{
			txnHash: '0x938fd38890f207a870035uh3hj367j36j',
			txnTime: Date.parse('July 7, 2022 10:02'),
			block: 19374984,
			method: {
				id: '0x791ac947',
				type: 'Approve',
				data: {
					name: 'Address',
					type: 'uint256'
				}
			},
			logs: {
				name: 'Transfer',
				topics: [
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
				],
				botData: 1
			}
		},
		{
			txnHash: '0x938fd38890f207a870035uh3hj367j36j',
			txnTime: Date.parse('July 7, 2022 10:02'),
			block: 19374984,
			method: {
				id: '0x791ac947',
				type: 'Approve',
				data: {
					name: 'Address',
					type: 'uint256'
				}
			},
			logs: {
				name: 'Transfer',
				topics: [
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
				],
				botData: null
			}
		},
		{
			txnHash: '0x938fd38890f207a870035uh3hj367j36j',
			txnTime: Date.parse('July 7, 2022 10:02'),
			block: 19374984,
			method: {
				id: '0x791ac947',
				type: 'Approve',
				data: {
					name: 'Address',
					type: 'uint256'
				}
			},
			logs: {
				name: 'Transfer',
				topics: [
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
					'0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef'
				],
				botData: 1
			}
		}
	];

	let showHexDropdowns = [];
	let selectedOptions = [];
	events.forEach((_) => {
		showHexDropdowns.push(false);
		selectedOptions.push(0);
	});

	const options = ['Hex', 'Number', 'Text', 'Address'];
	const selectDropdownOption = (index: number, i: number) => {
		selectedOptions[i] = index;
		showHexDropdowns[i] = false;
	};

	let searchText = '';
</script>

<div class="contract-events">
	<TopLeftTools bind:searchText searchOnly />
	<div class="latest">
		Latest {events.length} Contract Events
	</div>
	<div class="tip grey">
		Tip: <span class="green">Logs</span> are used by developers/external UI providers for keeping trach
		of contract actions and for auditing
	</div>

	<table>
		<tr>
			<th class="no-padding">Txn Hash</th>
			<th>Block No</th>
			<th>Method</th>
			<th>Logs</th>
		</tr>
		{#each events as event, i}
			<tr>
				<td class="no-padding">
					<div class="txn">
						<Hash hash={event.txnHash} noOfCharacters={20} start />
						<div class="ago">
							{`${timeAgo(millisToFormat(Date.now() - event.txnTime))} ago`}
						</div>
					</div>
				</td>
				<td class="green">
					<div class="filter">
						<div class="text">
							{event.block}
						</div>
						<div class="icon">
							<FilterIcon2 />
						</div>
					</div>
				</td>
				<td>
					<div class="wrapper">
						<div class="method">{event.method.id}</div>
						<div>{event.method.type}</div>
						<div>({event.method.data.name}, {event.method.data.type})</div>
					</div>
				</td>
				<td>
					<div>
						>{event.logs.name} (index_topic_1 address from, index_topic_2 address to, uint256 value)
					</div>
					{#each event.logs.topics as topic, i}
						<div>[topic{i}] {topic}</div>
					{/each}

					{#if event.logs.botData}
						<div class="container">
							<div class="wrapper">
								<div class="button" on:click={() => (showHexDropdowns[i] = !showHexDropdowns[i])}>
									<div class="text">
										{options[selectedOptions[i]]}
									</div>
									<div class="icon" class:flipped={showHexDropdowns[i]}>
										<ContractChevron />
									</div>
								</div>
								{#if showHexDropdowns[i]}
									<div class="dropdown" transition:slide>
										{#each options as dropdownOption, index}
											<div
												class="dropdown-option"
												class:selected-drop={selectedOptions[i] === index}
												on:click={() => {
													selectDropdownOption(index, i);
												}}
											>
												{dropdownOption}
											</div>
										{/each}
									</div>
								{/if}
							</div>
							<div class="arrow">
								<RightArrow />
							</div>
							<div class="value">
								{event.logs.botData}
							</div>
						</div>
					{/if}
				</td>
			</tr>
		{/each}
	</table>
</div>

<style lang="postcss">
	.contract-events {
		@apply text-color-table-header text-[clamp(10px,1.07vw,1.07vw)] font-normal;
		@apply relative;
	}

	.latest {
		@apply font-medium;
		@apply mb-[clamp(4px,0.6vw,0.6vw)];
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.tip {
		@apply mb-[clamp(12px,0.95vw,0.95vw)];
	}

	.ago {
		@apply text-[clamp(10px,0.95vw,0.95vw)] text-color-grey-footer-label;
		@apply bg-color-ago-background-2;
		@apply p-[clamp(4px,0.3vw,0.3vw)];
		@apply max-w-max;
	}

	table {
		@apply table-auto w-full;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)] px-[2vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
		@apply border-b-color-hover-footer-link border-b-[clamp(1px,0.06vw,0.06vw)] border-t-color-hover-footer-link border-t-[clamp(1px,0.06vw,0.06vw)];
		@apply bg-color-events-header-bg;
	}

	td {
		@apply py-[clamp(8px,1.05vw,1.05vw)] px-[2vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
		@apply align-top;
		@apply border-b-color-contract-header-border border-b-[clamp(1px,0.06vw,0.06vw)];
	}

	.grey {
		@apply text-color-grey-footer-label;
	}

	.filter {
		@apply flex gap-[clamp(4px,0.48vw,0.48vw)] items-center;
	}

	.filter > .icon {
		@apply w-[0.95vh] h-[0.95vh] md:w-[0.95vw] md:h-[0.95vw];
		@apply cursor-pointer;
	}

	.method {
		@apply bg-color-translucent-blue;
		@apply px-[clamp(4px,0.42vw,0.42vw)] py-[clamp(2px,0.3vw,0.3vw)];
		@apply max-w-max;
		@apply text-color-arcadia-blue;
	}

	.button {
		@apply p-[clamp(8px,0.6vw,0.6vw)];
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply text-color-grey-footer-label;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply transition-all duration-300;
		@apply flex items-center gap-[0.6vw];
	}

	.button {
		@apply p-[clamp(8px,0.6vw,0.6vw)];
		@apply border-color-progress-bg border-[clamp(1px,0.06vw,0.06vw)];
		@apply text-color-grey-footer-label;
		@apply rounded-[0.48vh] md:rounded-[0.48vw];
		@apply transition-all duration-300;
		@apply max-w-max;
		@apply flex items-center gap-[0.6vw];
	}

	.icon {
		@apply w-[0.54vw] h-[0.33vw];
		@apply transition-all;
	}

	.flipped {
		@apply transform rotate-180;
	}

	.wrapper {
		@apply relative;
		@apply cursor-pointer;
	}

	.dropdown {
		@apply absolute z-50;
		@apply text-color-table-header text-opacity-50 text-[clamp(10px,1.07vw,1.07vw)];
		@apply flex flex-col gap-[0.4vw];
		@apply min-w-max;
		@apply rounded-[0.6vw];
		@apply bg-white;
		@apply mt-[0.89vw] py-[0.83vw] px-[1.07vw];
		@apply shadow-[0px_0px_0.65vw_0px_rgba(0,0,0,0.1)];
	}

	.dropdown-option {
		@apply hover:text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.dropdown-option.selected-drop {
		@apply text-color-hover-footer-link font-medium;
	}

	.container {
		@apply flex items-center gap-[clamp(16px,0.95vw,0.95vw)];
	}

	.arrow {
		@apply w-[clamp(12px,0.95vw,0.95vw)];
	}

	.no-padding {
		@apply px-0;
	}
</style>
