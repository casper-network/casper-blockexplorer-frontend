<script lang="ts">
	import Overview from '$lib/components/Accounts/Overview.svelte';
	import StakeInfo from '$lib/components/Accounts/StakeInfo.svelte';
	import StakingTab from '$lib/pages/Accounts/AccountTabs/StakingTab.svelte';
	import TokensTab from '$lib/pages/Accounts/AccountTabs/TokensTab.svelte';
	import TransactionsTab from '$lib/pages/Accounts/AccountTabs/TransactionsTab.svelte';
	import TransferTab from '$lib/pages/Accounts/AccountTabs/TransferTab.svelte';
	import EarningTab from '$lib/pages/Accounts/AccountTabs/EarningTab.svelte';
	import TabMenu from '$lib/components/TabMenu/index.svelte';
	import BlockIcon from '$lib/icons/BlockIcon.svelte';
	import CopyIcon from '$lib/icons/CopyIcon.svelte';
	import TrustedIcon from '$lib/icons/TrustedIcon.svelte';
	import { onMount } from 'svelte';
	import type { Account } from '$utils/types/account';
	import { getAccount, getType } from '$utils/api';
	import { page } from '$app/stores';
	import type { Type } from '$utils/types/type';

	//Old menu options
	//  {
	// 		title: 'Transfers',
	// 		component: TransferTab,
	// 		props: {}
	// 	},
	// 	title: 'Staking',
	// 	component: StakingTab,
	// 	props: {}
	// },
	// {
	// 	title: 'Earning',
	// 	component: EarningTab,
	// 	props: {}
	// },
	// {
	// 	title: 'Tokens',
	// 	component: TokensTab,
	// 	props: {}
	// }
	let menuOptions = [
		{
			title: 'Transactions',
			component: TransactionsTab,
			props: {}
		}
	];
	let account: Account;
	let type: Type;
	let isLoading = false;
	onMount(async () => {
		isLoading = true;
		account = await getAccount($page.params?.address);
		type = await getType($page.params?.address);
		isLoading = false;
	});
</script>

<div class="main">
	<div class="header">
		<div class="block-icon">
			<BlockIcon />
		</div>
		<div class="address">
			<div class="title">
				<div class="text">Public Key</div>
			</div>
			<div class="value">
				<div class="text">
					{$page.params?.address}
				</div>
				<div class="copy-icon">
					<CopyIcon text={$page.params?.address} />
				</div>
			</div>
		</div>
	</div>

	<div class="info">
		<Overview {account} {type} {isLoading} />
		<StakeInfo {account} {isLoading} />
	</div>
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

	.trusted-icon {
		@apply h-[clamp(12px,0.95vw,0.95vw)] w-[clamp(12px,0.95vw,0.95vw)];
	}

	.header {
		@apply flex gap-[clamp(4px,1.31vw,1.31vw)] max-h-max;
		@apply mb-[1.79vw];
	}

	.info {
		@apply flex flex-col gap-[16px] md:gap-0 md:flex-row justify-between;
		@apply mb-[clamp(4px,3.51vw,3.51vw)];
	}
</style>
