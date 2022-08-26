<script lang="ts">
	import Hash from '$components/TableData/Hash.svelte';
	import { getValidatorDetails, parseStringValue } from '$utils/converters';
	import type { BlockTransfer } from '$utils/types/transfer';
	import { slide } from 'svelte/transition';
	import FromToAccountHash from '../TableData/FromToAccountHash.svelte';
	import Validator from '../TableData/Validator.svelte';
	export let transfers: BlockTransfer[];
</script>

<div class="delegators-tab" transition:slide>
	<table>
		<tr>
			<th>Transactions</th>
			<th>From (Account Hash)</th>
			<th>To (Account Hash)</th>
			<th class="right">Value</th>
		</tr>
		<div class="divider table-header-border" />
		{#if transfers && transfers.length > 0}
			{#each transfers as transfer, i}
				<tr>
					<td>
						<a href="/transactions/{transfer.deploy_hash}">
							<Hash hash={transfer.deploy_hash} noOfCharacters={10} />
						</a>
					</td>
					<td>
						<a href="/accounts/{transfer.from}">
							<div class="account">
								{#await getValidatorDetails(transfer.from)}
									<div class="image-placeholder">
										<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
									</div>
								{:then validator}
									{#if validator?.icon}
										<img src={validator?.icon} alt="to-account-logo" />
									{:else}
										<div class="image-placeholder">
											<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
										</div>
									{/if}
								{/await}
								<Hash hash={transfer.from} noOfCharacters={10} />
							</div>
						</a>
					</td>
					<td>
						{#if transfer.to}
							<a href="/accounts/{transfer.to}">
								<div class="account">
									{#await getValidatorDetails(transfer.to)}
										<div class="image-placeholder">
											<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
										</div>
									{:then validator}
										{#if validator?.icon}
											<img src={validator?.icon} alt="to-account-logo" />
										{:else}
											<div class="image-placeholder">
												<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
											</div>
										{/if}
									{/await}
									<Hash hash={transfer?.to} noOfCharacters={10} />
								</div>
							</a>
						{/if}
					</td>
					<td>
						<div class="value-crypto">
							<div class="crypto">
								{transfer.amount.toLocaleString('en')}
							</div>
							<div class="cspr">CSPR</div>
						</div>
					</td>
				</tr>
			{/each}
		{/if}
	</table>
</div>

<style lang="postcss">
	table {
		@apply table-auto md:w-[58.75vw] relative;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header;
		@apply text-left;
	}

	td {
		@apply py-[clamp(8px,1.19vw,1.19vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header min-w-max;
	}

	.value-crypto {
		@apply flex items-center justify-end gap-[clamp(2px,0.24vw,0.24vw)];
		@apply text-right text-[clamp(8px,0.83vw,0.83vw)];
	}
	.crypto {
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header;
	}

	.cspr {
		@apply text-[clamp(8px,0.83vw,0.83vw)] text-color-grey-footer-label;
	}

	.account {
		@apply flex items-center gap-[clamp(4px,0.36vw,0.36vw)];
	}

	.account > img {
		@apply w-[1.67vh] h-[1.67vh] md:w-[1.67vw] md:h-[1.67vw];
		@apply rounded-full;
	}
	.image-placeholder {
		@apply bg-gray-100;
		@apply rounded-full;
		@apply flex items-center justify-center;
		@apply w-[2vh] h-[2vh] md:w-[2vw] md:h-[2vw];
	}
	.image-placeholder > img {
		@apply w-2/3;
	}
	.value-crypto {
		@apply flex items-center gap-[clamp(2px,0.24vw,0.24vw)];
		@apply text-color-arcadia-red;
	}

	.right {
		@apply text-right;
	}
</style>
