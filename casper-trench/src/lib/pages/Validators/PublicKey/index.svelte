<script lang="ts">
	import DelegatorsTab from '$lib/components/Validators/DelegatorsTab.svelte';
	import StatisticsCard from '$lib/components/Validators/StatisticsCard.svelte';
	import ValidatorCard from '$lib/components/Validators/ValidatorCard.svelte';
	import VerifiedBlocksTab from '$lib/components/Validators/VerifiedBlocksTab.svelte';
	import TabMenu from '$lib/components/TabMenu/index.svelte';
	import type { Bid } from '$utils/types/validator';
	import { isLoading } from '$stores/loading';
	import { getValidatorDetails } from '$utils/chain/validators';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let delegators: {
		publicKey: string;
		stakedAmount: number;
		bondingPurse: string;
		delegatee: string;
		rank?: number;
	}[] = [];

	let menuOptions = [
		{
			title: 'Delegators',
			component: DelegatorsTab,
			props: { delegators }
		},
		{
			title: 'Verified Blocks',
			component: VerifiedBlocksTab,
			props: { validatorPublicKey: $page.params.public_key }
		}
	];

	let validator: Bid;
	onMount(async () => {
		$isLoading = true;
		validator = await getValidatorDetails($page.params.public_key);
		menuOptions[0].props.delegators = validator.delegators ?? null;
		// Sort delegators
		menuOptions[0].props.delegators = menuOptions[0].props.delegators.sort(
			(a, b) => b.stakedAmount - a.stakedAmount
		);
		// Add ranks
		menuOptions[0].props.delegators.forEach((delegator, i) => {
			delegator.rank = i + 1;
		});
		menuOptions[0].props.delegators.unshift({
			publicKey: validator.publicKey,
			stakedAmount: validator.selfStake,
			bondingPurse: '',
			delegatee: ''
		});
		menuOptions[0].props['totalStake'] = validator && validator.totalBid;
		menuOptions[0].props['validatorPublicKey'] = validator && validator.publicKey;
		await getRewards();
		$isLoading = false;
	});

	// TODO get delegator and validator rewards
	const getRewards = async (network: 'casper' | 'casper-test' = 'casper-test') => {};
</script>

<div class="main">
	{#if validator}
		<div class="header-content">
			<ValidatorCard {validator} />
			<StatisticsCard {validator} />
		</div>
		<TabMenu {menuOptions} />
	{/if}
</div>

<style lang="postcss">
	.header-content {
		@apply flex flex-col md:flex-row gap-y-[clamp(10px,1vw,1vw)] justify-between;
		@apply mb-[3.51vw];
	}
</style>
