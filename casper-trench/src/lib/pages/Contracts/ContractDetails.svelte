<script lang="ts">
	import TabMenu from '$lib/components/TabMenu/index.svelte';
	import BlockIcon from '$lib/icons/BlockIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import { page } from '$app/stores';
	import ContractsOverview from '$lib/components/Contracts/ContractsOverview.svelte';
	import MoreInfo from '$lib/components/Contracts/MoreInfo.svelte';
	import CrossIcon from '$lib/icons/CrossIcon.svelte';
	import WarningMessageIcon from '$lib/icons/WarningMessageIcon.svelte';
	import { slide } from 'svelte/transition';
	import ContractTransactions from './ContractTabs/ContractTransactions.svelte';
	import ContractErc20Tokens from './ContractTabs/ContractERC20Tokens.svelte';
	import ContractTokens from './ContractTabs/ContractTokens.svelte';
	import ContractTab from './ContractTabs/ContractTab.svelte';
	import ContractEvents from './ContractTabs/ContractEvents.svelte';
	import ContractAnalytics from './ContractTabs/ContractAnalytics.svelte';
	import ContractComments from './ContractTabs/ContractComments.svelte';

	let menuOptions = [
		{
			title: 'Transactions',
			component: ContractTransactions,
			props: {}
		},
		{
			title: 'ERC 20 Tokens',
			component: ContractErc20Tokens,
			props: {}
		},
		{
			title: 'Tokens',
			component: ContractTokens,
			props: {}
		},
		{
			title: 'Contract',
			component: ContractTab,
			props: {}
		},
		{
			title: 'Events',
			component: ContractEvents,
			props: {}
		},
		{
			title: 'Analytics',
			component: ContractAnalytics,
			props: {}
		},
		{
			title: 'Comments',
			component: ContractComments,
			props: {}
		}
	];

	let tags = [
		{
			text: 'Eploit',
			type: 'warning'
		},
		{
			text: 'Heist',
			type: 'danger'
		},
		{
			text: 'Verified',
			type: 'good'
		}
	];

	let showMessage = true;
</script>

<div class="main">
	<div class="header">
		<div class="block-icon">
			<BlockIcon />
		</div>
		<div class="address">
			<div class="title">
				<div class="text">Contract</div>
			</div>
			<div class="value">
				<div class="text">
					{$page.params?.hash}
				</div>
				<div class="copy-icon">
					<CopyIcon text={$page.params?.hash} />
				</div>
			</div>
		</div>
	</div>

	<div class="tags">
		{#each tags as tag}
			{#if tag.type.toLowerCase() === 'warning'}
				<div class="warning">
					{tag.text}
				</div>
			{:else if tag.type.toLowerCase() === 'danger'}
				<div class="danger">
					{tag.text}
				</div>
			{:else}
				<div class="green">
					{tag.text}
				</div>
			{/if}
		{/each}
	</div>

	{#if showMessage}
		<div class="warning-message" transition:slide>
			<div
				class="close-icon"
				on:click={() => {
					showMessage = false;
				}}
			>
				<CrossIcon />
			</div>
			<div class="warning-icon">
				<WarningMessageIcon />
			</div>
			This address is reported to be involved in a<span class="link">Indexed Finance exploit.</span>
		</div>
	{/if}

	<!-- {#if contract && type} -->
	<div class="info">
		<ContractsOverview />
		<MoreInfo />
	</div>
	<!-- {/if} -->
	<TabMenu {menuOptions} />
</div>

<style lang="postcss">
	.address {
		@apply text-color-table-header;
	}
	.address > .value {
		@apply flex items-center gap-[clamp(4px,0.24vw,0.24vw)];
	}

	.address > .title {
		@apply font-bold text-[clamp(16px,1.19vw,1.19vw)];
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
	}

	.address > .value {
		@apply text-[clamp(8px,0.95vw,0.95vw)];
	}

	.copy-icon {
		@apply w-[clamp(16px,1.96vw,1.96vw)] h-[clamp(16px,1.96vw,1.96vw)];
		@apply cursor-pointer;
	}

	.header {
		@apply flex gap-[clamp(4px,1.31vw,1.31vw)] max-h-max;
		@apply mb-[1.79vw];
	}

	.info {
		@apply flex flex-col gap-[16px] md:gap-0 md:flex-row justify-between;
		@apply mb-[clamp(4px,3.51vw,3.51vw)];
	}

	.tags {
		@apply flex items-center gap-[clamp(4px,0.48vw,0.48vw)];
		@apply mb-[1.79vw];
	}

	.tags > div {
		@apply py-[clamp(2px,0.3vw,0.3vw)] px-[clamp(4px,0.6vw,0.6vw)];
		@apply rounded-[0.3vh] md:rounded-[0.3vw];
		@apply text-[clamp(12px,0.95vw,0.95vw)];
	}

	.warning {
		@apply text-color-arcadia-yellow bg-color-translucent-yellow;
	}

	.danger {
		@apply text-color-arcadia-red bg-color-translucent-red;
	}

	.green {
		@apply text-color-arcadia-green bg-color-translucent-green;
	}

	.warning-message {
		@apply relative;
		@apply flex items-center;
		@apply py-[clamp(8px,1.07vw,1.07vw)] px-[clamp(8px,1.07vw,1.07vw)];
		@apply bg-color-translucent-red;
		@apply rounded-[clamp(4px,0.48vw,0.48vw)];
		@apply mb-[1.79vw];
		@apply text-[clamp(10px,1.07vw,1.07vw)] text-color-table-header;
	}

	.close-icon {
		@apply w-[clamp(8px,1.07vw,1.07vw)] h-[clamp(8px,1.07vw,1.07vw)];
		@apply absolute right-[0.83vw];
		@apply cursor-pointer;
	}

	.warning-icon {
		@apply w-[clamp(16px,1.19vw,1.19vw)] h-[clamp(16px,1.19vw,1.19vw)];
		@apply mr-[clamp(2px,0.36vw,0.36vw)];
	}

	.link {
		@apply text-color-hover-footer-link;
		@apply ml-[0.24vw];
	}
</style>
