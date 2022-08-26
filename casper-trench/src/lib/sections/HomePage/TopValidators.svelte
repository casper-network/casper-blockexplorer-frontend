<script lang="ts">
	import { goto } from '$app/navigation';

	import Button from '$lib/components/Reusables/Button.svelte';
	import CircleProgressBar from '$lib/components/TableData/CircleProgressBar.svelte';
	import ValidatorElement from '$lib/components/TableData/Validator.svelte';
	// import { getTopValidators } from '$utils/api';
	import { isLoading } from '$stores/loading';
	import { onMount } from 'svelte';
	import PlaceHolderIndicator from '$lib/components/PlaceHolderIndicator.svelte';
	import type { EraValidator } from '$utils/types/validator';
	import { getTopValidators } from '$utils/chain/validators';
	let validators;
	let topValidators: Partial<EraValidator>[] = [];
	onMount(async () => {
		$isLoading = true;
		// validators = await getTopValidators();
		topValidators = await getTopValidators(10);
		$isLoading = false;
	});
</script>

<div class="top-validators">
	<h3>Top</h3>
	<h2>Validators</h2>
	{#if topValidators && topValidators.length > 0}
		<table>
			<tr>
				<th>Validator</th>
				<th>Fee</th>
				<th>Total Stake</th>
				<!-- TODO validator perfomance -->
				<!-- Only available from make services -->
				<!-- <th><PlaceHolderIndicator /> Performance</th> -->
			</tr>
			<div class="divider table-header-border" />
			{#each topValidators as validator}
				<tr>
					<td
						><ValidatorElement
							imgUrl={validator?.icon}
							name={validator?.name}
							hash={validator.publicKey}
						/></td
					>
					<td class="text-color-grey-footer-label">{validator.delegationRate.toFixed(2)}%</td>
					<!-- TODO change ____ -->
					<td class="text-color-table-header">{validator.selfStake.toLocaleString('en')} </td>
					<!-- <td><CircleProgressBar progress={1} /></td> -->
				</tr>
			{/each}
		</table>

		<div class="button">
			<Button outline on:click={() => goto(`/validators`)}>View all Validators</Button>
		</div>
	{/if}
</div>

<style lang="postcss">
	.top-validators {
		@apply flex flex-col items-start;
		@apply w-full;
	}
	h3 {
		@apply font-medium text-color-hover-footer-link text-sm md:text-[clamp(12px,1.07vw,1.07vw)] leading-[120%];
	}
	h2 {
		@apply font-bold text-color-table-header text-base md:text-[clamp(14px,1.4vw,1.4vw)] leading-[120%];
		@apply mt-[clamp(5px,0.3vw,0.3vw)] mb-[clamp(14px,1.6vw,1.6vw)];
	}
	table {
		@apply table-auto w-full relative;
	}

	.divider {
		@apply h-[clamp(1px,0.18vw,0.18vw)] w-full;
		@apply absolute;
	}

	th {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] font-normal text-color-table-header text-left;
	}

	td {
		@apply py-[clamp(8px,0.5vw,0.5vw)];
		@apply text-[clamp(10px,1.07vw,1.07vw)] min-w-max;
	}

	.button {
		@apply w-full;
		@apply flex justify-center;
		@apply mt-[clamp(14px,1.6vw,1.6vw)];
	}
</style>
