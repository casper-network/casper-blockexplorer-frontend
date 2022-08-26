<script>
	import GreenCheckMarkIcon from '$lib/icons/GreenCheckMarkIcon.svelte';
	import StackIcon from '$lib/icons/StackIcon.svelte';

	import { millisToFormat, timeAgo } from '$utils/converters';

	export let hash = '';
	export let network = '';
	export let transactionStatus = '';
	export let block = 0;
	export let timestamp = 0;
	export let nonce = 0;
	export let value = 0;
	export let gasUsed = 0;
	export let gasPrice = 0;
	export let gasLimit = 0;
	export let fee = 0;
	export let rawInput = '';
	export let callerAddress = '';
	export let contactAddress = '';
</script>

<div class="overview">
	<div class="extras">
		<table class="under-border">
			<tr>
				<td class="label"> Transaction Hash </td>
				<td class="value">
					{hash}
				</td>
			</tr>

			<tr>
				<td class="label"> Network </td>
				<td class="value">
					<div class="network">
						<div class="icon">
							<StackIcon />
						</div>
						<div class="text">
							{network}
						</div>
					</div>
				</td>
			</tr>

			<tr>
				<td class="label"> Status </td>
				<td class="value">
					<div class="status" class:success={transactionStatus.toLocaleString() === 'success'}>
						<div class="icon">
							<GreenCheckMarkIcon />
						</div>
						<div class="text">
							{transactionStatus.toLocaleString() === 'success' ? 'Success' : transactionStatus}
						</div>
					</div>
				</td>
			</tr>

			<tr>
				<td class="label">Block</td>
				<td class="value"
					>{block} <span class="grey">({(412332).toLocaleString()} blocks ago)</span></td
				>
			</tr>

			<tr>
				<td class="label">Transaction Index</td>
				<td class="value"
					>{`${timeAgo(millisToFormat(Date.now() - timestamp))} ago`}<span class="grey"
						>({new Date(timestamp).toLocaleString()})</span
					></td
				>
			</tr>

			<tr>
				<td class="label">Nonce</td>
				<td class="value">{nonce}</td>
			</tr>

			<tr>
				<td class="label">Value</td>
				<td class="value">{value} Ether</td>
			</tr>

			<tr>
				<td class="label">Gas Used</td>
				<td class="value">{gasUsed.toLocaleString()}</td>
			</tr>

			<tr>
				<td class="label">Gas Price</td>
				<td class="value">{gasPrice} Gwei</td>
			</tr>

			<tr>
				<td class="label">Gas Limit</td>
				<td class="value">{gasLimit.toLocaleString()}</td>
			</tr>

			<tr>
				<td class="label">Transaction Fee</td>
				<td class="value">{fee.toLocaleString()} Ether</td>
			</tr>

			<tr>
				<td class="label">Raw Input</td>
				<td class="value">{rawInput}</td>
			</tr>
		</table>
		<table>
			<tr>
				<td class="label">Caller Address</td>
				<td class="value hash">{callerAddress}</td>
			</tr>

			<tr>
				<td class="label">Contract Address</td>
				<td class="value contract">
					<div class="text grey">Contract Creation</div>
					<div class="data hash">
						{contactAddress}
					</div>
				</td>
			</tr>
		</table>
	</div>
</div>

<style lang="postcss">
	.overview {
		@apply pt-[clamp(16px,1.73vw,1.73vw)] pb-[clamp(16px,2.08vw,2.08vw)] pl-[clamp(16px,1.43vw,1.43vw)] pr-[clamp(16px,1.90vw,1.90vw)];
		@apply w-full md:w-[51.61vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
	}

	.label {
		@apply font-bold text-[clamp(12px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:w-[13.93vw] h-full;
	}

	.value {
		@apply text-[clamp(12px,0.95vw,0.95vw)] text-color-table-header;
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	td {
		@apply pb-[clamp(4px,1.19vw,1.19vw)];
	}

	.text {
		@apply break-words;
		@apply max-w-[24vh] md:max-w-[25.65vw];
	}

	.hash {
		@apply text-color-hover-footer-link;
	}

	.extras {
		@apply md:ml-[0.23vw] md:mr-[1.25vw];
	}

	.network {
		@apply text-white;
		@apply bg-color-network-background;
		@apply px-[clamp(4px,0.6vw,0.6vw)] py-[clamp(4px,0.45vw,0.45vw)];
		@apply flex gap-[clamp(4px,0.48vw,0.48vw)] items-center;
		@apply rounded-[1.85vh] md:rounded-[1.85vw];
		@apply max-w-max;
	}

	.network > .icon {
		@apply w-[clamp(10px,1vw,1vw)] h-[clamp(10px,1vw,1vw)];
	}

	.status {
		@apply flex gap-[clamp(4px,0.24vw,0.24vw)] items-center;
		@apply text-color-arcadia-red text-[clamp(12px,0.95vw,0.95vw)] font-medium;
	}

	.status.success {
		@apply text-color-arcadia-green;
	}

	.status > .icon {
		@apply w-[1.31vh] h-[1.31vh] md:w-[1.07vw] md:h-[1.07vw];
	}

	.grey {
		@apply text-color-grey-footer-label;
	}

	.under-border {
		@apply border-b-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply mb-[clamp(16px,1.31vw,1.31vw)];
	}

	.contract {
		@apply flex-col items-start;
	}
</style>
