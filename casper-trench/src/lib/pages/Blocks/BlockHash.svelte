<script lang="ts">
	import { goto } from '$app/navigation';

	import { page } from '$app/stores';
	import BlockProofs from '$lib/components/Blocks/BlockProofs.svelte';
	import TransactionsTable from '$lib/components/Blocks/TransactionsTable.svelte';
	import Button from '$lib/components/Reusables/Button.svelte';
	import CrossedEyeIcon from '$lib/icons/CrossedEyeIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import SwitchChevron from '$lib/icons/SwitchChevron.svelte';
	import VerifiedIcon from '$lib/icons/VerifiedIcon.svelte';
	import { isLoading } from '$stores/loading';
	import { getBlock, getCurrentBlockHeight, getBlockTransfers } from '$utils/chain/blocks';
	import { getValidatorDetails, millisToFormat, timeAgo } from '$utils/converters';
	import type { Block } from '$utils/types/block';
	import type { BlockTransfer } from '$utils/types/transfer';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	let showTransfers = false;
	let showProofs = false;
	let block: Block;
	// let transfers: BlockTransfer[];
	let transfers;
	let currentHeight = 0;
	onMount(async () => {
		$isLoading = true;
		block = await getBlock($page.params.hash);
		currentHeight = await getCurrentBlockHeight();
		transfers = block && (await getBlockTransfers(block.hash));
		$isLoading = false;
	});
</script>

{#if block}
	<div class="block-hash">
		<div class="wrapper">
			<div class="block-buttons">
				<Button
					on:click={() => {
						goto(`/blocks/${block.height - 1}`);
						window.location.reload();
					}}
					block>Block #{block.height - 1}</Button
				>
				<Button block active>Block #{block.height}</Button>
				<Button
					on:click={() => {
						if (block.height + 1 <= currentHeight) {
							goto(`/blocks/${block.height + 1}`);
							window.location.reload();
						}
					}}
					block
				>
					{#if block.height + 1 <= currentHeight}
						Block #{block.height + 1}
					{:else}
						Crunching...
					{/if}
				</Button>
			</div>

			<div class="top">
				<div class="title">
					Block {block.height}
				</div>
				<div class="sub-title">
					<div class="blocks">
						<span class="green">Blocks</span> / Block {currentHeight}
					</div>
				</div>
			</div>

			<div class="details">
				<table class="extras">
					<tr>
						<td class="label">Block Height</td>
						<td class="value">{block.height}</td>
					</tr>
					<tr>
						<td class="label">Era ID</td>
						<td class="value">{block.eraID}</td>
					</tr>
					<tr>
						<td class="label">Timestamp</td>
						<td class="value">
							<div class="time">{new Date(block.timestamp)}</div>
							<div class="ago">
								{`${timeAgo(millisToFormat(Date.now() - block.timestamp))} ago`}
							</div>
						</td>
					</tr>
					<tr>
						<td class="label">Validated by</td>
						<td class="value">
							{#await getValidatorDetails(block.validatorPublicKey)}
								<div class="validator validator-placeholder" />
							{:then validator}
								<div class="validator">
									<div class="logo">
										{#if validator?.icon}
											<img src={validator?.icon} alt="validator-icon" />
										{:else}
											<div class="image-placeholder">
												<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
											</div>
										{/if}
									</div>
									<div class="dets">
										<div class="name {validator?.name ? 'gap-[clamp(8px,0.5vw,0.5vw)]' : ''}">
											<div class="text">
												{validator?.name || ''}
											</div>
											<div class="verified-icon">
												<VerifiedIcon />
											</div>
										</div>
										<div class="hash">
											{block.validatorPublicKey}
										</div>
									</div>
								</div>
							{/await}
						</td>
					</tr>
					<tr>
						<td class="label">Block Hash</td>
						<td class="value">{block.hash}</td>
					</tr>
					<tr>
						<td class="label">Transactions</td>
						<td class="value">
							<div
								class="transaction-button green"
								on:click={() => {
									showTransfers = transfers && transfers.length > 0 && !showTransfers;
								}}
							>
								<div class="text">
									{(transfers && transfers.length) || 0} Transaction{`${
										transfers && transfers.length === 1 ? '' : 's'
									}`}
								</div>
								<div class="icon" class:flipped={showTransfers}>
									<SwitchChevron />
								</div>
							</div>
							{#if showTransfers}
								<TransactionsTable {transfers} />
							{/if}
						</td>
					</tr>
					<tr>
						<td class="label">State Root Hash</td>
						<td class="value">{block.stateRootHash}</td>
					</tr>
					<tr>
						<td class="label">Proofs</td>
						<td class="value">
							<div
								class="proofs-button green"
								on:click={() => {
									showProofs = !showProofs;
								}}
							>
								<div class="text">
									{#if !showProofs}
										Show
									{:else}
										Hide
									{/if}
								</div>
								<div class="eye-icon">
									{#if !showProofs}
										<div transition:slide>
											<EyeIcon />
										</div>
									{:else}
										<div transition:slide>
											<CrossedEyeIcon />
										</div>
									{/if}
								</div>
							</div>
							{#if showProofs}
								<BlockProofs proofs={block && block.proofs} />
							{/if}
						</td>
					</tr>
				</table>
			</div>
		</div>
	</div>
{/if}

<style lang="postcss">
	.wrapper {
		@apply md:w-[82.2vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply px-[clamp(16px,2.38vw,2.38vw)] py-[clamp(16px,2.38vw,2.38vw)] mx-auto;
		@apply relative;
		@apply text-color-table-header;
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
	}

	.block-buttons {
		@apply flex gap-[clamp(4px,1.79vw,1.79vw)];
		@apply absolute top-[clamp(16px,1.79vw,1.79vw)] right-[clamp(16px,2.38vw,2.38vw)];
	}

	.title {
		@apply text-[clamp(16px,1.43vw,1.43vw)] font-bold;
	}

	.sub-title {
		@apply text-[clamp(12px,1.07vw,1.07vw)];
		@apply mb-[clamp(16px,2.74vw,2.74vw)];
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.top {
		@apply border-b-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
	}

	.details {
		@apply pt-[clamp(16px,2.14vw,2.14vw)];
	}

	.label {
		@apply font-bold text-[clamp(16px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:w-[18.45vw];
	}

	.value {
		@apply text-[clamp(16px,1.07vw,1.07vw)];
		@apply flex flex-col gap-[0.24vw];
		@apply w-full;
	}

	td {
		@apply pb-[clamp(16px,2.2vw,2.2vw)];
		@apply align-top;
	}

	.ago {
		@apply text-[clamp(10px,0.95vw,0.95vw)] text-color-grey-footer-label;
		@apply bg-color-ago-background;
		@apply p-[clamp(4px,0.3vw,0.3vw)];
		@apply max-w-max;
	}

	.validator {
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply p-[clamp(16px,1.19vw,1.19vw)];
		@apply rounded-[0.6vh] md:rounded-[0.6vw];
		@apply flex items-center gap-[clamp(8px,0.71vw,0.71vw)];
	}
	.validator-placeholder {
		@apply animate-pulse;
		@apply bg-gradient-to-tr from-gray-100 to-gray-50;
		@apply h-[clamp(16px,1.19vw,1.19vw)];
	}

	.logo {
		@apply w-[2.98vh] h-[2.98vh] md:w-[2.98vw] md:h-[2.98vw];
	}

	.logo > img {
		@apply rounded-full;
	}
	.image-placeholder {
		@apply bg-gray-100;
		@apply rounded-full;
		@apply flex items-center justify-center;
		@apply w-[2.98vh] h-[2.98vh] md:w-[2.98vw] md:h-[2.98vw];
	}
	.image-placeholder > img {
		@apply w-2/3;
	}

	.name {
		@apply flex items-center gap-[clamp(8px,0.5vw,0.5vw)];
	}

	.verified-icon {
		@apply w-[1.31vh] h-[1.31vh] md:w-[1.31vw] md:h-[1.31vw];
	}

	.dets > .hash {
		@apply text-color-table-header;
	}

	.transaction-button {
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
		@apply cursor-pointer;
		@apply max-w-max;
	}

	.icon {
		@apply w-[0.54vw] h-[0.33vw];
		@apply transition-all;
	}

	.flipped {
		@apply transform rotate-180;
	}

	.eye-icon {
		@apply w-[1.19vh] md:w-[1.19vw];
	}

	.proofs-button {
		@apply flex items-center gap-[0.3vw];
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-translucent-green;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
	}
</style>
