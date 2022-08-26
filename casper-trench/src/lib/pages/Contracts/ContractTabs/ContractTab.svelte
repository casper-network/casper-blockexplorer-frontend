<script lang="ts">
	import ContractCode from '$lib/components/Contracts/ContractCode.svelte';
	import ContractRead from '$lib/components/Contracts/ContractRead.svelte';
	import ContractWrite from '$lib/components/Contracts/ContractWrite.svelte';

	import TopLeftTools from '$lib/components/Contracts/TopLeftTools.svelte';
	import Switch from '$lib/components/Reusables/Switch.svelte';

	const options = [
		{
			name: 'Code',
			dropdown: []
		},
		{
			name: 'Read Contract',
			dropdown: []
		},
		{
			name: 'Write Contract',
			dropdown: []
		}
	];

	let selected = 0;

	let searchText = '';
</script>

<div class="contract">
	<Switch {options} bind:selected />

	{#if selected === 0}
		<TopLeftTools bind:searchText />
	{/if}
	<div class="content">
		{#if selected === 0}
			<ContractCode />
		{:else if selected === 1}
			<ContractRead />
		{:else if selected === 2}
			<ContractWrite />
		{/if}
	</div>
</div>

<style lang="postcss">
	.contract {
		@apply relative;
	}

	.content {
		@apply pt-[clamp(16px,2.02vw,2.02vw)];
	}
</style>
