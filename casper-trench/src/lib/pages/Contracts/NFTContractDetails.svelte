<script lang="ts">
	import BlockIcon from '$lib/icons/BlockIcon.svelte';
	import { sampleJsonData } from '$utils/sampleData';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import EyeIcon from '$lib/icons/EyeIcon.svelte';
	import CrossedEyeIcon from '$lib/icons/CrossedEyeIcon.svelte';
	import { slide } from 'svelte/transition';
	import NftActivity from '$lib/components/Contracts/NFTActivity.svelte';

	let collectionName = 'CasperPunks';
	let tokenId = 'CSPR-PNK-1-1';
	let contractAddress = '19cf434b80aa05d506f475a52da877240517a0ab238a49a54015e46e02649bbd';
	let owner = '19cf434b80aa05d506f475a52da877240517a0ab238a49a54015e46e02649bbd';
	let standard = 'CEP47';
	let assetUrl = 'https://ipfs.io/ipfs/QmTLJgth6vr74sPCucXQcT3nnH8mAbfAa3tjKquHxhb';
	let batch = 'genesis';
	let jsonData = sampleJsonData;

	let showRawData = false;
</script>

<div class="nft-details">
	<div class="overview">
		<div class="nft">
			<img
				src="https://lh3.googleusercontent.com/9C8YVuRO6XhJKPjF1jyY7Cl9iw9xtJmywCV9Lx7H_An0xrx5chTluluvanyi_hVaTcDkhTeUDNsT_VHgyJi0z-vhXwawh5MErLsXag=w345"
				alt="nft"
			/>
		</div>
		<div class="extras">
			<div class="header">
				<div class="collection">
					<span class="bold">NFT</span>{collectionName}
				</div>
				<div class="name">
					{tokenId}
				</div>
			</div>
			<table>
				<tr>
					<td class="label"> Contract </td>
					<td class="value">
						<div class="contact">
							<div class="collection">
								{collectionName}
							</div>
							<div class="address green">
								<div class="text">
									{contractAddress}
								</div>
								<div class="copy-icon">
									<CopyIcon text={contractAddress} />
								</div>
							</div>
						</div>
					</td>
				</tr>

				<tr>
					<td class="label"> Owner </td>
					<td class="value">
						<div class="address green">
							<div class="block-icon">
								<BlockIcon />
							</div>
							<div class="text">
								{owner}
							</div>
							<div class="copy-icon">
								<CopyIcon text={owner} />
							</div>
						</div>
					</td>
				</tr>

				<tr>
					<td class="label"> Token ID </td>
					<td class="value">
						<div class="address green">
							<div class="text">
								{tokenId}
							</div>
							<div class="copy-icon">
								<CopyIcon text={tokenId} />
							</div>
						</div>
					</td>
				</tr>

				<tr>
					<td class="label"> Standard </td>
					<td class="value">
						<div class="address">
							<div class="text">
								{standard}
							</div>
						</div>
					</td>
				</tr>

				<tr>
					<td class="label"> Asset </td>
					<td class="value">
						<div class="address green">
							<div class="text">
								{assetUrl}
							</div>
							<div class="copy-icon">
								<CopyIcon text={tokenId} />
							</div>
						</div>
					</td>
				</tr>

				<tr>
					<td class="label"> Batch </td>
					<td class="value">
						<div class="address">
							<div class="text">
								{batch}
							</div>
						</div>
					</td>
				</tr>

				<tr>
					<td class="label raw">Raw Data</td>
					<td class="value raw">
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
								<div class="copy-button">
									<div class="text">Copy</div>
									<div
										class="copy-icon"
										on:click={() => {
											navigator.clipboard && navigator.clipboard.writeText(jsonData);
										}}
									>
										<CopyIcon />
									</div>
								</div>
							{/if}
						</div>
						{#if showRawData}
							<div class="raw-data" transition:slide>
								<pre>{jsonData}</pre>
							</div>
						{/if}
					</td>
				</tr>
			</table>
		</div>
	</div>

	<NftActivity />
</div>

<style lang="postcss">
	.overview {
		@apply py-[clamp(16px,4.29vw,4.29vw)] px-[clamp(16px,3.51vw,3.51vw)];
		@apply w-full;
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
		@apply flex gap-[clamp(24px,3.15vw,3.15vw)] flex-col md:flex-row;
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
		@apply pb-[clamp(4px,1.5vw,1.5vw)];
	}

	.extras {
		@apply md:ml-[0.23vw] md:mr-[1.25vw];
	}

	.nft > img {
		@apply w-full md:w-[29.17vw] md:h-[29.17vw];
	}

	.header {
		@apply flex gap-[clamp(16px,1.61vw,1.61vw)] items-center;
		@apply text-[clamp(20px,1.55vw,1.55vw)] text-color-table-header;
		@apply mb-[clamp(16px,3.04vw,3.04vw)];
	}

	.bold {
		@apply font-bold;
	}

	.green {
		@apply text-color-hover-footer-link;
	}

	.address {
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.copy-icon {
		@apply w-[clamp(16px,1.96vw,1.96vw)] h-[clamp(16px,1.96vw,1.96vw)];
		@apply cursor-pointer;
	}

	.block-icon {
		@apply w-[1.19vh] h-[1.19vh] md:w-[1.19vw] md:h-[1.19vw];
		@apply mr-[clamp(4px,0.24vw,0.24vw)];
	}

	.raw-data {
		@apply rounded-[0.89vh] md:rounded-[0.89vw];
		@apply p-[clamp(16px,1.43vw,1.43vw)];
		@apply md:max-w-[40vw];
		@apply border-[clamp(1px,0.06vw,0.06vw)] border-color-tooltip-border;
		@apply shadow-[0px_0.18vw_1.37vw_0px_rgba(244,246,255,0.5)];
	}

	pre {
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
	}

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

	.raw {
		@apply flex-col items-start justify-center;
	}

	.raw.label {
		@apply align-top;
	}
</style>
