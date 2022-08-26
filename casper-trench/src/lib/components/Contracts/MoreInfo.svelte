<script lang="ts">
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import BlockIcon from '$lib/icons/BlockIcon.svelte';
	import { parseStringValue, processType } from '$utils/converters';
	import Hash from '../TableData/Hash.svelte';

	export let nameTag = 'Alex';
	export let creator = {
		address: '0x34b9235db59c329ee3nv9824hb49278g16n1b61q356nj1q36',
		txn: '0x50de8d787940850531bd3ce31237j2m7mw35712462624'
	};
</script>

<div class="overview">
	<div class="title">MORE INFO</div>
	<div class="extras">
		<table>
			<tr>
				<td class="label"> My Name Tag </td>
				<td class="value">
					{#if nameTag && nameTag.length > 0}
						{nameTag}
					{:else}
						Not Available, <span
							class="green"
							on:click={() => {
								//Login Functionality
							}}>Login to Update</span
						>
					{/if}
				</td>
			</tr>
			<tr>
				<td class="label"> Contract Creator </td>
				<td class="value">
					<Hash hash={creator.address} noOfCharacters={20} start /> at txn <Hash
						hash={creator.txn}
						noOfCharacters={20}
						start
					/>
				</td>
			</tr>
			<tr>
				<td class="label"> Token Tracker </td>
				<td class="value">
					<div class="tracker">
						<div class="icon">
							<BlockIcon />
						</div>
						<div class="text green">Crypto Port (CRYPTOPORT)</div>
					</div>
				</td>
			</tr>
		</table>
	</div>
</div>

<style lang="postcss">
	.overview {
		@apply pt-[clamp(16px,1.73vw,1.73vw)] pb-[clamp(16px,2.08vw,2.08vw)] pl-[clamp(16px,1.43vw,1.43vw)] pr-[clamp(16px,1.90vw,1.90vw)];
		@apply w-full md:w-[44.7vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
	}

	.label {
		@apply font-bold text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:w-[10.83vw];
	}

	.value {
		@apply text-[clamp(12px,1.07vw,1.07vw)] text-color-table-header;
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	td {
		@apply pb-[clamp(4px,2.2vw,2.2vw)];
		@apply align-top;
	}

	.extras {
		@apply md:ml-[0.23vw] md:mr-[1.25vw];
	}

	.title {
		@apply text-color-table-header text-[clamp(12px,1.19vw,1.19vw)] font-bold;
		@apply pb-[clamp(4px,1.19vw,1.19vw)] mb-[clamp(4px,1.61vw,1.61vw)];
		@apply border-b-[clamp(1px,0.09vw,0.09vw)] border-color-tooltip-border;
	}

	.green {
		@apply text-color-hover-footer-link;
		@apply cursor-pointer;
	}

	.tracker > .icon {
		@apply w-[1.19vh] h-[1.19vh] md:w-[1.19vw] md:h-[1.19vw];
	}

	.tracker {
		@apply flex items-center gap-[clamp(2px,0.24vw,0.24vw)];
	}
</style>
