<script lang="ts">
	import { slide } from 'svelte/transition';

	import CrossedEyeIcon from '$lib/icons/CrossedEyeIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import VerifiedIcon from '$lib/icons/VerifiedIcon.svelte';
	import DownloadIcon from '$lib/icons/DownloadIcon.svelte';
	import TransactionDetailsSuccessIcon from '$lib/icons/TransactionDetailsSuccessIcon.svelte';

	import {
		getValidatorDetails,
		millisToFormat,
		parseStringValue,
		timeAgo
	} from '$utils/converters';
	import BalanceTransferrable from '$lib/components/TableData/BalanceTransferrable.svelte';
	import { sampleJsonData } from '$utils/sampleData';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import TreeToggle from '$lib/components/Reusables/TreeToggle.svelte';
	import { onMount } from 'svelte';
	import type { TransactionDetail } from '$utils/types/transaction';
	import { isLoading } from '$stores/loading';
	import { getDeploy } from '$utils/api';
	import { page } from '$app/stores';

	let transactionStatus = 'success';

	let showRawData = false;
	let transaction: TransactionDetail;
	onMount(async () => {
		$isLoading = true;
		transaction = await getDeploy($page.params.hash);
		$isLoading = false;
	});

	let toDownload;
</script>

<svelte:head>
	<script
		src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"
		integrity="sha512-GsLlZN/3F2ErC5ifS5QtgpiJtWd43JWSuIgh7mbzZ8zBps+dvLusV+eNQATqgA/HdeKFVgA5v3S/cIrLF7QnIg=="
		crossorigin="anonymous"
		referrerpolicy="no-referrer"></script>
</svelte:head>

<div class="transaction-details">
	<div class="top">
		<span class="green">Transaction</span> / Transaction Details
	</div>
	{#if transaction}
		<div class="wrapper" bind:this={toDownload}>
			<button
				class="download-button"
				type="button"
				on:click={() => {
					var opt = {
						margin: 1,
						filename: `${transaction.deploy.hash}.pdf`,
						image: { type: 'jpeg', quality: 1 },
						html2canvas: { scale: 2, width: '2800', height: '1920' },
						jsPDF: { unit: 'px', format: 'a4', orientation: 'portrait' }
					};

					// New Promise-based usage:
					html2pdf().set(opt).from(toDownload).save();
				}}
			>
				<DownloadIcon />
			</button>

			<div class="status">
				<div class="icon">
					{#if transaction.deploy?.approvals?.length > 0}
						<TransactionDetailsSuccessIcon />
					{:else}
						<!-- TODO Fail Icon -->
					{/if}
				</div>
				<div class="status-text" class:success={transaction.deploy?.approvals?.length > 0}>
					{transactionStatus.toLowerCase() === 'success'
						? 'TRANSFER SUCCESS'
						: transactionStatus.toUpperCase()}
				</div>
				<div class="amount">
					<div class="value">
						{parseStringValue(
							transaction.deploy?.session?.Transfer?.args[0]?.[1]?.parsed
						).toLocaleString('en')}
					</div>
					<div class="cspr">CSPR</div>
				</div>
			</div>

			<div class="details">
				<table class="extras">
					<tr>
						<td class="label">Transactions Hash</td>
						<td class="value">{transaction.deploy?.hash}</td>
					</tr>

					<tr>
						<td class="label">Block Height</td>
						<td class="value green">{transaction.deploy?.header?.block_height}</td>
					</tr>

					<tr>
						<td class="label">Timestamp</td>
						<td class="value">
							<div class="time">{new Date(transaction.deploy?.header?.timestamp)}</div>
							<div class="ago">
								{`${timeAgo(
									millisToFormat(Date.now() - Date.parse(transaction.deploy?.header?.timestamp))
								)} ago`}
							</div>
						</td>
					</tr>

					<tr>
						<td class="label">From (Public Key)</td>
						<td class="value">
							{#await getValidatorDetails(transaction.deploy?.header?.account)}
								<div class="validator validator-placeholder" />
							{:then validator}
								<div class="validator">
									<div class="logo">
										{#if validator.name}
											<img src={validator.icon} alt="validator-icon" />
										{:else}
											<div class="image-placeholder">
												<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
											</div>
										{/if}
									</div>
									<div class="dets">
										<div class="name {validator.name ? 'gap-[clamp(8px,0.5vw,0.5vw)]' : ''}">
											<div class="text">
												{validator.name || ''}
											</div>
											<div class="verified-icon">
												<VerifiedIcon />
											</div>
										</div>
										<div class="hash">
											<a href="/validator/{transaction.deploy?.header?.account}">
												{transaction.deploy?.header?.account}
											</a>
											<div>
												<CopyIcon text={transaction.deploy?.header?.account} />
											</div>
										</div>
									</div>
								</div>
							{/await}
						</td>
					</tr>

					<tr>
						<td class="label">To (Public Key)</td>
						<td class="value">
							{#await getValidatorDetails(transaction.deploy?.session?.Transfer?.args[1]?.[1]?.parsed)}
								<div class="validator validator-placeholder" />
							{:then validator}
								<div class="validator">
									<div class="logo">
										{#if validator.icon}
											<img src={validator.icon} alt="validator-icon" />
										{:else}
											<div class="image-placeholder">
												<img src="/images/png/validator-placeholder.png" alt="validator-icon" />
											</div>
										{/if}
									</div>
									<div class="dets">
										<div class="name {validator.name ? 'gap-[clamp(8px,0.5vw,0.5vw)]' : ''}">
											<div class="text">
												{validator.name || ''}
											</div>
											<div class="verified-icon">
												<VerifiedIcon />
											</div>
										</div>
										<div class="hash">
											<a
												href="/validators/{transaction.deploy?.session?.Transfer?.args[1]?.[1]
													?.parsed}"
											>
												{transaction.deploy?.session?.Transfer?.args[1]?.[1]?.parsed}</a
											>
											<div>
												<CopyIcon
													text={transaction.deploy?.session?.Transfer?.args[1]?.[1]?.parsed}
												/>
											</div>
										</div>
									</div>
								</div>
							{/await}
						</td>
					</tr>

					<tr>
						<td class="label">Value</td>
						<td class="value"
							><BalanceTransferrable
								cspr={parseStringValue(transaction.deploy?.session?.Transfer?.args[0]?.[1]?.parsed)}
							/></td
						>
					</tr>

					<tr>
						<td class="label">Transaction Fee</td>
						<td class="value"
							><BalanceTransferrable
								cspr={parseStringValue(transaction.deploy?.header?.cost)}
							/></td
						>
					</tr>

					<tr>
						<td class="label">Gas Price</td>
						<td class="value">{transaction.deploy?.header?.gas_price} motes</td>
					</tr>

					<tr>
						<td class="label">TTL</td>
						<td class="value">{transaction.deploy?.header?.ttl}</td>
					</tr>

					<tr>
						<td class="label">Raw Data</td>
						<td class="value">
							<div class="raw-buttons">
								<div
									class="proofs-button green"
									on:click={() => {
										showRawData = !showRawData;
									}}
								>
									<div class="text">Show</div>
									<div class="eye-icon">
										{#if !showRawData}
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
								{#if showRawData}
									<button
										type="button"
										on:click={() => {
											navigator.clipboard &&
												navigator.clipboard.writeText(JSON.stringify(transaction, null, 2));
										}}
										class="copy-button"
									>
										<div class="text">Copy</div>
										<div class="copy-icon">
											<CopyIcon />
										</div>
									</button>
								{/if}
							</div>
							{#if transaction && showRawData}
								<div class="raw-data" transition:slide>
									<TreeToggle text="" data={transaction} />
								</div>
							{/if}
						</td>
					</tr>
				</table>
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.transaction-details {
		@apply text-color-table-header text-[clamp(12px,1.07vw,1.07vw)];
	}

	.top {
		@apply mb-[clamp(8px,1.43vw,1.43vw)];
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.wrapper {
		@apply md:w-[82.2vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply px-[clamp(16px,2.38vw,2.38vw)] py-[clamp(16px,2.38vw,2.38vw)] mx-auto;
		@apply relative;
		@apply text-color-table-header;
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
	}

	.download-button {
		@apply absolute top-[clamp(16px,1.79vw,1.79vw)] right-[clamp(16px,2.38vw,2.38vw)];
		@apply w-[clamp(20px,2.86vw,2.86vw)];
		@apply cursor-pointer;
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.label {
		@apply font-bold text-[clamp(16px,1.07vw,1.07vw)] text-color-grey-footer-label;
		@apply md:min-w-[14.11vw];
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
		@apply flex items-center;
	}

	.verified-icon {
		@apply w-[1.31vh] h-[1.31vh] md:w-[1.31vw] md:h-[1.31vw];
	}

	.dets > .hash {
		@apply text-color-hover-footer-link;
		@apply flex flex-row items-center gap-x-[clamp(5px,0.5vw,0.5vw)];
	}
	.dets > .hash > div {
		@apply w-[2vh] h-[2vh] md:w-[2vw] md:h-[2vw];
	}

	.eye-icon {
		@apply w-[1.19vh] md:w-[1.19vw];
	}

	.copy-icon {
		@apply w-[1.5vh] md:w-[1.5vw];
	}

	.proofs-button {
		@apply flex items-center gap-[0.3vw];
		@apply py-[clamp(4px,0.48vw,0.48vw)] px-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-translucent-green;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
	}

	.status {
		@apply flex flex-col items-center;
	}

	.icon {
		@apply w-[clamp(24px,7.5vw,7.5vw)] h-[clamp(24px,7.5vw,7.5vw)];
	}

	.status-text {
		@apply text-color-arcadia-red font-bold text-[clamp(16px,1.43vw,1.43vw)];
		@apply mb-[clamp(8px,0.71vw,0.71vw)];
	}

	.success {
		@apply text-color-arcadia-green;
	}

	.amount {
		@apply flex gap-[clamp(4px,0.48vw,0.48vw)] items-center;
		@apply mb-[clamp(16px,3.93vw,3.93vw)];
	}

	.amount > .value {
		@apply text-[clamp(32px,2.86vw,2.86vw)] font-bold;
	}

	.amount > .cspr {
		@apply text-[clamp(24px,1.90vw,1.90vw)] font-bold text-color-grey-footer-label;
	}

	.raw-data {
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
		@apply p-[clamp(16px,1.43vw,1.43vw)];
		@apply md:max-w-[57.86vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply overflow-x-auto;
	}

	/* pre {
		@apply overflow-y-auto;
		@apply max-h-[25.76vw];
	}

	pre::-webkit-scrollbar {
		@apply w-[clamp(4px,0.48vw,0.48vw)] h-[clamp(4px,0.48vw,0.48vw)];
	}

	pre::-webkit-scrollbar-track {
		@apply bg-transparent;
	}

	pre::-webkit-scrollbar-thumb {
		@apply bg-color-tooltip-border;
		@apply rounded-[0.77vh] md:rounded-[0.77vw];
		@apply pr-[clamp(4px,0.48vw,0.48vw)];
	} */

	.raw-buttons {
		@apply flex items-center gap-[clamp(4px,0.54vw,0.54vw)];
	}

	.copy-button {
		@apply flex items-center;
		@apply py-[clamp(4px,0.48vw,0.48vw)] pl-[clamp(6px,0.71vw,0.71vw)];
		@apply bg-color-copy-btn-bg;
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply max-w-max;
		@apply cursor-pointer;
	}
</style>
